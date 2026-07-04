import { Client } from "@notionhq/client";
import { randomBytes } from "crypto";
import { starterMeetings, type Meeting } from "@/lib/forgeosData";
export type MeetingInput = Omit<Meeting, "id">;
const databaseId = process.env.FORGEOS_MEETINGS_NOTION_DATABASE_ID;
const employeeDatabaseId = process.env.EMPLOYEE_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
type Schema = Record<string, { type?: string }>;
function find(schema: Schema, aliases: string[], fallbackType?: string) { return Object.entries(schema).find(([name]) => aliases.some((alias) => alias.toLowerCase() === name.toLowerCase())) || (fallbackType ? Object.entries(schema).find(([, field]) => field.type === fallbackType) : undefined); }
function read(field: any) { if (!field) return ""; if (field.type === "title") return field.title?.[0]?.plain_text || ""; if (field.type === "rich_text") return field.rich_text?.[0]?.plain_text || ""; if (field.type === "select") return field.select?.name || ""; if (field.type === "date") return field.date?.start || ""; if (field.type === "url") return field.url || ""; if (field.type === "multi_select") return (field.multi_select || []).map((item: any) => item.name).join(", "); return ""; }
function write(type: string | undefined, value: string) { if (type === "title") return { title: [{ text: { content: value } }] }; if (type === "select") return { select: { name: value } }; if (type === "date") return value ? { date: { start: value } } : { date: null }; if (type === "url") return { url: value || null }; if (type === "multi_select") return { multi_select: value.split(",").map((name) => name.trim()).filter(Boolean).map((name) => ({ name })) }; if (type === "rich_text") return { rich_text: [{ text: { content: value } }] }; return null; }
async function getSchema() { if (!notion || !databaseId) return {} as Schema; const database = await notion.databases.retrieve({ database_id: databaseId }); return ((database as any).properties || {}) as Schema; }
async function pageTitle(pageId: string) { if (!notion) return ""; const page = await notion.pages.retrieve({ page_id: pageId }); const properties = (page as any).properties || {}; const title = Object.values(properties).find((property: any) => property?.type === "title") as any; return title?.title?.[0]?.plain_text || ""; }
async function relationNames(property: any) { if (property?.type !== "relation") return read(property); return (await Promise.all((property.relation || []).map((item: any) => pageTitle(item.id)))).filter(Boolean).join(", "); }
async function employeePageId(name: string) { if (!notion || !employeeDatabaseId) return ""; const response = await notion.databases.query({ database_id: employeeDatabaseId, filter: { property: "Name", title: { equals: name } }, page_size: 1 }); return response.results[0]?.id || ""; }
async function attendeeRelations(value: string) { const names = value.split(",").map((name) => name.trim()).filter(Boolean); const ids = await Promise.all(names.map(employeePageId)); const missing = names.filter((_, index) => !ids[index]); if (missing.length) throw new Error(`Employees not found in Notion: ${missing.join(", ")}`); return { relation: ids.map((id) => ({ id })) }; }
async function toMeeting(page: any, schema: Schema): Promise<Meeting> {
  const get = (aliases: string[], type?: string) => { const field = find(schema, aliases, type); return field ? read(page.properties?.[field[0]]) : ""; };
  const attendeeField = find(schema, ["Attendees", "Participants"]); const attendees = attendeeField ? await relationNames(page.properties?.[attendeeField[0]]) : ""; const type = String(get(["Type", "Meeting Type"]));
  return { id: String(get(["Meeting ID", "ID"]) || page.id), title: String(get(["Name", "Title", "Meeting"], "title")), when: String(get(["When", "Starts At", "Start", "Date"])), attendees, type: (["Client", "Internal", "Review"].includes(type) ? type : "Internal") as Meeting["type"], meetingLink: String(get(["Meeting Link", "Join Link", "URL"])) };
}
export async function readForgeMeetings(): Promise<Meeting[]> { if (!notion || !databaseId) return starterMeetings; const schema = await getSchema(); const records: Meeting[] = []; let cursor: string | undefined; do { const response = await notion.databases.query({ database_id: databaseId, start_cursor: cursor }); records.push(...(await Promise.all(response.results.map((page) => toMeeting(page, schema))))); cursor = response.has_more ? response.next_cursor || undefined : undefined; } while (cursor); return records; }
export async function createForgeMeeting(input: MeetingInput) {
  const meeting: Meeting = { ...input, id: `MTG-${randomBytes(3).toString("hex").toUpperCase()}` }; if (!notion || !databaseId) return meeting; const schema = await getSchema();
  const values: Array<[string[], string, string?]> = [[["Name", "Title", "Meeting"], meeting.title, "title"], [["Meeting ID", "ID"], meeting.id], [["When", "Starts At", "Start", "Date"], meeting.when], [["Attendees", "Participants"], meeting.attendees], [["Type", "Meeting Type"], meeting.type], [["Meeting Link", "Join Link", "URL"], meeting.meetingLink]]; const properties: Record<string, any> = {};
  for (const [aliases, value, type] of values) { const field = find(schema, aliases, type); if (!field) continue; const attendeeField = aliases.includes("Attendees") || aliases.includes("Participants"); if (attendeeField && field[1].type === "people") throw new Error("Change the Notion Attendees property from People to a Relation connected to the Employees database."); const property = field[1].type === "relation" ? await attendeeRelations(value) : write(field[1].type, value); if (property) properties[field[0]] = property; }
  await notion.pages.create({ parent: { database_id: databaseId }, properties }); return meeting;
}

export async function rescheduleForgeMeeting(id: string, date: string): Promise<Meeting> {
  const current = (await readForgeMeetings()).find((meeting) => meeting.id === id);
  if (!current) throw new Error(`Meeting ${id} was not found.`);
  const time = current.when.match(/(?:T| )(\d{2}:\d{2}(?::\d{2})?)/)?.[1] || "09:00";
  const when = `${date}T${time}`;
  if (!notion || !databaseId) return { ...current, when };
  const schema = await getSchema();
  const dateField = find(schema, ["When", "Starts At", "Start", "Date"]);
  if (!dateField) throw new Error("The Meetings database has no date property.");
  let pageId = id;
  if (id.startsWith("MTG-")) {
    const idField = find(schema, ["Meeting ID", "ID"]);
    if (!idField) throw new Error("The Meetings database has no Meeting ID property.");
    const filter = idField[1].type === "title" ? { property: idField[0], title: { equals: id } } : { property: idField[0], rich_text: { equals: id } };
    const response = await notion.databases.query({ database_id: databaseId, filter: filter as any, page_size: 1 });
    pageId = response.results[0]?.id || "";
  }
  if (!pageId) throw new Error(`Meeting ${id} was not found.`);
  await notion.pages.update({ page_id: pageId, properties: { [dateField[0]]: { date: { start: when } } } });
  return { ...current, when };
}
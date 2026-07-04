import { Client } from "@notionhq/client";
import { randomBytes } from "crypto";
import type { BlockedDateRange } from "@/lib/forgeosData";

export type BlockedDateInput = Pick<BlockedDateRange, "startDate" | "endDate" | "reason" | "createdBy">;

const databaseId = process.env.FORGEOS_BLOCKED_DATES_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const useNotion = Boolean(notion && databaseId);
const memoryKey = "__forgeosBlockedDates";

type GlobalWithBlockedDates = typeof globalThis & { [memoryKey]?: BlockedDateRange[] };
function memoryStore() {
  const target = globalThis as GlobalWithBlockedDates;
  target[memoryKey] ||= [];
  return target[memoryKey];
}
function text(property: any) {
  if (!property) return "";
  if (property.type === "title") return property.title?.[0]?.plain_text || "";
  if (property.type === "rich_text") return property.rich_text?.[0]?.plain_text || "";
  if (property.type === "date") return property.date?.start || "";
  if (property.type === "created_time") return property.created_time || "";
  return "";
}
function fromPage(page: any): BlockedDateRange {
  const properties = page.properties || {};
  const titleProperty = Object.values(properties).find((property: any) => property.type === "title");
  return {
    id: page.id,
    startDate: text(properties["Start Date"]),
    endDate: text(properties["End Date"]),
    reason: text(properties.Reason || titleProperty),
    createdBy: text(properties["Created By"]),
    createdAt: text(properties["Created At"]) || page.created_time || "",
  };
}
async function existingProperties() {
  if (!notion || !databaseId) return {} as Record<string, any>;
  const database = await notion.databases.retrieve({ database_id: databaseId });
  return (database as any).properties || {};
}
export async function readBlockedDates(): Promise<BlockedDateRange[]> {
  if (!useNotion || !notion || !databaseId) return [...memoryStore()].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const records: BlockedDateRange[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.databases.query({ database_id: databaseId, start_cursor: cursor });
    records.push(...response.results.map(fromPage));
    cursor = response.has_more ? response.next_cursor || undefined : undefined;
  } while (cursor);
  return records.sort((a, b) => a.startDate.localeCompare(b.startDate));
}
export async function createBlockedDate(input: BlockedDateInput): Promise<BlockedDateRange> {
  const range: BlockedDateRange = { id: `BLK-${randomBytes(3).toString("hex").toUpperCase()}`, ...input, createdAt: new Date().toISOString() };
  if (!useNotion || !notion || !databaseId) { memoryStore().push(range); return range; }
  const existing = await existingProperties();
  const titleName = Object.entries(existing).find(([, property]: [string, any]) => property.type === "title")?.[0] || "Reason";
  const candidates: Record<string, any> = {
    [titleName]: { title: [{ text: { content: range.reason } }] },
    "Start Date": { date: { start: range.startDate } },
    "End Date": { date: { start: range.endDate } },
    "Created By": { rich_text: [{ text: { content: range.createdBy } }] },
  };
  const properties = Object.fromEntries(Object.entries(candidates).filter(([name]) => name === titleName || Boolean(existing[name])));
  const page = await notion.pages.create({ parent: { database_id: databaseId }, properties });
  return { ...range, id: page.id };
}
export async function deleteBlockedDate(id: string) {
  if (!useNotion || !notion) {
    const index = memoryStore().findIndex((range) => range.id === id);
    if (index === -1) return false;
    memoryStore().splice(index, 1);
    return true;
  }
  await notion.pages.update({ page_id: id, archived: true });
  return true;
}
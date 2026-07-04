import { Client } from "@notionhq/client";
import type { ForgeRole, NotificationRecord } from "@/lib/forgeosData";

export type NotificationInput = Omit<NotificationRecord, "id" | "read" | "createdAt"> & { createdAt?: string };
const databaseId = process.env.FORGEOS_NOTIFICATIONS_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
type Schema = Record<string, { type?: string }>;

function find(schema: Schema, aliases: string[], fallbackType?: string) { return Object.entries(schema).find(([name]) => aliases.some((alias) => alias.toLowerCase() === name.toLowerCase())) || (fallbackType ? Object.entries(schema).find(([, field]) => field.type === fallbackType) : undefined); }
function read(property: any) { if (!property) return ""; if (property.type === "title") return property.title?.[0]?.plain_text || ""; if (property.type === "rich_text") return property.rich_text?.[0]?.plain_text || ""; if (property.type === "select") return property.select?.name || ""; if (property.type === "email") return property.email || ""; if (property.type === "checkbox") return Boolean(property.checkbox); if (property.type === "date") return property.date?.start || ""; return ""; }
function write(type: string | undefined, value: string | boolean) { if (type === "title") return { title: [{ text: { content: String(value) } }] }; if (type === "rich_text") return { rich_text: [{ text: { content: String(value) } }] }; if (type === "select") return { select: value ? { name: String(value) } : null }; if (type === "email") return { email: value ? String(value) : null }; if (type === "checkbox") return { checkbox: Boolean(value) }; if (type === "date") return { date: value ? { start: String(value) } : null }; return null; }
async function getSchema() { if (!notion || !databaseId) return {} as Schema; const database = await notion.databases.retrieve({ database_id: databaseId }); return ((database as any).properties || {}) as Schema; }
function toNotification(page: any, schema: Schema): NotificationRecord {
  const get = (aliases: string[], type?: string) => { const field = find(schema, aliases, type); return field ? read(page.properties?.[field[0]]) : ""; };
  return { id: page.id, title: String(get(["Title"], "title")), body: String(get(["Message", "Body"])), type: String(get(["Type"])) as NotificationRecord["type"], recipientRole: String(get(["Recipient Role", "Role"])) as ForgeRole | "", recipientEmail: String(get(["Recipient Email", "Email"])), read: Boolean(get(["Read"])), linkedModule: String(get(["Linked Module", "Module"])), linkedRecordId: String(get(["Linked Record ID", "Record ID"])), createdAt: String(get(["Created At", "Created"])) };
}
export async function readForgeNotifications(role: ForgeRole, email: string) {
  if (!notion || !databaseId) return []; const schema = await getSchema(); const records: NotificationRecord[] = []; let cursor: string | undefined;
  do { const response = await notion.databases.query({ database_id: databaseId, start_cursor: cursor }); records.push(...response.results.map((page) => toNotification(page, schema))); cursor = response.has_more ? response.next_cursor || undefined : undefined; } while (cursor);
  return records.filter((item) => !item.read && ((!item.recipientEmail && !item.recipientRole) || item.recipientEmail.toLowerCase() === email.toLowerCase() || item.recipientRole === role)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function createForgeNotification(input: NotificationInput) {
  if (!notion || !databaseId) return; const schema = await getSchema(); const values: Array<[string[], string | boolean, string?]> = [[["Title"], input.title, "title"], [["Message", "Body"], input.body], [["Type"], input.type], [["Recipient Role", "Role"], input.recipientRole], [["Recipient Email", "Email"], input.recipientEmail], [["Read"], false], [["Linked Module", "Module"], input.linkedModule], [["Linked Record ID", "Record ID"], input.linkedRecordId], [["Created At", "Created"], input.createdAt || new Date().toISOString()]]; const properties: Record<string, any> = {};
  for (const [aliases, value, type] of values) { const field = find(schema, aliases, type); if (!field) continue; const property = write(field[1].type, value); if (property) properties[field[0]] = property; } await notion.pages.create({ parent: { database_id: databaseId }, properties });
}
export async function markForgeNotificationsRead(role: ForgeRole, email: string) {
  if (!notion || !databaseId) return; const schema = await getSchema(); const readField = find(schema, ["Read"]); if (!readField) return; const notifications = await readForgeNotifications(role, email); await Promise.all(notifications.map((item) => notion.pages.update({ page_id: item.id, properties: { [readField[0]]: { checkbox: true } } })));
}

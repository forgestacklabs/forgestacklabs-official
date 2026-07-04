import { Client } from "@notionhq/client";
import { randomBytes } from "crypto";
import { starterDocuments, type DocumentRecord } from "@/lib/forgeosData";

export type DocumentInput = Omit<DocumentRecord, "id">;
const databaseId = process.env.FORGEOS_DOCUMENTS_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
type Schema = Record<string, { type?: string }>;

function find(schema: Schema, aliases: string[], fallbackType?: string) {
  return Object.entries(schema).find(([name]) => aliases.some((alias) => alias.toLowerCase() === name.toLowerCase())) ||
    (fallbackType ? Object.entries(schema).find(([, field]) => field.type === fallbackType) : undefined);
}
function read(field: any) {
  if (!field) return "";
  if (field.type === "title") return field.title?.[0]?.plain_text || "";
  if (field.type === "rich_text") return field.rich_text?.[0]?.plain_text || "";
  if (field.type === "select") return field.select?.name || "";
  if (field.type === "url") return field.url || "";
  if (field.type === "files") return field.files?.[0]?.external?.url || field.files?.[0]?.file?.url || "";
  return "";
}
function write(type: string | undefined, value: string) {
  if (type === "title") return { title: [{ text: { content: value } }] };
  if (type === "select") return { select: { name: value } };
  if (type === "url") return { url: value || null };
  if (type === "files") return { files: value ? [{ name: "Document", external: { url: value } }] : [] };
  if (type === "rich_text") return { rich_text: [{ text: { content: value } }] };
  return null;
}
async function getSchema() {
  if (!notion || !databaseId) return {} as Schema;
  const database = await notion.databases.retrieve({ database_id: databaseId });
  return ((database as any).properties || {}) as Schema;
}
function toDocument(page: any, schema: Schema): DocumentRecord {
  const get = (aliases: string[], type?: string) => { const field = find(schema, aliases, type); return field ? read(page.properties?.[field[0]]) : ""; };
  const visibility = String(get(["Visibility", "Access"]));
  return {
    id: String(get(["Document ID", "ID"]) || page.id),
    title: String(get(["Name", "Title", "Document"], "title")),
    category: String(get(["Category"])),
    visibility: (["Leadership", "Engineering", "Operations", "Company"].includes(visibility) ? visibility : "Company") as DocumentRecord["visibility"],
    owner: String(get(["Owner", "Created By", "Created by"])),
    fileUrl: String(get(["File URL", "Document URL", "URL", "File"])),
  };
}
export async function readForgeDocuments(): Promise<DocumentRecord[]> {
  if (!notion || !databaseId) return starterDocuments;
  const schema = await getSchema(); const records: DocumentRecord[] = []; let cursor: string | undefined;
  do { const response = await notion.databases.query({ database_id: databaseId, start_cursor: cursor }); records.push(...response.results.map((page) => toDocument(page, schema))); cursor = response.has_more ? response.next_cursor || undefined : undefined; } while (cursor);
  return records;
}
export async function createForgeDocument(input: DocumentInput) {
  const document: DocumentRecord = { ...input, id: `DOC-${randomBytes(3).toString("hex").toUpperCase()}` };
  if (!notion || !databaseId) return document;
  const schema = await getSchema();
  const values: Array<[string[], string, string?]> = [
    [["Name", "Title", "Document"], document.title, "title"], [["Document ID", "ID"], document.id], [["Category"], document.category],
    [["Visibility", "Access"], document.visibility], [["Owner", "Created By", "Created by"], document.owner], [["File URL", "Document URL", "URL", "File"], document.fileUrl],
  ];
  const properties: Record<string, any> = {};
  for (const [aliases, value, type] of values) { const field = find(schema, aliases, type); if (field) { const property = write(field[1].type, value); if (property) properties[field[0]] = property; } }
  await notion.pages.create({ parent: { database_id: databaseId }, properties }); return document;
}

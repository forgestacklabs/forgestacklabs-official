import { Client } from "@notionhq/client";
import { randomBytes } from "crypto";
import { starterLeads, type Lead, type LeadStage } from "@/lib/forgeosData";
export type LeadInput = Omit<Lead, "id">;
const databaseId = process.env.FORGEOS_CRM_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
type Schema = Record<string, { type?: string }>;
function find(schema: Schema, aliases: string[], fallbackType?: string) { return Object.entries(schema).find(([name]) => aliases.some((alias) => alias.toLowerCase() === name.toLowerCase())) || (fallbackType ? Object.entries(schema).find(([, field]) => field.type === fallbackType) : undefined); }
function read(property: any) { if (!property) return ""; if (property.type === "title") return property.title?.[0]?.plain_text || ""; if (property.type === "rich_text") return property.rich_text?.[0]?.plain_text || ""; if (property.type === "select") return property.select?.name || ""; if (property.type === "status") return property.status?.name || ""; if (property.type === "email") return property.email || ""; if (property.type === "phone_number") return property.phone_number || ""; if (property.type === "number") return property.number ?? 0; if (property.type === "date") return property.date?.start || ""; return ""; }
function write(type: string | undefined, value: string | number) { if (type === "title") return { title: [{ text: { content: String(value) } }] }; if (type === "rich_text") return { rich_text: [{ text: { content: String(value) } }] }; if (type === "select") return { select: { name: String(value) } }; if (type === "status") return { status: { name: String(value) } }; if (type === "email") return { email: value ? String(value) : null }; if (type === "phone_number") return { phone_number: value ? String(value) : null }; if (type === "number") return { number: Number(value) }; if (type === "date") return { date: value ? { start: String(value) } : null }; return null; }
async function getSchema() { if (!notion || !databaseId) return {} as Schema; const database = await notion.databases.retrieve({ database_id: databaseId }); return ((database as any).properties || {}) as Schema; }
function toLead(page: any, schema: Schema): Lead { const get = (aliases: string[], type?: string) => { const field = find(schema, aliases, type); return field ? read(page.properties?.[field[0]]) : ""; }; const stage = String(get(["Stage", "Status"])); return { id: page.id, company: String(get(["Company", "Name"], "title")), contact: String(get(["Contact Name", "Contact"])), email: String(get(["Email"])), phone: String(get(["Phone"])), source: String(get(["Source"])), stage: (["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"].includes(stage) ? stage : "New") as LeadStage, owner: String(get(["Owner"])), value: Number(get(["Value", "Deal Value"]) || 0), nextFollowUp: String(get(["Next Follow Up", "Follow Up"])), notes: String(get(["Notes"])) }; }
export async function readForgeLeads(): Promise<Lead[]> { if (!notion || !databaseId) return starterLeads; const schema = await getSchema(); const records: Lead[] = []; let cursor: string | undefined; do { const response = await notion.databases.query({ database_id: databaseId, start_cursor: cursor }); records.push(...response.results.map((page) => toLead(page, schema))); cursor = response.has_more ? response.next_cursor || undefined : undefined; } while (cursor); return records; }
export async function createForgeLead(input: LeadInput) { const lead: Lead = { ...input, id: `CRM-${randomBytes(3).toString("hex").toUpperCase()}` }; if (!notion || !databaseId) return lead; const schema = await getSchema(); const values: Array<[string[], string | number, string?]> = [[["Company", "Name"], lead.company, "title"], [["Contact Name", "Contact"], lead.contact], [["Email"], lead.email], [["Phone"], lead.phone], [["Source"], lead.source], [["Stage", "Status"], lead.stage], [["Owner"], lead.owner], [["Value", "Deal Value"], lead.value], [["Next Follow Up", "Follow Up"], lead.nextFollowUp], [["Notes"], lead.notes], [["Created At", "Created"], new Date().toISOString()]]; const properties: Record<string, any> = {}; for (const [aliases, value, type] of values) { const field = find(schema, aliases, type); if (!field) continue; const property = write(field[1].type, value); if (property) properties[field[0]] = property; } await notion.pages.create({ parent: { database_id: databaseId }, properties }); return lead; }

export async function rescheduleForgeLead(id: string, nextFollowUp: string): Promise<Lead> {
  if (!notion || !databaseId) {
    const lead = starterLeads.find((item) => item.id === id);
    if (!lead) throw new Error(`CRM lead ${id} was not found.`);
    return { ...lead, nextFollowUp };
  }
  const schema = await getSchema();
  const field = find(schema, ["Next Follow Up", "Follow Up"]);
  if (!field) throw new Error("The CRM database has no Next Follow Up property.");
  const property = write(field[1].type, nextFollowUp);
  if (!property) throw new Error("The CRM Next Follow Up property must be a date.");
  await notion.pages.update({ page_id: id, properties: { [field[0]]: property } });
  const updated = (await readForgeLeads()).find((lead) => lead.id === id);
  if (!updated) throw new Error(`CRM lead ${id} could not be reloaded.`);
  return updated;
}
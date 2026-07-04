import { Client } from "@notionhq/client";
import { randomBytes } from "crypto";
import { starterExpenses, type Expense, type ExpenseStatus } from "@/lib/forgeosData";

export type ExpenseInput = Omit<Expense, "id">;
const databaseId = process.env.FORGEOS_EXPENSES_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
type Schema = Record<string, { type?: string }>;

function find(schema: Schema, aliases: string[], fallbackType?: string) {
  return Object.entries(schema).find(([name]) => aliases.some((alias) => alias.toLowerCase() === name.toLowerCase())) ||
    (fallbackType ? Object.entries(schema).find(([, field]) => field.type === fallbackType) : undefined);
}
function read(property: any) {
  if (!property) return "";
  if (property.type === "title") return property.title?.[0]?.plain_text || "";
  if (property.type === "rich_text") return property.rich_text?.[0]?.plain_text || "";
  if (property.type === "select") return property.select?.name || "";
  if (property.type === "status") return property.status?.name || "";
  if (property.type === "number") return property.number ?? 0;
  if (property.type === "date") return property.date?.start || "";
  if (property.type === "url") return property.url || "";
  return "";
}
function write(type: string | undefined, value: string | number) {
  if (type === "title") return { title: [{ text: { content: String(value) } }] };
  if (type === "rich_text") return { rich_text: [{ text: { content: String(value) } }] };
  if (type === "number") return { number: Number(value) };
  if (type === "select") return { select: { name: String(value) } };
  if (type === "status") return { status: { name: String(value) } };
  if (type === "date") return value ? { date: { start: String(value) } } : { date: null };
  if (type === "url") return { url: value ? String(value) : null };
  return null;
}
async function getSchema() {
  if (!notion || !databaseId) return {} as Schema;
  const database = await notion.databases.retrieve({ database_id: databaseId });
  return ((database as any).properties || {}) as Schema;
}
function toExpense(page: any, schema: Schema): Expense {
  const get = (aliases: string[], type?: string) => { const field = find(schema, aliases, type); return field ? read(page.properties?.[field[0]]) : ""; };
  const status = String(get(["Status"]));
  return {
    id: String(page.id),
    title: String(get(["Title", "Name"], "title")),
    amount: Number(get(["Amount"]) || 0),
    submittedRole: String(get(["Submitted Role", "Role"])),
    status: (["Draft", "Submitted", "In review", "Approved", "Rejected", "Reimbursed"].includes(status) ? status : "Submitted") as ExpenseStatus,
    expenseDate: String(get(["Expense Date", "Date"])),
    notes: String(get(["Notes"])),
  };
}
export async function readForgeExpenses(): Promise<Expense[]> {
  if (!notion || !databaseId) return starterExpenses;
  const schema = await getSchema(); const records: Expense[] = []; let cursor: string | undefined;
  do { const response = await notion.databases.query({ database_id: databaseId, start_cursor: cursor }); records.push(...response.results.map((page) => toExpense(page, schema))); cursor = response.has_more ? response.next_cursor || undefined : undefined; } while (cursor);
  return records;
}
export async function createForgeExpense(input: ExpenseInput) {
  const expense: Expense = { ...input, id: `EXP-${randomBytes(3).toString("hex").toUpperCase()}` };
  if (!notion || !databaseId) return expense;
  const schema = await getSchema();
  const values: Array<[string[], string | number, string?]> = [
    [["Title", "Name"], expense.title, "title"], [["Amount"], expense.amount],
    [["Submitted Role", "Role"], expense.submittedRole], [["Status"], expense.status],
    [["Expense Date", "Date"], expense.expenseDate], [["Notes"], expense.notes],
  ];
  const properties: Record<string, any> = {};
  for (const [aliases, value, type] of values) { const field = find(schema, aliases, type); if (!field) continue; const property = write(field[1].type, value); if (property) properties[field[0]] = property; }
  await notion.pages.create({ parent: { database_id: databaseId }, properties }); return expense;
}

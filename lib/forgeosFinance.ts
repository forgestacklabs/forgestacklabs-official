import { notionClient, ensureForgeFinanceNotionReady } from "@/lib/notion";
import type { CashSnapshot, RevenueEntry } from "@/lib/forgeosData";

type Schema = Record<string, { type?: string }>;

function find(schema: Schema, aliases: string[], fallbackType?: string) {
  return (
    Object.entries(schema).find(([name]) => aliases.some((alias) => alias.toLowerCase() === name.toLowerCase())) ||
    (fallbackType ? Object.entries(schema).find(([, field]) => field.type === fallbackType) : undefined)
  );
}

function read(property: any) {
  if (!property) return "";
  if (property.type === "title") return property.title?.map((item: any) => item.plain_text || "").join("") || "";
  if (property.type === "rich_text") return property.rich_text?.map((item: any) => item.plain_text || "").join("") || "";
  if (property.type === "select") return property.select?.name || "";
  if (property.type === "number") return property.number ?? 0;
  if (property.type === "date") return property.date?.start || "";
  return "";
}

function write(type: string | undefined, value: string | number) {
  if (type === "title") return { title: [{ text: { content: String(value) } }] };
  if (type === "rich_text") return { rich_text: [{ text: { content: String(value) } }] };
  if (type === "number") return { number: Number(value) };
  if (type === "select") return { select: { name: String(value) } };
  if (type === "date") return value ? { date: { start: String(value) } } : { date: null };
  return null;
}

async function getSchema(databaseId: string) {
  const database = await notionClient!.databases.retrieve({ database_id: databaseId });
  return ((database as any).properties || {}) as Schema;
}

function normalizeRevenueSource(value: string): RevenueEntry["source"] {
  return ["Client Payment", "Retainer", "One-time Project", "Other"].includes(value)
    ? (value as RevenueEntry["source"])
    : "Other";
}

function normalizeRevenueStatus(value: string): RevenueEntry["status"] {
  return ["Pending", "Received", "Overdue"].includes(value) ? (value as RevenueEntry["status"]) : "Pending";
}

function normalizeCashAccount(value: string): CashSnapshot["account"] {
  return ["Current Account", "Savings", "Cash in Hand", "Other"].includes(value)
    ? (value as CashSnapshot["account"])
    : "Other";
}

function getFieldValue(page: any, schema: Schema, aliases: string[], type?: string) {
  const field = find(schema, aliases, type);
  return field ? read(page.properties?.[field[0]]) : "";
}

function revenueFromPage(page: any, schema: Schema): RevenueEntry {
  return {
    id: String(page.id),
    title: String(getFieldValue(page, schema, ["Title", "Name"], "title")),
    amount: Number(getFieldValue(page, schema, ["Amount"]) || 0),
    client: String(getFieldValue(page, schema, ["Client"])),
    source: normalizeRevenueSource(String(getFieldValue(page, schema, ["Source"]))),
    status: normalizeRevenueStatus(String(getFieldValue(page, schema, ["Status"]))),
    revenueDate: String(getFieldValue(page, schema, ["Revenue Date", "Date"])),
    notes: String(getFieldValue(page, schema, ["Notes"])),
  };
}

function cashSnapshotFromPage(page: any, schema: Schema): CashSnapshot {
  return {
    id: String(page.id),
    title: String(getFieldValue(page, schema, ["Title", "Name"], "title")),
    balance: Number(getFieldValue(page, schema, ["Balance", "Amount"]) || 0),
    account: normalizeCashAccount(String(getFieldValue(page, schema, ["Account"]))),
    snapshotDate: String(getFieldValue(page, schema, ["Snapshot Date", "Date"])),
    notes: String(getFieldValue(page, schema, ["Notes"])),
  };
}

async function queryAll(databaseId: string, sorts: Array<{ property: string; direction: "ascending" | "descending" }>) {
  const records: any[] = [];
  let cursor: string | undefined;

  do {
    const response = await notionClient!.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      sorts,
    });

    records.push(...response.results);
    cursor = response.has_more ? response.next_cursor || undefined : undefined;
  } while (cursor);

  return records;
}

export type RevenueInput = Omit<RevenueEntry, "id">;
export type CashSnapshotInput = Omit<CashSnapshot, "id">;

export async function readRevenueEntries() {
  const databaseId = ensureForgeFinanceNotionReady("revenue");
  const schema = await getSchema(databaseId);
  const pages = await queryAll(databaseId, [{ property: "Revenue Date", direction: "descending" }]);
  return pages.map((page) => revenueFromPage(page, schema));
}

export async function createRevenueEntry(input: RevenueInput) {
  const databaseId = ensureForgeFinanceNotionReady("revenue");
  const schema = await getSchema(databaseId);
  const properties: Record<string, any> = {};
  const values: Array<[string[], string | number, string?]> = [
    [["Title", "Name"], input.title, "title"],
    [["Amount"], input.amount, "number"],
    [["Client"], input.client, "rich_text"],
    [["Source"], input.source, "select"],
    [["Status"], input.status, "select"],
    [["Revenue Date", "Date"], input.revenueDate, "date"],
    [["Notes"], input.notes, "rich_text"],
  ];

  for (const [aliases, value, type] of values) {
    const field = find(schema, aliases, type);
    if (!field) continue;
    const property = write(field[1].type, value);
    if (property) properties[field[0]] = property;
  }

  const page = await notionClient!.pages.create({ parent: { database_id: databaseId }, properties });
  return revenueFromPage(page, schema);
}

export async function readCashSnapshots() {
  const databaseId = ensureForgeFinanceNotionReady("cash-position");
  const schema = await getSchema(databaseId);
  const pages = await queryAll(databaseId, [{ property: "Snapshot Date", direction: "descending" }]);
  return pages.map((page) => cashSnapshotFromPage(page, schema));
}

export async function createCashSnapshot(input: CashSnapshotInput) {
  const databaseId = ensureForgeFinanceNotionReady("cash-position");
  const schema = await getSchema(databaseId);
  const properties: Record<string, any> = {};
  const values: Array<[string[], string | number, string?]> = [
    [["Title", "Name"], input.title, "title"],
    [["Balance", "Amount"], input.balance, "number"],
    [["Account"], input.account, "select"],
    [["Snapshot Date", "Date"], input.snapshotDate, "date"],
    [["Notes"], input.notes, "rich_text"],
  ];

  for (const [aliases, value, type] of values) {
    const field = find(schema, aliases, type);
    if (!field) continue;
    const property = write(field[1].type, value);
    if (property) properties[field[0]] = property;
  }

  const page = await notionClient!.pages.create({ parent: { database_id: databaseId }, properties });
  return cashSnapshotFromPage(page, schema);
}

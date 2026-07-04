import { Client } from "@notionhq/client";

export const notionDatabaseId = process.env.NOTION_DATABASE_ID;
export const NOTION_REVENUE_DATABASE_ID = process.env.NOTION_REVENUE_DATABASE_ID;
export const NOTION_CASH_POSITION_DATABASE_ID = process.env.NOTION_CASH_POSITION_DATABASE_ID;

export const notionClient = process.env.NOTION_API_KEY
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null;

export function ensureNotionReady() {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is missing");
  }
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error("NOTION_DATABASE_ID is missing");
  }
}

export function ensureForgeFinanceNotionReady(kind: "revenue" | "cash-position") {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is missing");
  }

  const databaseId =
    kind === "revenue" ? process.env.NOTION_REVENUE_DATABASE_ID : process.env.NOTION_CASH_POSITION_DATABASE_ID;

  if (!databaseId) {
    throw new Error(
      kind === "revenue" ? "NOTION_REVENUE_DATABASE_ID is missing" : "NOTION_CASH_POSITION_DATABASE_ID is missing",
    );
  }

  return databaseId;
}

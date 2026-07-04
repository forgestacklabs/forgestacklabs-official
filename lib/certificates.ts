import { Client } from "@notionhq/client";
import { randomBytes } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type CertificateType = "Internship" | "Employment";

export type CertificateRecord = {
  serial: string;
  name: string;
  email: string;
  certificateType: CertificateType;
  role: string;
  issuedOn: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
};

export type CertificateInput = Omit<CertificateRecord, "serial" | "createdAt">;

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "certificates.json");

const certificateNotionDatabaseId = process.env.CERT_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const useNotionCertificates = Boolean(notion && certificateNotionDatabaseId);

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, "[]", "utf8");
  }
}

function plainText(property: any) {
  if (!property) return "";
  if (property.type === "title") return property.title?.[0]?.plain_text || "";
  if (property.type === "rich_text") return property.rich_text?.[0]?.plain_text || "";
  if (property.type === "email") return property.email || "";
  if (property.type === "select") return property.select?.name || "";
  if (property.type === "date") return property.date?.start || "";
  return "";
}

function notionPageToCertificate(page: any): CertificateRecord {
  const properties = page.properties || {};
  return {
    serial: plainText(properties.Serial),
    name: plainText(properties.Name),
    email: plainText(properties.Email),
    certificateType: (plainText(properties.Type) || "Internship") as CertificateType,
    role: plainText(properties.Role),
    issuedOn: plainText(properties["Issued On"]),
    startDate: plainText(properties["Start Date"]),
    endDate: plainText(properties["End Date"]),
    notes: plainText(properties.Notes),
    createdAt: plainText(properties["Created At"]) || page.created_time || "",
  };
}

async function readCertificatesFromFile(): Promise<CertificateRecord[]> {
  await ensureStore();
  const raw = await readFile(dataFile, "utf8");
  try {
    const parsed = JSON.parse(raw) as CertificateRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeCertificatesToFile(records: CertificateRecord[]) {
  await ensureStore();
  await writeFile(dataFile, JSON.stringify(records, null, 2), "utf8");
}

async function readCertificatesFromNotion(): Promise<CertificateRecord[]> {
  if (!notion || !certificateNotionDatabaseId) return [];

  const records: CertificateRecord[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: certificateNotionDatabaseId,
      start_cursor: cursor,
      sorts: [{ property: "Created At", direction: "descending" }],
    });

    records.push(...response.results.map(notionPageToCertificate));
    cursor = response.has_more ? response.next_cursor || undefined : undefined;
  } while (cursor);

  return records;
}

export async function readCertificates(): Promise<CertificateRecord[]> {
  if (useNotionCertificates) return readCertificatesFromNotion();
  return readCertificatesFromFile();
}

export function createSerial() {
  const year = new Date().getFullYear();
  const token = randomBytes(4).toString("hex").toUpperCase();
  return `FSL-${year}-${token}`;
}

export async function createCertificate(input: CertificateInput) {
  const records = await readCertificates();
  let serial = createSerial();
  while (records.some((record) => record.serial === serial)) {
    serial = createSerial();
  }

  const record: CertificateRecord = {
    ...input,
    serial,
    createdAt: new Date().toISOString(),
  };

  if (useNotionCertificates && notion && certificateNotionDatabaseId) {
    await notion.pages.create({
      parent: { database_id: certificateNotionDatabaseId },
      properties: {
        Name: { title: [{ text: { content: record.name } }] },
        Serial: { rich_text: [{ text: { content: record.serial } }] },
        Email: { email: record.email },
        Type: { select: { name: record.certificateType } },
        Role: { rich_text: [{ text: { content: record.role } }] },
        "Issued On": { date: { start: record.issuedOn } },
        "Start Date": record.startDate ? { date: { start: record.startDate } } : { date: null },
        "End Date": record.endDate ? { date: { start: record.endDate } } : { date: null },
        Notes: { rich_text: [{ text: { content: record.notes || "" } }] },
        "Created At": { date: { start: record.createdAt } },
      },
    });

    return record;
  }

  records.unshift(record);
  await writeCertificatesToFile(records);
  return record;
}

export async function findCertificate(serial: string) {
  const normalized = serial.trim().toUpperCase();

  if (useNotionCertificates && notion && certificateNotionDatabaseId) {
    const response = await notion.databases.query({
      database_id: certificateNotionDatabaseId,
      filter: {
        property: "Serial",
        rich_text: { equals: normalized },
      },
      page_size: 1,
    });

    const page = response.results[0];
    return page ? notionPageToCertificate(page) : null;
  }

  const records = await readCertificatesFromFile();
  return records.find((record) => record.serial.toUpperCase() === normalized) || null;
}

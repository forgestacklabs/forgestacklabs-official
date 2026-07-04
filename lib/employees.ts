import { Client } from "@notionhq/client";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export const employeeDepartments = ["Leadership", "Engineering", "Product", "Design", "Sales", "HR", "Finance", "Operations"] as const;

export type EmployeeDepartment = (typeof employeeDepartments)[number];

export type EmployeeRecord = {
  id: string;
  name: string;
  email?: string;
  designation: string;
  department?: EmployeeDepartment;
  status: "Active" | "Inactive";
  joinedOn?: string;
  createdAt: string;
};

export type EmployeeInput = Omit<EmployeeRecord, "createdAt">;

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "employees.json");

const employeeNotionDatabaseId = process.env.EMPLOYEE_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const useNotionEmployees = Boolean(notion && employeeNotionDatabaseId);

function normalizeDepartment(department: string | null | undefined): EmployeeDepartment {
  const normalized = (department || "Engineering").trim().toLowerCase();
  const match = employeeDepartments.find((option) => option.toLowerCase() === normalized);
  if (!match) throw new Error("Invalid employee department.");
  return match;
}

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

function notionPageToEmployee(page: any): EmployeeRecord {
  const properties = page.properties || {};
  return {
    id: plainText(properties["Employee ID"]),
    name: plainText(properties.Name),
    email: plainText(properties.Email),
    designation: plainText(properties.Designation),
    department: normalizeDepartment(plainText(properties.Department)),
    status: (plainText(properties.Status) || "Active") as EmployeeRecord["status"],
    joinedOn: plainText(properties["Joined On"]),
    createdAt: plainText(properties["Created At"]) || page.created_time || "",
  };
}

async function readEmployeesFromFile(): Promise<EmployeeRecord[]> {
  await ensureStore();
  const raw = await readFile(dataFile, "utf8");
  try {
    const parsed = JSON.parse(raw) as EmployeeRecord[];
    return Array.isArray(parsed) ? parsed.map((record) => ({ ...record, department: normalizeDepartment(record.department) })) : [];
  } catch {
    return [];
  }
}

async function writeEmployeesToFile(records: EmployeeRecord[]) {
  await ensureStore();
  await writeFile(dataFile, JSON.stringify(records, null, 2), "utf8");
}

async function readEmployeesFromNotion(): Promise<EmployeeRecord[]> {
  if (!notion || !employeeNotionDatabaseId) return [];

  const records: EmployeeRecord[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: employeeNotionDatabaseId,
      start_cursor: cursor,
      sorts: [{ property: "Created At", direction: "descending" }],
    });

    records.push(...response.results.map(notionPageToEmployee));
    cursor = response.has_more ? response.next_cursor || undefined : undefined;
  } while (cursor);

  return records;
}

export async function readEmployees(): Promise<EmployeeRecord[]> {
  if (useNotionEmployees) return readEmployeesFromNotion();
  return readEmployeesFromFile();
}

export async function createEmployee(input: EmployeeInput) {
  const records = await readEmployees();
  const normalizedId = input.id.trim().toUpperCase();
  const department = normalizeDepartment(input.department);

  if (records.some((record) => record.id.toUpperCase() === normalizedId)) {
    throw new Error("Employee ID already exists.");
  }

  const record: EmployeeRecord = {
    ...input,
    id: normalizedId,
    department,
    createdAt: new Date().toISOString(),
  };

  if (useNotionEmployees && notion && employeeNotionDatabaseId) {
    await notion.pages.create({
      parent: { database_id: employeeNotionDatabaseId },
      properties: {
        Name: { title: [{ text: { content: record.name } }] },
        "Employee ID": { rich_text: [{ text: { content: record.id } }] },
        Email: record.email ? { email: record.email } : { email: null },
        Designation: { rich_text: [{ text: { content: record.designation } }] },
        Department: { select: { name: record.department || "Engineering" } },
        Status: { select: { name: record.status } },
        "Joined On": record.joinedOn ? { date: { start: record.joinedOn } } : { date: null },
        "Created At": { date: { start: record.createdAt } },
      },
    });

    return record;
  }

  records.unshift(record);
  await writeEmployeesToFile(records);
  return record;
}
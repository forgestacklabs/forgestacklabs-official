import { Client } from "@notionhq/client";
import { randomBytes } from "crypto";
import { starterProjects, type Priority, type Project, type ProjectStatus, type ProjectType } from "@/lib/forgeosData";

export type ProjectInput = Omit<Project, "id" | "progress"> & {
  progress?: number;
};

const projectsNotionDatabaseId = process.env.FORGEOS_PROJECTS_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const useNotionProjects = Boolean(notion && projectsNotionDatabaseId);

function plainText(property: any) {
  if (!property) return "";
  if (property.type === "title") return property.title?.[0]?.plain_text || "";
  if (property.type === "rich_text") return property.rich_text?.[0]?.plain_text || "";
  if (property.type === "select") return property.select?.name || "";
  if (property.type === "date") return property.date?.start || "";
  if (property.type === "number") return String(property.number ?? "");
  return "";
}

function normalizeStatus(value: string): ProjectStatus {
  if (["Planning", "Active", "Blocked", "Completed"].includes(value)) return value as ProjectStatus;
  return "Planning";
}

function normalizePriority(value: string): Priority {
  if (["Low", "Medium", "High"].includes(value)) return value as Priority;
  return "Medium";
}

function normalizeProjectType(value: string): ProjectType {
  return ["Client Project", "Company Project"].includes(value) ? (value as ProjectType) : "Company Project";
}

function notionPageToProject(page: any): Project {
  const properties = page.properties || {};
  return {
    id: plainText(properties["Project ID"]) || page.id,
    name: plainText(properties.Name),
    owner: plainText(properties.Owner),
    status: normalizeStatus(plainText(properties.Status)),
    priority: normalizePriority(plainText(properties.Priority)),
    dueDate: plainText(properties["Due Date"]),
    progress: Number(plainText(properties.Progress) || 0),
    projectType: normalizeProjectType(plainText(properties["Project Type"]) || plainText(properties.Type)),
    totalAmount: Number(plainText(properties["Total Amount"]) || plainText(properties.Budget) || plainText(properties.Amount) || 0),
    amountReceived: Number(plainText(properties["Amount Received"]) || plainText(properties["Received Amount"]) || 0),
  };
}

function createProjectId() {
  return `PRJ-${randomBytes(3).toString("hex").toUpperCase()}`;
}

async function existingProjectProperties() {
  if (!notion || !projectsNotionDatabaseId) return new Set<string>();
  const database = await notion.databases.retrieve({ database_id: projectsNotionDatabaseId });
  return new Set(Object.keys((database as any).properties || {}));
}

function pickExistingProperties(properties: Record<string, any>, existing: Set<string>) {
  return Object.fromEntries(Object.entries(properties).filter(([name]) => existing.has(name)));
}

export async function readForgeProjects(): Promise<Project[]> {
  if (!useNotionProjects || !notion || !projectsNotionDatabaseId) return starterProjects;

  const records: Project[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: projectsNotionDatabaseId,
      start_cursor: cursor,
      sorts: [{ property: "Created At", direction: "descending" }],
    });

    records.push(...response.results.map(notionPageToProject));
    cursor = response.has_more ? response.next_cursor || undefined : undefined;
  } while (cursor);

  return records;
}

export async function createForgeProject(input: ProjectInput) {
  const project: Project = {
    id: createProjectId(),
    name: input.name,
    owner: input.owner,
    status: input.status,
    priority: input.priority,
    dueDate: input.dueDate || "",
    progress: input.progress ?? 0,
    projectType: input.projectType || "Company Project",
    totalAmount: input.projectType === "Client Project" ? input.totalAmount ?? 0 : 0,
    amountReceived: input.projectType === "Client Project" ? input.amountReceived ?? 0 : 0,
  };

  if (!useNotionProjects || !notion || !projectsNotionDatabaseId) return project;

  const existing = await existingProjectProperties();
  const properties = pickExistingProperties({
    Name: { title: [{ text: { content: project.name } }] },
    "Project ID": { rich_text: [{ text: { content: project.id } }] },
    Owner: { select: { name: project.owner } },
    Status: { select: { name: project.status } },
    Priority: { select: { name: project.priority } },
    "Due Date": project.dueDate ? { date: { start: project.dueDate } } : { date: null },
    Progress: { number: project.progress },
    "Project Type": { select: { name: project.projectType } },
    "Total Amount": { number: project.totalAmount },
    "Amount Received": { number: project.amountReceived },
    "Created At": { date: { start: new Date().toISOString() } },
  }, existing);

  await notion.pages.create({
    parent: { database_id: projectsNotionDatabaseId },
    properties,
  });

  return project;
}
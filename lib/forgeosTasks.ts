import { Client } from "@notionhq/client";
import { randomBytes } from "crypto";
import { starterTasks, type Priority, type Task, type TaskStatus } from "@/lib/forgeosData";
export type TaskInput = Omit<Task, "id" | "status"> & { status?: TaskStatus };
const tasksDatabaseId = process.env.FORGEOS_TASKS_NOTION_DATABASE_ID;
const projectsDatabaseId = process.env.FORGEOS_PROJECTS_NOTION_DATABASE_ID;
const employeesDatabaseId = process.env.EMPLOYEE_NOTION_DATABASE_ID;
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const taskDateOverrides = new Map<string, string>();
type Schema = Record<string, { type?: string }>;
function text(property: any) { if (!property) return ""; if (property.type === "title") return property.title?.[0]?.plain_text || ""; if (property.type === "rich_text") return property.rich_text?.[0]?.plain_text || ""; if (property.type === "select") return property.select?.name || ""; if (property.type === "status") return property.status?.name || ""; if (property.type === "date") return property.date?.start || ""; return ""; }
function status(value: string): TaskStatus { return (["Todo", "In Progress", "Blocked", "Done"].includes(value) ? value : "Todo") as TaskStatus; }
function priority(value: string): Priority { return (["Low", "Medium", "High"].includes(value) ? value : "Medium") as Priority; }
async function pageTitle(id: string) { if (!notion) return ""; const page = await notion.pages.retrieve({ page_id: id }); const properties = (page as any).properties || {}; const title = Object.values(properties).find((property: any) => property?.type === "title") as any; return title?.title?.[0]?.plain_text || ""; }
async function relationTitle(property: any) { return property?.type === "relation" && property.relation?.[0]?.id ? pageTitle(property.relation[0].id) : text(property); }
async function toTask(page: any): Promise<Task> { const properties = page.properties || {}; return { id: text(properties["Task ID"]) || page.id, title: text(properties.Title), project: await relationTitle(properties.Project), assignee: await relationTitle(properties.Assignee), status: status(text(properties.Status)), priority: priority(text(properties.Priority)), dueDate: text(properties["Due Date"]) }; }
async function schema() { if (!notion || !tasksDatabaseId) return {} as Schema; const database = await notion.databases.retrieve({ database_id: tasksDatabaseId }); return ((database as any).properties || {}) as Schema; }
async function relatedPageId(databaseId: string | undefined, name: string) { if (!notion || !databaseId) return ""; const response = await notion.databases.query({ database_id: databaseId, filter: { property: "Name", title: { equals: name } }, page_size: 1 }); return response.results[0]?.id || ""; }
async function namedValue(name: string, field: { type?: string } | undefined, relatedDatabaseId?: string) { if (field?.type === "relation") { const id = await relatedPageId(relatedDatabaseId, name); if (!id) throw new Error(`"${name}" was not found in the related Notion database.`); return { relation: [{ id }] }; } if (field?.type === "select") return { select: { name } }; if (field?.type === "title") return { title: [{ text: { content: name } }] }; return { rich_text: [{ text: { content: name } }] }; }
export async function readForgeTasks(): Promise<Task[]> { if (!notion || !tasksDatabaseId) return starterTasks.map((task) => ({ ...task, dueDate: taskDateOverrides.get(task.id) || task.dueDate })); const records: Task[] = []; let cursor: string | undefined; do { const response = await notion.databases.query({ database_id: tasksDatabaseId, start_cursor: cursor }); records.push(...(await Promise.all(response.results.map(toTask)))); cursor = response.has_more ? response.next_cursor || undefined : undefined; } while (cursor); return records; }
export async function createForgeTask(input: TaskInput) {
  const task: Task = { id: `TSK-${randomBytes(3).toString("hex").toUpperCase()}`, title: input.title, project: input.project, assignee: input.assignee, status: input.status || "Todo", priority: input.priority, dueDate: input.dueDate || "" };
  if (!notion || !tasksDatabaseId) return task; const fields = await schema(); const properties: Record<string, any> = {};
  const set = (name: string, value: any) => { if (fields[name]) properties[name] = value; };
  set("Title", { title: [{ text: { content: task.title } }] }); set("Task ID", { rich_text: [{ text: { content: task.id } }] });
  if (fields.Project) set("Project", await namedValue(task.project, fields.Project, projectsDatabaseId));
  if (fields.Assignee) set("Assignee", await namedValue(task.assignee, fields.Assignee, employeesDatabaseId));
  if (fields.Status) set("Status", fields.Status.type === "status" ? { status: { name: task.status } } : { select: { name: task.status } });
  set("Priority", { select: { name: task.priority } }); set("Due Date", task.dueDate ? { date: { start: task.dueDate } } : { date: null }); set("Created At", { date: { start: new Date().toISOString() } });
  await notion.pages.create({ parent: { database_id: tasksDatabaseId }, properties }); return task;
}

export async function rescheduleForgeTask(id: string, dueDate: string): Promise<Task> {
  if (!notion || !tasksDatabaseId) {
    const task = starterTasks.find((item) => item.id === id);
    if (!task) throw new Error(`Task ${id} was not found.`);
    taskDateOverrides.set(id, dueDate);
    return { ...task, dueDate };
  }
  let pageId = id;
  if (id.startsWith("TSK-")) {
    const response = await notion.databases.query({ database_id: tasksDatabaseId, filter: { property: "Task ID", rich_text: { equals: id } }, page_size: 1 });
    pageId = response.results[0]?.id || "";
  }
  if (!pageId) throw new Error(`Task ${id} was not found.`);
  await notion.pages.update({ page_id: pageId, properties: { "Due Date": { date: { start: dueDate } } } });
  const tasks = await readForgeTasks();
  const updated = tasks.find((task) => task.id === id);
  if (!updated) throw new Error(`Task ${id} could not be reloaded.`);
  return updated;
}
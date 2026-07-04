import { NextResponse } from "next/server";
import { isDateBlocked } from "@/lib/blockedDates";
import { readBlockedDates } from "@/lib/forgeosBlockedDates";
import { createForgeNotification } from "@/lib/forgeosNotifications";
import { readEmployees } from "@/lib/employees";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createForgeTask, readForgeTasks, type TaskInput } from "@/lib/forgeosTasks";

type RequestBody = Partial<TaskInput>;

function missingAdminAuthResponse() {
  return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "Please login from ForgeOS first." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!hasAdminAuthConfig()) return missingAdminAuthResponse();
  if (!getAdminSession(request)) return unauthorizedResponse();

  try {
    const tasks = await readForgeTasks();
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load tasks." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return missingAdminAuthResponse();
  if (!getAdminSession(request)) return unauthorizedResponse();

  const body = (await request.json()) as RequestBody;
  if (!body.title || !body.project || !body.assignee || !body.priority || !body.dueDate) {
    return NextResponse.json({ error: "Missing required task details." }, { status: 400 });
  }

  try {
    const blocked = isDateBlocked(body.dueDate, await readBlockedDates());
    if (blocked) return NextResponse.json({ error: `This date falls in a blocked period: ${blocked.reason}` }, { status: 400 });
    const task = await createForgeTask({
      title: body.title,
      project: body.project,
      assignee: body.assignee,
      status: body.status || "Todo",
      priority: body.priority,
      dueDate: body.dueDate,
    });

    const employees = await readEmployees();
    const assignee = employees.find((employee) => employee.name === task.assignee);
    if (assignee?.email) {
      await createForgeNotification({ title: "New task assigned", body: `${task.title} was assigned to you for ${task.project}.`, type: "Task", recipientRole: "", recipientEmail: assignee.email, linkedModule: "tasks", linkedRecordId: task.id }).catch(() => undefined);
    }

    return NextResponse.json({ task });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create task." },
      { status: 500 },
    );
  }
}
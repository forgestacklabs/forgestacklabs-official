import { NextResponse } from "next/server";
import { isDateBlocked } from "@/lib/blockedDates";
import { readBlockedDates } from "@/lib/forgeosBlockedDates";
import { createForgeNotification } from "@/lib/forgeosNotifications";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createForgeProject, readForgeProjects, type ProjectInput } from "@/lib/forgeosProjects";

type RequestBody = Partial<ProjectInput>;

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
    const projects = await readForgeProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load projects." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return missingAdminAuthResponse();
  if (!getAdminSession(request)) return unauthorizedResponse();

  const body = (await request.json()) as RequestBody;
  if (!body.name || !body.owner || !body.status || !body.priority) {
    return NextResponse.json({ error: "Missing required project details." }, { status: 400 });
  }

  if (body.projectType === "Client Project") {
    if (typeof body.totalAmount !== "number" || typeof body.amountReceived !== "number") {
      return NextResponse.json({ error: "Client projects need total amount and amount received." }, { status: 400 });
    }
  }

  try {
    const blocked = isDateBlocked(body.dueDate || "", await readBlockedDates());
    if (blocked) return NextResponse.json({ error: `This date falls in a blocked period: ${blocked.reason}` }, { status: 400 });
    const project = await createForgeProject({
      name: body.name,
      owner: body.owner,
      status: body.status,
      priority: body.priority,
      dueDate: body.dueDate || "",
      progress: body.progress ?? 0,
      projectType: body.projectType || "Company Project",
      totalAmount: body.projectType === "Client Project" ? body.totalAmount ?? 0 : 0,
      amountReceived: body.projectType === "Client Project" ? body.amountReceived ?? 0 : 0,
    });

    await createForgeNotification({ title: "New project created", body: `${project.name} was created and is due ${project.dueDate || "without a deadline"}.`, type: "Project", recipientRole: "CEO", recipientEmail: "", linkedModule: "projects", linkedRecordId: project.id }).catch(() => undefined);

    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create project." },
      { status: 500 },
    );
  }
}
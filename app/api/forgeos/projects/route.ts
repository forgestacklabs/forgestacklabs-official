import { NextResponse } from "next/server";
import { isDateBlocked } from "@/lib/blockedDates";
import { readBlockedDates } from "@/lib/forgeosBlockedDates";
import { createForgeNotification } from "@/lib/forgeosNotifications";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createForgeProject, readForgeProjects, updateProjectClientMetrics, updateProjectProgress, type ProjectInput } from "@/lib/forgeosProjects";

type RequestBody = Partial<ProjectInput>;
type PatchBody = {
  id?: string;
  amountReceived?: number;
  progress?: number;
};

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

export async function PATCH(request: Request) {
  if (!hasAdminAuthConfig()) return missingAdminAuthResponse();
  if (!getAdminSession(request)) return unauthorizedResponse();

  const body = (await request.json()) as PatchBody;
  if (!body.id || typeof body.progress !== "number") {
    return NextResponse.json({ error: "Project ID and progress are required." }, { status: 400 });
  }

  if (body.progress < 0 || body.progress > 100) {
    return NextResponse.json({ error: "Progress must be between 0 and 100." }, { status: 400 });
  }

  try {
    const projects = await readForgeProjects();
    const project = projects.find((item) => item.id === body.id);
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    if (project.projectType !== "Client Project") {
      const updated = await updateProjectProgress(project.id, body.progress);
      return NextResponse.json({ project: { ...project, ...updated } });
    }

    if (typeof body.amountReceived !== "number" || body.amountReceived < 0) {
      return NextResponse.json({ error: "Valid amount received is required for client projects." }, { status: 400 });
    }

    if (body.amountReceived > project.totalAmount) {
      return NextResponse.json({ error: "Amount received cannot exceed total amount." }, { status: 400 });
    }

    const updated = await updateProjectClientMetrics(project.id, body.amountReceived, body.progress);

    await createForgeNotification({
      title: "Client payment updated",
      body: `${project.name} received amount and progress were updated.`,
      type: "Project",
      recipientRole: "CEO",
      recipientEmail: "",
      linkedModule: "projects",
      linkedRecordId: project.id,
    }).catch(() => undefined);

    return NextResponse.json({ project: { ...project, ...updated } });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update project payment." },
      { status: 500 },
    );
  }
}

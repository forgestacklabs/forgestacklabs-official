import { NextResponse } from "next/server";
import { createForgeNotification } from "@/lib/forgeosNotifications";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createForgeDocument, readForgeDocuments, type DocumentInput } from "@/lib/forgeosDocuments";
const unauthorized = () => NextResponse.json({ error: "Please login from ForgeOS first." }, { status: 401 });
export async function GET(request: Request) { if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 }); if (!getAdminSession(request)) return unauthorized(); try { return NextResponse.json({ documents: await readForgeDocuments() }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load documents." }, { status: 500 }); } }
export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 }); const session = getAdminSession(request); if (!session) return unauthorized();
  const body = (await request.json()) as Partial<DocumentInput>; if (!body.title || !body.category || !body.visibility) return NextResponse.json({ error: "Missing required document details." }, { status: 400 });
  try { const document = await createForgeDocument({ title: body.title, category: body.category, visibility: body.visibility, owner: `${session.name} (${session.role})`, fileUrl: body.fileUrl || "" }); await createForgeNotification({ title: "New document available", body: `${document.title} was added with ${document.visibility} visibility.`, type: "Document", recipientRole: document.visibility === "Engineering" ? "CTO" : document.visibility === "Operations" ? "COO" : "CEO", recipientEmail: "", linkedModule: "documents", linkedRecordId: document.id }).catch(() => undefined); return NextResponse.json({ document }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create document." }, { status: 500 }); }
}

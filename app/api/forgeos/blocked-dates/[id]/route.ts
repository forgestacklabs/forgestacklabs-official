import { NextResponse } from "next/server";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { deleteBlockedDate } from "@/lib/forgeosBlockedDates";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  const session = getAdminSession(request);
  if (!session) return NextResponse.json({ error: "Please login from ForgeOS first." }, { status: 401 });
  if (!['CEO', 'COO'].includes(session.role)) return NextResponse.json({ error: "Only CEO and COO can remove blocked dates." }, { status: 403 });
  try {
    const removed = await deleteBlockedDate(params.id);
    if (!removed) return NextResponse.json({ error: "Blocked date range not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to remove blocked dates." }, { status: 500 }); }
}
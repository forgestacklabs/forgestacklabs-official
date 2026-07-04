import { NextResponse } from "next/server";
import { isDateBlocked } from "@/lib/blockedDates";
import { readBlockedDates } from "@/lib/forgeosBlockedDates";
import { createForgeNotification } from "@/lib/forgeosNotifications";
import { readEmployees } from "@/lib/employees";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createForgeMeeting, readForgeMeetings, type MeetingInput } from "@/lib/forgeosMeetings";
function formatMeetingDateTime(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return value;
  const [, year, month, day, hourValue, minute] = match;
  const hour = Number(hourValue);
  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-IN", { month: "short" });
  return `${Number(day)} ${monthName} ${year}, ${hour % 12 || 12}:${minute} ${hour >= 12 ? "PM" : "AM"}`;
}
const unauthorized = () => NextResponse.json({ error: "Please login from ForgeOS first." }, { status: 401 });
export async function GET(request: Request) { if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 }); if (!getAdminSession(request)) return unauthorized(); try { return NextResponse.json({ meetings: await readForgeMeetings() }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load meetings." }, { status: 500 }); } }
export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 }); const session = getAdminSession(request); if (!session) return unauthorized();
  const body = (await request.json()) as Partial<MeetingInput>; if (!body.title || !body.when || !body.type) return NextResponse.json({ error: "Missing required meeting details." }, { status: 400 });
  try { const blocked = isDateBlocked(body.when.slice(0, 10), await readBlockedDates()); if (blocked) return NextResponse.json({ error: `This date falls in a blocked period: ${blocked.reason}` }, { status: 400 }); const meeting = await createForgeMeeting({ title: body.title, when: body.when, attendees: body.attendees || session.name || session.role, type: body.type, meetingLink: body.meetingLink || "" }); const attendeeNames = meeting.attendees.split(",").map((name) => name.trim()); const employees = await readEmployees(); await Promise.all(employees.filter((employee) => attendeeNames.includes(employee.name)).map((employee) => createForgeNotification({ title: "Meeting scheduled", body: `${meeting.title} is scheduled for ${formatMeetingDateTime(meeting.when)}.`, type: "Meeting", recipientRole: "", recipientEmail: employee.email || "", linkedModule: "meetings", linkedRecordId: meeting.id }).catch(() => undefined))); return NextResponse.json({ meeting }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create meeting." }, { status: 500 }); }
}

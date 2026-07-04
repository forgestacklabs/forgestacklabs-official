import { NextResponse } from "next/server";
import { isDateBlocked } from "@/lib/blockedDates";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createBlockedDate, readBlockedDates } from "@/lib/forgeosBlockedDates";
import { readForgeTasks, rescheduleForgeTask } from "@/lib/forgeosTasks";
import { readForgeLeads, rescheduleForgeLead } from "@/lib/forgeosCRM";
import { readForgeMeetings, rescheduleForgeMeeting } from "@/lib/forgeosMeetings";

const unauthorized = () => NextResponse.json({ error: "Please login from ForgeOS first." }, { status: 401 });
const forbidden = () => NextResponse.json({ error: "Only CEO and COO can block dates." }, { status: 403 });
type Reschedule = { id: string; date: string };
type RequestBody = { startDate?: string; endDate?: string; reason?: string; taskReschedules?: Reschedule[]; leadReschedules?: Reschedule[]; meetingReschedules?: Reschedule[] };

export async function GET(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  if (!getAdminSession(request)) return unauthorized();
  try { return NextResponse.json({ blockedDates: await readBlockedDates() }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load blocked dates." }, { status: 500 }); }
}

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  const session = getAdminSession(request);
  if (!session) return unauthorized();
  if (!["CEO", "COO"].includes(session.role)) return forbidden();
  const body = await request.json() as RequestBody;
  if (!body.startDate || !body.endDate || !body.reason?.trim()) return NextResponse.json({ error: "Start date, end date, and reason are required." }, { status: 400 });
  if (body.startDate > body.endDate) return NextResponse.json({ error: "Start date must be on or before end date." }, { status: 400 });
  try {
    const ranges = await readBlockedDates();
    if (ranges.some((range) => range.startDate === body.startDate && range.endDate === body.endDate)) return NextResponse.json({ error: "This blocked date range already exists." }, { status: 409 });
    const [tasks, leads, meetings] = await Promise.all([readForgeTasks(), readForgeLeads(), readForgeMeetings()]);
    const taskConflicts = tasks.filter((item) => item.dueDate >= body.startDate! && item.dueDate <= body.endDate!);
    const leadConflicts = leads.filter((item) => item.nextFollowUp >= body.startDate! && item.nextFollowUp <= body.endDate!);
    const meetingConflicts = meetings.filter((item) => item.when.slice(0, 10) >= body.startDate! && item.when.slice(0, 10) <= body.endDate!);
    const taskDates = new Map((body.taskReschedules || []).map((item) => [item.id, item.date]));
    const leadDates = new Map((body.leadReschedules || []).map((item) => [item.id, item.date]));
    const meetingDates = new Map((body.meetingReschedules || []).map((item) => [item.id, item.date]));
    const missing = taskConflicts.some((item) => !taskDates.get(item.id)) || leadConflicts.some((item) => !leadDates.get(item.id)) || meetingConflicts.some((item) => !meetingDates.get(item.id));
    const conflictPayload = { requiresReschedule: true, taskConflicts, leadConflicts, meetingConflicts };
    if (missing) return NextResponse.json({ error: "Choose a new date for every conflicting task, CRM follow-up, and meeting.", ...conflictPayload }, { status: 409 });
    const replacements = [
      ...taskConflicts.map((item) => ({ title: item.title, date: taskDates.get(item.id)! })),
      ...leadConflicts.map((item) => ({ title: item.company, date: leadDates.get(item.id)! })),
      ...meetingConflicts.map((item) => ({ title: item.title, date: meetingDates.get(item.id)! })),
    ];
    for (const replacement of replacements) {
      if (replacement.date <= body.endDate) return NextResponse.json({ error: `The new date for ${replacement.title} must be after ${body.endDate}.`, ...conflictPayload }, { status: 400 });
      const existingBlock = isDateBlocked(replacement.date, ranges);
      if (existingBlock) return NextResponse.json({ error: `The new date for ${replacement.title} falls in a blocked period: ${existingBlock.reason}`, ...conflictPayload }, { status: 400 });
    }
    const [rescheduledTasks, rescheduledLeads, rescheduledMeetings] = await Promise.all([
      Promise.all(taskConflicts.map((item) => rescheduleForgeTask(item.id, taskDates.get(item.id)!))),
      Promise.all(leadConflicts.map((item) => rescheduleForgeLead(item.id, leadDates.get(item.id)!))),
      Promise.all(meetingConflicts.map((item) => rescheduleForgeMeeting(item.id, meetingDates.get(item.id)!))),
    ]);
    const blockedDate = await createBlockedDate({ startDate: body.startDate, endDate: body.endDate, reason: body.reason.trim(), createdBy: session.name || session.email });
    return NextResponse.json({ blockedDate, rescheduledTasks, rescheduledLeads, rescheduledMeetings });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to block dates." }, { status: 500 }); }
}
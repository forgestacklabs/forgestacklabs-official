"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Lead, Meeting, Project, Task } from "@/lib/forgeosData";
import { isDateBlocked } from "@/lib/blockedDates";
import { useForgeOS } from "@/components/forgeos/ForgeOSShell";
import { SlideOver } from "@/components/forgeos/SlideOver";
import { PageHeading, SectionLoading, SimpleForm, TextField, panelClass, readJson } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";

type Event = { id: string; date: string; title: string; source: "Meeting" | "Project" | "Task" | "CRM"; detail: string; link?: string };
const key = (value: string) => value.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || "";
function fromDate(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function localDate(value: string) { const [year, month, day] = value.split("-").map(Number); return new Date(year, month - 1, day); }

export default function CalendarPage() {
  const { role, user, notify, blockedDates, setBlockedDates } = useForgeOS();
  const leadership = ["CEO", "COO"].includes(role);
  const [blockPanelOpen, setBlockPanelOpen] = useState(false);
  const [taskConflicts, setTaskConflicts] = useState<Task[]>([]);
  const [leadConflicts, setLeadConflicts] = useState<Lead[]>([]);
  const [meetingConflicts, setMeetingConflicts] = useState<Meeting[]>([]);
  const { data: meetings, setData: setMeetings, loading: meetingsLoading } = useApiData<Meeting[]>("/api/forgeos/meetings", []);
  const { data: projects, loading: projectsLoading } = useApiData<Project[]>("/api/forgeos/projects", []);
  const { data: allTasks, setData: setAllTasks, loading: tasksLoading } = useApiData<Task[]>("/api/forgeos/tasks", []);
  const { data: leads, setData: setLeads, loading: leadsLoading } = useApiData<Lead[]>("/api/forgeos/crm", [], undefined, leadership);
  const identities = useMemo(() => new Set([user.name, user.email, ...(role === "Employee" ? [] : [role])].map((value) => value.trim().toLowerCase()).filter(Boolean)), [role, user.email, user.name]);
  const tasks = useMemo(() => allTasks.filter((task) => identities.has(task.assignee.trim().toLowerCase())), [allTasks, identities]);
  const visibleMeetings = useMemo(() => meetings.filter((meeting) => meeting.attendees.split(",").some((attendee) => identities.has(attendee.trim().toLowerCase()))), [identities, meetings]);
  const now = new Date(); const today = fromDate(now);
  const [month, setMonth] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selected, setSelected] = useState(today);
  const events = useMemo<Event[]>(() => [
    ...visibleMeetings.map((item) => ({ id: `m-${item.id}`, date: key(item.when), title: item.title, source: "Meeting" as const, detail: `${item.type} . ${item.attendees}`, link: item.meetingLink })),
    ...projects.map((item) => ({ id: `p-${item.id}`, date: key(item.dueDate), title: item.name, source: "Project" as const, detail: `${item.status} . ${item.priority}` })),
    ...tasks.map((item) => ({ id: `t-${item.id}`, date: key(item.dueDate), title: item.title, source: "Task" as const, detail: `${item.project} . ${item.assignee}` })),
    ...leads.map((item) => ({ id: `l-${item.id}`, date: key(item.nextFollowUp), title: item.company, source: "CRM" as const, detail: `Follow up with ${item.contact}` })),
  ].filter((item) => item.date), [leads, projects, tasks, visibleMeetings]);
  const grouped = useMemo(() => { const map = new Map<string, Event[]>(); events.forEach((event) => map.set(event.date, [...(map.get(event.date) || []), event])); return map; }, [events]);
  const year = month.getFullYear(); const monthIndex = month.getMonth();
  const first = new Date(year, monthIndex, 1 - new Date(year, monthIndex, 1).getDay());
  const days = Array.from({ length: 42 }, (_, index) => new Date(first.getFullYear(), first.getMonth(), first.getDate() + index));
  const selectedEvents = grouped.get(selected) || [];
  const selectedBlock = isDateBlocked(selected, blockedDates);
  if (meetingsLoading || projectsLoading || tasksLoading || leadsLoading) return <><PageHeading title="Calendar" description="Meetings, deadlines, and follow-ups in one timeline." /><SectionLoading label="Loading calendar" /></>;
  const colors: Record<Event["source"], string> = { Meeting: "bg-sky-50 text-sky-800", Project: "bg-emerald-50 text-emerald-800", Task: "bg-amber-50 text-amber-900", CRM: "bg-rose-50 text-rose-800" };
  function change(offset: number) { const next = new Date(year, monthIndex + offset, 1); setMonth(next); setSelected(fromDate(next)); }
  async function addBlockedDates(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const element = event.currentTarget; const form = new FormData(element);
    const taskReschedules = taskConflicts.map((item) => ({ id: item.id, date: String(form.get(`task:${item.id}`) || "") }));
    const leadReschedules = leadConflicts.map((item) => ({ id: item.id, date: String(form.get(`lead:${item.id}`) || "") }));
    const meetingReschedules = meetingConflicts.map((item) => ({ id: item.id, date: String(form.get(`meeting:${item.id}`) || "") }));
    const payload = { startDate: String(form.get("startDate") || ""), endDate: String(form.get("endDate") || ""), reason: String(form.get("reason") || ""), taskReschedules, leadReschedules, meetingReschedules };
    const response = await fetch("/api/forgeos/blocked-dates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const body = await readJson(response);
    if (!response.ok) {
      if (body.requiresReschedule) { setTaskConflicts(body.taskConflicts || []); setLeadConflicts(body.leadConflicts || []); setMeetingConflicts(body.meetingConflicts || []); }
      notify(body.error || "Unable to block dates."); return;
    }
    setBlockedDates((current) => [...current, body.blockedDate].sort((a, b) => a.startDate.localeCompare(b.startDate)));
    if (Array.isArray(body.rescheduledTasks)) setAllTasks((current) => current.map((item) => body.rescheduledTasks.find((updated: Task) => updated.id === item.id) || item));
    if (Array.isArray(body.rescheduledLeads)) setLeads((current) => current.map((item) => body.rescheduledLeads.find((updated: Lead) => updated.id === item.id) || item));
    if (Array.isArray(body.rescheduledMeetings)) setMeetings((current) => current.map((item) => body.rescheduledMeetings.find((updated: Meeting) => updated.id === item.id) || item));
    element.reset(); setTaskConflicts([]); setLeadConflicts([]); setMeetingConflicts([]); setBlockPanelOpen(false); notify("Dates blocked and conflicting records rescheduled successfully.");
  }
  async function removeBlockedDate(id: string) {
    const response = await fetch(`/api/forgeos/blocked-dates/${encodeURIComponent(id)}`, { method: "DELETE" });
    const body = await readJson(response);
    if (!response.ok) { notify(body.error || "Unable to remove blocked dates."); return; }
    setBlockedDates((current) => current.filter((range) => range.id !== id)); notify("Blocked dates removed successfully.");
  }
  return <>
    <div className="mb-6 flex items-start justify-between gap-4">
      <PageHeading title="Calendar" description="Meetings, deadlines, and follow-ups in one timeline." />
      {leadership && <button type="button" onClick={() => { setTaskConflicts([]); setLeadConflicts([]); setMeetingConflicts([]); setBlockPanelOpen(true); }} className="shrink-0 rounded-lg bg-[#121212] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-white">Block Dates</button>}
    </div>
    <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className={panelClass}>
        <div className="mb-5 flex items-center justify-between border-b border-[#121212]/10 pb-4"><h3 className="text-xl font-medium">{month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</h3><div className="flex gap-2"><button aria-label="Previous month" onClick={() => change(-1)} className="h-9 w-9 rounded-lg border">&lt;</button><button onClick={() => { setMonth(new Date(now.getFullYear(), now.getMonth(), 1)); setSelected(today); }} className="rounded-lg border px-3 text-xs font-semibold">Today</button><button aria-label="Next month" onClick={() => change(1)} className="h-9 w-9 rounded-lg border">&gt;</button></div></div>
        <div className="overflow-x-auto"><div className="min-w-[44rem]"><div className="grid grid-cols-7">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => <div key={day} className="border p-2 text-center text-[10px] font-bold uppercase">{day}</div>)}</div><div className="grid grid-cols-7">{days.map((day) => { const dayKey = fromDate(day); const items = grouped.get(dayKey) || []; const blocked = isDateBlocked(dayKey, blockedDates); return <button key={dayKey} onClick={() => setSelected(dayKey)} style={blocked ? { backgroundImage: "repeating-linear-gradient(135deg, rgba(18,18,18,0.08) 0, rgba(18,18,18,0.08) 5px, transparent 5px, transparent 10px)" } : undefined} className={`min-h-28 border p-2 text-left ${selected === dayKey ? "ring-2 ring-inset ring-[#8BA888]" : ""} ${blocked ? "bg-[#121212]/5" : "bg-white"} ${day.getMonth() === monthIndex ? "" : "opacity-40"}`}><span className={`mb-2 grid h-6 w-6 place-items-center rounded-full text-xs ${dayKey === today ? "bg-black text-white" : ""}`}>{day.getDate()}</span>{blocked && <span className="mb-1 block truncate rounded border border-[#121212]/20 bg-white/80 px-1.5 py-1 text-[10px] font-semibold">Blocked</span>}{items.slice(0,3).map((item) => <span key={item.id} className={`mb-1 block truncate rounded px-1.5 py-1 text-[10px] ${colors[item.source]}`}>{item.title}</span>)}</button>; })}</div></div></div>
      </div>
      <aside className={panelClass}><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#121212]/45">Selected Day</p><h3 className="mt-1 border-b pb-4 text-lg font-medium">{localDate(selected).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</h3>{selectedBlock && <div className="mt-4 rounded-lg border border-[#121212]/20 bg-[#121212]/5 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.18em]">Blocked Period</p><p className="mt-2 text-sm font-semibold">{selectedBlock.reason}</p><p className="mt-1 text-xs text-[#121212]/55">Blocked by {selectedBlock.createdBy}</p>{selectedEvents.length > 0 && <p className="mt-2 text-xs font-semibold">{selectedEvents.length} existing {selectedEvents.length === 1 ? "item falls" : "items fall"} on this date.</p>}</div>}<div className="mt-4 grid gap-3">{selectedEvents.length ? selectedEvents.map((event) => <div key={event.id} className="rounded-lg border bg-[#F7F7F5] p-3"><span className={`rounded px-2 py-1 text-[10px] font-semibold ${colors[event.source]}`}>{event.source}</span><p className="mt-2 text-sm font-semibold">{event.title}</p><p className="mt-1 text-xs text-[#121212]/55">{event.detail}</p>{event.link && <a href={event.link} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-[#3973A8] underline">Open meeting</a>}</div>) : <p className="text-sm text-[#121212]/50">No scheduled items.</p>}</div></aside>
    </section>
    {leadership && <section className={`${panelClass} mt-7`}><h3 className="mb-4 text-lg font-medium">Blocked Date Ranges</h3><div className="grid gap-3">{blockedDates.length ? blockedDates.map((range) => <div key={range.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#121212]/10 bg-[#F7F7F5] p-4"><div><p className="text-sm font-semibold">{range.reason}</p><p className="text-xs text-[#121212]/55">{range.startDate} to {range.endDate} . {range.createdBy}</p></div><button type="button" onClick={() => removeBlockedDate(range.id)} className="rounded-lg border border-[#121212]/10 px-3 py-2 text-xs font-semibold hover:bg-[#121212]/5">Remove</button></div>) : <p className="text-sm text-[#121212]/50">No blocked date ranges.</p>}</div></section>}
    <SlideOver open={blockPanelOpen} onClose={() => { setTaskConflicts([]); setLeadConflicts([]); setMeetingConflicts([]); setBlockPanelOpen(false); }} title="Block Dates"><SimpleForm onSubmit={addBlockedDates} submitLabel={(taskConflicts.length + leadConflicts.length + meetingConflicts.length) ? "Reschedule & Block Dates" : "Block Dates"}><TextField name="startDate" label="Start Date" type="date" required /><TextField name="endDate" label="End Date" type="date" required /><TextField name="reason" label="Reason" required />{(taskConflicts.length + leadConflicts.length + meetingConflicts.length > 0) && <div className="grid gap-4 border-t border-[#121212]/10 pt-5"><div><p className="text-sm font-semibold">Reschedule conflicting records</p><p className="mt-1 text-xs text-[#121212]/55">Choose dates after the blocked period.</p></div>{taskConflicts.map((item) => <TextField key={`task-${item.id}`} name={`task:${item.id}`} label={`Task: ${item.title} (currently ${item.dueDate})`} type="date" required />)}{leadConflicts.map((item) => <TextField key={`lead-${item.id}`} name={`lead:${item.id}`} label={`CRM: ${item.company} (currently ${item.nextFollowUp})`} type="date" required />)}{meetingConflicts.map((item) => <TextField key={`meeting-${item.id}`} name={`meeting:${item.id}`} label={`Meeting: ${item.title} (currently ${item.when.slice(0, 10)})`} type="date" required />)}</div>}</SimpleForm></SlideOver>
  </>;
}
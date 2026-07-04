export type ForgeRole = "CEO" | "CTO" | "COO" | "Employee";

export type ForgeModule =
  | "dashboard"
  | "projects"
  | "tasks"
  | "crm"
  | "finance"
  | "documents"
  | "calendar"
  | "meetings"
  | "notifications";

export type ProjectStatus = "Planning" | "Active" | "Blocked" | "Completed";
export type ProjectType = "Client Project" | "Company Project";
export type TaskStatus = "Todo" | "In Progress" | "Blocked" | "Done";
export type Priority = "Low" | "Medium" | "High";
export type LeadStage = "New" | "Contacted" | "Qualified" | "Proposal" | "Won" | "Lost";
export type ExpenseStatus = "Draft" | "Submitted" | "In review" | "Approved" | "Rejected" | "Reimbursed";
export type BlockedDateRange = {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  createdBy: string;
  createdAt: string;
};

export type Project = {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  priority: Priority;
  dueDate: string;
  progress: number;
  projectType: ProjectType;
  totalAmount: number;
  amountReceived: number;
};

export type Task = {
  id: string;
  title: string;
  project: string;
  assignee: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
};

export type Lead = {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  source: string;
  stage: LeadStage;
  owner: string;
  value: number;
  nextFollowUp: string;
  notes: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  submittedRole: string;
  status: ExpenseStatus;
  expenseDate: string;
  notes: string;
};

export interface RevenueEntry {
  id: string;
  title: string;
  amount: number;
  client: string;
  source: "Client Payment" | "Retainer" | "One-time Project" | "Other";
  status: "Pending" | "Received" | "Overdue";
  revenueDate: string;
  notes: string;
}

export interface CashSnapshot {
  id: string;
  title: string;
  balance: number;
  account: "Current Account" | "Savings" | "Cash in Hand" | "Other";
  snapshotDate: string;
  notes: string;
}

export type DocumentRecord = {
  id: string;
  title: string;
  category: string;
  visibility: "Leadership" | "Engineering" | "Operations" | "Company";
  owner: string;
  fileUrl: string;
};

export type Meeting = {
  id: string;
  title: string;
  when: string;
  attendees: string;
  type: "Client" | "Internal" | "Review";
  meetingLink: string;
};

export type NotificationRecord = {
  id: string;
  title: string;
  body: string;
  type: "Task" | "Project" | "Finance" | "Meeting" | "CRM" | "Document";
  recipientRole: ForgeRole | "";
  recipientEmail: string;
  read: boolean;
  linkedModule: string;
  linkedRecordId: string;
  createdAt: string;
};

export const roleProfiles: Record<ForgeRole, { title: string; purpose: string; accent: string }> = {
  CEO: {
    title: "Executive Command Center",
    purpose: "Company health, finance, sales pipeline, approvals, and delivery visibility.",
    accent: "#8BA888",
  },
  CTO: {
    title: "Engineering Delivery",
    purpose: "Projects, sprint progress, build health, bugs, technical documents, and team velocity.",
    accent: "#4E7DA7",
  },
  COO: {
    title: "Operations Control",
    purpose: "Delivery timeline, team coordination, documentation, meetings, and operating rhythm.",
    accent: "#A77952",
  },
  Employee: {
    title: "Focused Workspace",
    purpose: "Assigned tasks, documents, deadlines, meetings, and personal notifications.",
    accent: "#7A6AA8",
  },
};

export const moduleLabels: Record<ForgeModule, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  tasks: "Tasks",
  crm: "CRM",
  finance: "Finance",
  documents: "Documents",
  calendar: "Calendar",
  meetings: "Meetings",
  notifications: "Notifications",
};

export const roleAccess: Record<ForgeRole, ForgeModule[]> = {
  CEO: ["dashboard", "projects", "tasks", "crm", "finance", "documents", "calendar", "meetings", "notifications"],
  CTO: ["dashboard", "projects", "tasks", "finance", "documents", "calendar", "meetings", "notifications"],
  COO: ["dashboard", "projects", "tasks", "crm", "documents", "calendar", "meetings", "notifications"],
  Employee: ["dashboard", "projects", "tasks", "documents", "calendar", "meetings", "notifications"],
};

export const dashboardWidgets: Record<ForgeRole, string[]> = {
  CEO: [
    "Company health score",
    "Revenue overview",
    "Monthly expenses",
    "Cash position",
    "Sales pipeline",
    "Lead funnel",
    "Active projects",
    "Pending payments",
    "Upcoming meetings",
    "AI daily brief",
  ],
  CTO: [
    "Sprint progress",
    "Assigned engineering tasks",
    "Pull requests",
    "Build status",
    "Deployment status",
    "Active bugs",
    "Feature progress",
    "Server health",
    "Engineering velocity",
    "Team availability",
  ],
  COO: [
    "Project status",
    "Team availability",
    "Pending approvals",
    "Delivery timeline",
    "Meeting schedule",
    "Documentation progress",
    "Task completion",
    "Operations checklist",
    "Announcements",
    "Team activity",
  ],
  Employee: [
    "Assigned tasks",
    "Sprint board",
    "Bugs assigned",
    "Feature requests",
    "Upcoming deadlines",
    "Calendar",
    "Notifications",
    "Documents shared",
  ],
};

export const starterProjects: Project[] = [
  { id: "PRJ-001", name: "ForgeOS v1", owner: "COO", status: "Active", priority: "High", dueDate: "2026-07-30", progress: 42, projectType: "Company Project", totalAmount: 0, amountReceived: 0 },
  { id: "PRJ-002", name: "Fuel OS Partner Demo", owner: "CEO", status: "Planning", priority: "High", dueDate: "2026-08-10", progress: 18, projectType: "Client Project", totalAmount: 850000, amountReceived: 300000 },
  { id: "PRJ-003", name: "Certificate Verification", owner: "CTO", status: "Active", priority: "Medium", dueDate: "2026-07-12", progress: 75, projectType: "Company Project", totalAmount: 0, amountReceived: 0 },
];

export const starterTasks: Task[] = [
  { id: "TSK-001", title: "Finalize RBAC session checks", project: "ForgeOS v1", assignee: "CTO", status: "In Progress", priority: "High", dueDate: "2026-07-05" },
  { id: "TSK-002", title: "Prepare CRM lead import fields", project: "ForgeOS v1", assignee: "COO", status: "Todo", priority: "Medium", dueDate: "2026-07-08" },
  { id: "TSK-003", title: "Write employee onboarding docs", project: "ForgeOS v1", assignee: "Employee", status: "Todo", priority: "Low", dueDate: "2026-07-15" },
];

export const starterLeads: Lead[] = [];

export const starterExpenses: Expense[] = [
  { id: "EXP-001", title: "Cloud infrastructure", amount: 9200, submittedRole: "CTO", status: "Approved", expenseDate: "2026-06-15", notes: "" },
  { id: "EXP-002", title: "Domain and email renewals", amount: 3100, submittedRole: "COO", status: "Submitted", expenseDate: "2026-06-20", notes: "" },
  { id: "EXP-003", title: "Client visit travel", amount: 4500, submittedRole: "CEO", status: "Submitted", expenseDate: "2026-06-24", notes: "" },
];

export const starterDocuments: DocumentRecord[] = [
  { id: "DOC-001", title: "ForgeOS v1 Product Scope", category: "Product", visibility: "Company", owner: "COO", fileUrl: "" },
  { id: "DOC-002", title: "RBAC Access Matrix", category: "Security", visibility: "Leadership", owner: "CTO", fileUrl: "" },
  { id: "DOC-003", title: "Fuel OS Sales Deck", category: "Sales", visibility: "Leadership", owner: "CEO", fileUrl: "" },
];

export const starterMeetings: Meeting[] = [
  { id: "MTG-001", title: "Weekly leadership sync", when: "2026-07-02 10:00", attendees: "CEO, CTO, COO", type: "Internal", meetingLink: "" },
  { id: "MTG-002", title: "Fuel OS partner demo", when: "2026-07-04 15:30", attendees: "CEO, COO", type: "Client", meetingLink: "" },
  { id: "MTG-003", title: "Sprint review", when: "2026-07-05 17:00", attendees: "CTO, COO, Employee", type: "Review", meetingLink: "" },
];

export const starterNotifications: NotificationRecord[] = [];

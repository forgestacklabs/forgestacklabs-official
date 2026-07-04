"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

type EmployeeRecord = {
  id: string;
  name: string;
  email?: string;
  designation: string;
  department?: string;
  status: "Active" | "Inactive";
  joinedOn?: string;
  createdAt: string;
};

type EmployeeFormState = {
  id: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  status: "Active" | "Inactive";
  joinedOn: string;
};

const initialEmployeeForm: EmployeeFormState = {
  id: "",
  name: "",
  email: "",
  designation: "",
  department: "Engineering",
  status: "Active",
  joinedOn: "",
};

const inputClass =
  "w-full rounded-2xl border border-[#121212]/10 bg-white/65 px-5 py-4 text-sm text-[#121212] outline-none transition focus:border-[#8BA888]/70 focus:bg-white";
const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[0.32em] text-[#121212]/45";
const departments = ["Engineering", "Product", "Design", "Sales", "HR", "Finance", "Operations"] as const;

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormState>(initialEmployeeForm);
  const [status, setStatus] = useState("Loading employees...");

  const loadEmployees = useCallback(async () => {
    const response = await fetch("/api/employees");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to load employees.");
    setEmployees(data.employees || []);
    setStatus("");
  }, []);

  useEffect(() => {
    loadEmployees().catch((error) => setStatus(error instanceof Error ? error.message : "Unable to load employees."));
  }, [loadEmployees]);

  async function handleCreateEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving employee...");

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save employee.");
      setEmployeeForm(initialEmployeeForm);
      setStatus("Employee saved.");
      await loadEmployees();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save employee.");
    }
  }

  return (
    <main className="relative min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-28 text-[#121212]">
      <section className="mx-auto max-w-7xl">
        <Link href="/admin" className="mb-8 inline-flex text-xs font-bold uppercase tracking-[0.28em] text-[#8BA888]">Back to Admin</Link>
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">Employees</p>
        <h1 className="mb-5 text-5xl font-medium tracking-tight md:text-7xl">Employees & Designations</h1>
        <p className="max-w-3xl text-base leading-relaxed text-[#121212]/60">View employees and add employee designation records.</p>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2.5rem] border border-white/70 bg-white/55 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-12">
          <h2 className="mb-8 text-3xl font-medium tracking-tight">Add Employee</h2>
          <form onSubmit={handleCreateEmployee} className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="employee-id" className={labelClass}>Employee ID</label>
                <input id="employee-id" required value={employeeForm.id} onChange={(e) => setEmployeeForm({ ...employeeForm, id: e.target.value })} className={inputClass} placeholder="FSL-EMP-001" />
              </div>
              <div>
                <label htmlFor="employee-name" className={labelClass}>Employee Name</label>
                <input id="employee-name" required value={employeeForm.name} onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })} className={inputClass} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="employee-email" className={labelClass}>Email</label>
                <input id="employee-email" type="email" value={employeeForm.email} onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="employee-designation" className={labelClass}>Designation</label>
                <input id="employee-designation" required value={employeeForm.designation} onChange={(e) => setEmployeeForm({ ...employeeForm, designation: e.target.value })} className={inputClass} placeholder="Software Engineer" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="employee-department" className={labelClass}>Department</label>
                <select id="employee-department" value={employeeForm.department} onChange={(e) => setEmployeeForm({ ...employeeForm, department: e.target.value })} className={inputClass}>
                  {departments.map((department) => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="employee-joined" className={labelClass}>Joined On</label>
                <input id="employee-joined" type="date" value={employeeForm.joinedOn} onChange={(e) => setEmployeeForm({ ...employeeForm, joinedOn: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="employee-status" className={labelClass}>Status</label>
                <select id="employee-status" value={employeeForm.status} onChange={(e) => setEmployeeForm({ ...employeeForm, status: e.target.value as EmployeeFormState["status"] })} className={inputClass}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <button className="rounded-full bg-[#121212] px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#121212]/85">Save Employee</button>
            {status && <p className="text-sm text-[#121212]/60">{status}</p>}
          </form>
        </div>

        <div className="rounded-[2.5rem] border border-white/70 bg-white/55 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-10">
          <h2 className="mb-6 text-2xl font-medium tracking-tight">Employee List</h2>
          <div className="grid max-h-[36rem] gap-3 overflow-auto pr-2">
            {employees.length === 0 ? (
              <p className="text-sm text-[#121212]/55">No employees yet.</p>
            ) : (
              employees.map((employee) => (
                <div key={employee.id} className="rounded-2xl border border-[#121212]/10 bg-white/50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#121212]">{employee.name}</p>
                      <p className="text-xs text-[#121212]/55">{employee.designation}</p>
                      {(employee.department || employee.email) && (
                        <p className="mt-1 text-xs text-[#121212]/45">{[employee.department, employee.email].filter(Boolean).join(" . ")}</p>
                      )}
                    </div>
                    <span className="w-fit rounded-full bg-[#8BA888]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8BA888]">{employee.status}</span>
                  </div>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8BA888]">{employee.id}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
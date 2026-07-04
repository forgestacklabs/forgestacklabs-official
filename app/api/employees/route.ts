import { NextResponse } from "next/server";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createEmployee, readEmployees, type EmployeeInput } from "@/lib/employees";

type RequestBody = Partial<EmployeeInput>;

function missingAdminAuthResponse() {
  return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "Please login from the admin page first." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!hasAdminAuthConfig()) return missingAdminAuthResponse();
  if (!getAdminSession(request)) return unauthorizedResponse();

  const employees = await readEmployees();
  return NextResponse.json({ employees });
}

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return missingAdminAuthResponse();
  if (!getAdminSession(request)) return unauthorizedResponse();

  const body = (await request.json()) as RequestBody;

  if (!body.id || !body.name || !body.designation || !body.status) {
    return NextResponse.json({ error: "Missing required employee details." }, { status: 400 });
  }

  try {
    const employee = await createEmployee({
      id: body.id,
      name: body.name,
      email: body.email || "",
      designation: body.designation,
      department: body.department,
      status: body.status,
      joinedOn: body.joinedOn || "",
    });

    return NextResponse.json({ employee });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create employee." },
      { status: 400 },
    );
  }
}

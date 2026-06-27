import { NextResponse } from "next/server";
import {
  createCertificate,
  hasAdminUsers,
  isAdminCredential,
  readCertificates,
  type CertificateInput,
} from "@/lib/certificates";

type RequestBody = Partial<CertificateInput> & {
  adminEmail?: string;
  password?: string;
  intent?: "login" | "create";
};

function missingAdminUsersResponse() {
  return NextResponse.json({ error: "ADMIN_CERT_USERS is not configured." }, { status: 500 });
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "Invalid admin email or password." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!hasAdminUsers()) return missingAdminUsersResponse();

  const adminEmail = request.headers.get("x-admin-email");
  const password = request.headers.get("x-admin-password");
  if (!isAdminCredential(adminEmail, password)) return unauthorizedResponse();

  const records = await readCertificates();
  return NextResponse.json({ records });
}

export async function POST(request: Request) {
  if (!hasAdminUsers()) return missingAdminUsersResponse();

  const body = (await request.json()) as RequestBody;
  if (!isAdminCredential(body.adminEmail, body.password)) return unauthorizedResponse();

  if (body.intent === "login") {
    return NextResponse.json({ ok: true });
  }

  if (!body.name || !body.email || !body.certificateType || !body.role || !body.issuedOn) {
    return NextResponse.json({ error: "Missing required certificate details." }, { status: 400 });
  }

  const record = await createCertificate({
    name: body.name,
    email: body.email,
    certificateType: body.certificateType,
    role: body.role,
    issuedOn: body.issuedOn,
    startDate: body.startDate || "",
    endDate: body.endDate || "",
    notes: body.notes || "",
  });

  return NextResponse.json({ record });
}

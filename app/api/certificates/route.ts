import { NextResponse } from "next/server";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createCertificate, readCertificates, type CertificateInput } from "@/lib/certificates";

type RequestBody = Partial<CertificateInput> & {
  intent?: "create";
};

function missingAdminAuthResponse() {
  return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "Please login from the admin page first." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!hasAdminAuthConfig()) return missingAdminAuthResponse();
  if (!getAdminSession(request)) return unauthorizedResponse();

  const records = await readCertificates();
  return NextResponse.json({ records });
}

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return missingAdminAuthResponse();
  if (!getAdminSession(request)) return unauthorizedResponse();

  const body = (await request.json()) as RequestBody;

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

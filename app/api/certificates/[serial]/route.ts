import { NextResponse } from "next/server";
import { findCertificate } from "@/lib/certificates";

export async function GET(_request: Request, { params }: { params: { serial: string } }) {
  const record = await findCertificate(params.serial);
  if (!record) {
    return NextResponse.json({ verified: false }, { status: 404 });
  }

  return NextResponse.json({ verified: true, record });
}

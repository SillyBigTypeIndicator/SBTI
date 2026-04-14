import { NextResponse } from "next/server";
import { sharePayloadFromTypeCode } from "@/lib/share";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type")?.toUpperCase();
  if (!type || !/^[EI][OL][VM][AP]$/.test(type)) {
    return NextResponse.json({ error: "Query ?type=EOVA required" }, { status: 400 });
  }
  return NextResponse.json(sharePayloadFromTypeCode(type));
}

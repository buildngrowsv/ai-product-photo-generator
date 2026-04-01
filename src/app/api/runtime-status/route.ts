import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    falConfigured: Boolean(process.env.FAL_KEY),
  });
}

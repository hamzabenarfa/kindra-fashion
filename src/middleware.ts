import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/account/(.*)", "/admin/(.*)"] };

export async function middleware(request: NextRequest) {

  return NextResponse.next();
}

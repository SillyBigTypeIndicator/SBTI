import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
import { prisma } from "@/lib/db";
import { ANON_COOKIE } from "@/lib/session";

export async function GET(request: Request) {
  const has = request.headers.get("cookie")?.includes(`${ANON_COOKIE}=`);
  let key = has
    ? request.headers
        .get("cookie")
        ?.split(";")
        .find((c) => c.trim().startsWith(`${ANON_COOKIE}=`))
        ?.split("=")[1]
    : undefined;

  if (!key) {
    key = createId();
  }

  let user = await prisma.user.findFirst({ where: { anonymousKey: key } });
  if (!user) {
    user = await prisma.user.create({
      data: { anonymousKey: key, name: "Silly Explorer" },
    });
  }

  const res = NextResponse.json({ userId: user.id });
  if (!has) {
    res.cookies.set(ANON_COOKIE, key!, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
    });
  }
  return res;
}

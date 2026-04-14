import { cookies } from "next/headers";
import { createId } from "@paralleldrive/cuid2";
import { prisma } from "./db";

export const ANON_COOKIE = "sbti_anon";

/** Use from Server Actions / Route Handlers where `cookies().set` is allowed */
export async function getOrCreateAnonUserId(): Promise<string> {
  const jar = await cookies();
  let key = jar.get(ANON_COOKIE)?.value;
  if (!key) {
    key = createId();
    jar.set(ANON_COOKIE, key, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
    });
  }

  let user = await prisma.user.findFirst({ where: { anonymousKey: key } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        anonymousKey: key,
        name: "Silly Explorer",
      },
    });
  }
  return user.id;
}

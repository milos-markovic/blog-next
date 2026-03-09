import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { User } from "@/models/User";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getAuthUser = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session) return null;

  try {
    const userDoc = await User.findOne({ _id: session.userId }).lean();
    const user = { ...userDoc, _id: userDoc._id.toString() };

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});

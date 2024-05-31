"use server";

import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { COOKIES_USER_TOKENS } from "../helpers";

export async function logoutUser() {
  const cookiesStore = cookies();

  cookiesStore.delete(COOKIES_USER_TOKENS);

  redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}/`, RedirectType.push);
}

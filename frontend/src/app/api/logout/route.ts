export const dynamic = "force-dynamic"; // defaults to auto

import { COOKIES_USER_TOKENS } from "@/integrations/user/helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookiesStore = cookies();

  cookiesStore.delete(COOKIES_USER_TOKENS);

  revalidatePath("/");

  return redirect("/");
}

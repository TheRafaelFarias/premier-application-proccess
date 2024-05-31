"use server";

import { api } from "@/integrations/api";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { COOKIES_USER_TOKENS } from "../helpers";

export async function loginUser(data: FormData) {
  const email = data.get("email");
  const password = data.get("password");

  try {
    const response = await api.post<{ token: string }>("/login", {
      email,
      password,
    });

    cookies().set(
      COOKIES_USER_TOKENS,
      JSON.stringify({
        accessToken: response.data.token,
      }),
      { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 * 7 }
    );

    revalidatePath("/");

    return {
      type: "success",
    } as const;
  } catch (error) {
    console.log(error);

    const axiosError = error as AxiosError<{
      errors: [{ message: string }];
    }>;

    return {
      type: "error",
      error: axiosError?.response?.data?.errors,
    } as const;
  }
}

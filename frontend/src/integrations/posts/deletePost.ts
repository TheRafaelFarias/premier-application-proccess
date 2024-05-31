"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { api } from "../api";
import { getUserTokens } from "../user/getUserTokens";

export async function deletePost(postId: string | number) {
  const tokens = getUserTokens();

  try {
    const response = await api.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${tokens?.accessToken}`,
      },
    });

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);

    return {
      type: "success",
    } as const;
  } catch (error) {
    console.log(error);

    const axiosError = error as AxiosError<{
      errors: [{ message: string }];
      message: string;
    }>;

    return {
      type: "error",
      error: axiosError?.response?.data?.errors ?? [
        {
          message: axiosError?.response?.data?.message,
        },
      ],
    } as const;
  }
}

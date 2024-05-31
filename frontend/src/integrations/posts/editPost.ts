"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { api } from "../api";
import { getUserTokens } from "../user/getUserTokens";
import { Post } from "./types";

export async function editPost(postId: string | number, data: FormData) {
  const tokens = getUserTokens();

  const title = data.get("title");
  const content = data.get("content");

  try {
    const response = await api.patch<Post>(
      `/posts/${postId}`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      }
    );

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);

    return {
      type: "success",
      data: {
        postId: response.data.id,
      },
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

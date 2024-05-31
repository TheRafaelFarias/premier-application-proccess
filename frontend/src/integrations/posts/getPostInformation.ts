import { api } from "../api";
import { getUserTokens } from "../user/getUserTokens";
import { Post } from "./types";

export const getPostInformation = async (postId: string) => {
  const tokens = getUserTokens();

  const response = await api.get<Post>(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${tokens?.accessToken}`,
    },
  });

  return response.data;
};

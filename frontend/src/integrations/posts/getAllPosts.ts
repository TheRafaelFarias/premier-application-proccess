import { api } from "../api";
import { getUserTokens } from "../user/getUserTokens";
import { Post } from "./types";

export const getAllPosts = async (
  order: "asc" | "desc" | any = "asc",
  onlyMe?: boolean
) => {
  const tokens = getUserTokens();

  const response = await api.get<Post[]>("/posts/", {
    headers: {
      Authorization: `Bearer ${tokens?.accessToken}`,
    },
    params: {
      mode: order === "asc" ? "recent-first" : "oldest-first",
      onlyMe: onlyMe ? "true" : "false",
    },
  });

  return response.data;
};

import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "../api";
import { COOKIES_USER_TOKENS } from "./helpers";
import { User } from "./types";

const getUserInfoFromServer = async (accessToken: string) => {
  const response = await api.get<User>("/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const getUserInfo = async () => {
  const cookiesStore = cookies();

  const cookieValueRaw = cookiesStore.get(COOKIES_USER_TOKENS)?.value;

  if (cookieValueRaw) {
    const tokens = JSON.parse(cookieValueRaw) as {
      accessToken: string;
    };

    try {
      const user = await getUserInfoFromServer(tokens.accessToken);

      return user;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.status === 401) {
        redirect("/");
      }

      return null;
    }
  }

  return null;
};

import { cookies } from "next/headers";
import { COOKIES_USER_TOKENS } from "./helpers";
import { UserTokens } from "./types";

export const getUserTokens = () => {
  const cookiesStore = cookies();

  const nullableCookiesValue = cookiesStore.get(COOKIES_USER_TOKENS);

  if (!nullableCookiesValue) return null;

  const cookieValueRaw = nullableCookiesValue.value;

  const tokens = JSON.parse(cookieValueRaw) as UserTokens;

  return tokens;
};

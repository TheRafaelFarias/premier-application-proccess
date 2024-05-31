export type UserTokens = {
  accessToken: string;
};

export type FullUser = {
  email: string;
  password: string;
  fullName: string;
  id: number;
};

export type User = Pick<FullUser, "id" | "fullName">;

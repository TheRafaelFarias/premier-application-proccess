import HomePage from "@/components/home";
import { getUserTokens } from "@/integrations/user/getUserTokens";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const userInfo = getUserTokens();

  if (userInfo === null) {
    return (
      <div className="w-full min-h-screen h-full flex flex-col justify-center items-center">
        <h1>You need to login or create an account</h1>
        <div className="mt-4 flex flex-col items-center gap-y-2">
          <Link
            href="/auth/register"
            className="underline text-blue-400 py-2 px-4 min-w-[200px] text-center cursor-pointer hover:opacity-70 bg-slate-300 rounded-md transition"
          >
            Register
          </Link>
          <Link
            href="/auth/login"
            className="underline text-blue-400 py-2 px-4 min-w-[200px] text-center cursor-pointer hover:opacity-70 bg-slate-300 rounded-md transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return <HomePage searchParams={searchParams} />;
}

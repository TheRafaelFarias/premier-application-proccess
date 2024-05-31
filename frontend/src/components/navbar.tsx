import { getUserInfo } from "@/integrations/user/getUserInfo";
import Link from "next/link";
import { redirect } from "next/navigation";

const Navbar: React.FC = async () => {
  const userInfo = await getUserInfo();

  if (userInfo === null) {
    redirect("/");
  }

  return (
    <nav className="flex py-8 items-center justify-between text-center w-3/4 mx-auto">
      <div className="flex items-center gap-x-4">
        <p className="font-bold">{userInfo!.fullName}</p>
        <Link
          href="/"
          className="text-blue-500 underline hover:opacity-70 transition-all"
        >
          Home
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <a href="/post/me" className="underline">
          See my posts
        </a>
        <Link
          href="/post/new"
          className="bg-blue-500 rounded-md px-4 py-2 text-white hover:opacity-70 transition-all"
        >
          New post
        </Link>
        <a href="/api/logout" className="text-red-500">
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

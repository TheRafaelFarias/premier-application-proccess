"use client";

import { loginUser } from "@/integrations/user/actions/login";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthLoginClientImplementationForm: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (data: FormData) => {
    const response = await loginUser(data);

    if (response.type === "error") {
      const reasons = response.error?.map((value) => value.message);

      toast(
        <>
          <p>Unable to login on your account.</p>
          <br />
          <p>Reasons:</p>
          <span className="whitespace-pre-line">{reasons?.join("\n")}</span>
        </>,
        {
          type: "error",
        }
      );

      return;
    }

    router.replace("/");
  };

  return (
    <form action={handleFormSubmit} className="mt-4 flex flex-col gap-y-2">
      <div>
        <p>Email</p>
        <input
          name="email"
          type="email"
          className="bg-slate-300 p-2 rounded-md min-w-[300px]"
          placeholder="Type here"
          required
        />
      </div>

      <div>
        <p>Password</p>
        <input
          name="password"
          type="password"
          className="bg-slate-300 p-2 rounded-md min-w-[300px]"
          placeholder="Type here"
          required
        />
      </div>

      <button className="mt-4 bg-blue-500 p-4 rounded-md text-white hover:opacity-70 transition">
        Login
      </button>
    </form>
  );
};

export default AuthLoginClientImplementationForm;

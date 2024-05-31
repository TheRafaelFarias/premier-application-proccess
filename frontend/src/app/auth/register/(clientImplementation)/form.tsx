"use client";

import { registerNewUser } from "@/integrations/user/actions/register";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthRegisterClientImplementationForm: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (data: FormData) => {
    const response = await registerNewUser(data);

    if (response.type === "error") {
      const reasons = response.error?.map((value) => value.message);

      toast(
        <>
          <p>Unable to create your account.</p>
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
        <p>Full Name</p>
        <input
          name="fullName"
          type="text"
          className="bg-slate-300 p-2 rounded-md min-w-[300px]"
          placeholder="Type here"
          required
        />
      </div>

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
        Submit
      </button>
    </form>
  );
};

export default AuthRegisterClientImplementationForm;

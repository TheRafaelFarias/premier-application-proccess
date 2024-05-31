"use client";

import { createNewPost } from "@/integrations/posts/createNewPost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NewPostClientImplementationForm: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (data: FormData) => {
    const response = await createNewPost(data);

    if (response.type === "error") {
      const reasons = response.error?.map((value) => value.message);

      toast(
        <>
          <p>Unable to create a new post.</p>
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

    router.replace(`/post/${response.data.postId}`);
  };

  return (
    <form
      action={handleFormSubmit}
      className="mt-4 flex flex-col gap-y-2 text-start mx-auto w-fit"
    >
      <div>
        <p>Title</p>
        <input
          name="title"
          type="text"
          className="bg-slate-300 p-2 rounded-md min-w-[600px]"
          placeholder="Type here"
          required
        />
      </div>

      <div>
        <p>Content</p>
        <textarea
          name="content"
          className="bg-slate-300 p-2 rounded-md min-w-[600px] min-h-96"
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

export default NewPostClientImplementationForm;

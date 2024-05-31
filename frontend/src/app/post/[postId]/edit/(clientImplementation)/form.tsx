"use client";

import { deletePost } from "@/integrations/posts/deletePost";
import { editPost } from "@/integrations/posts/editPost";
import { Post } from "@/integrations/posts/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditPostClientImplementationForm: React.FC<{ post: Post }> = ({
  post,
}) => {
  const router = useRouter();

  const handleDeletePost = async () => {
    const response = await deletePost(post.id);

    if (response.type === "error") {
      const reasons = response.error?.map((value) => value.message);

      toast(
        <>
          <p>Unable to delete your post</p>
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

    toast("Post deleted with success", {
      type: "success",
    });
    router.replace("/");
  };

  const handleFormSubmit = async (data: FormData) => {
    const editPostId = editPost.bind(null, post.id);
    const response = await editPostId(data);

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

    toast("Post updated with sucess", {
      type: "success",
    });
  };

  return (
    <>
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
            defaultValue={post.title}
          />
        </div>

        <div>
          <p>Content</p>
          <textarea
            name="content"
            className="bg-slate-300 p-2 rounded-md min-w-[600px] min-h-96"
            placeholder="Type here"
            required
            defaultValue={post.content}
          />
        </div>

        <button className="mt-4 bg-blue-500 p-4 rounded-md text-white hover:opacity-70 transition">
          Submit
        </button>
      </form>

      <button
        onClick={handleDeletePost}
        className="w-full max-w-[600px] mt-4 bg-red-500 p-4 rounded-md text-white hover:opacity-70 transition"
      >
        Delete post
      </button>
    </>
  );
};

export default EditPostClientImplementationForm;

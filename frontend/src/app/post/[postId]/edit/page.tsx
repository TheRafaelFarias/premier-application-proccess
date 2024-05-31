import Navbar from "@/components/navbar";
import { getPostInformation } from "@/integrations/posts/getPostInformation";
import { getUserInfo } from "@/integrations/user/getUserInfo";
import { redirect } from "next/navigation";
import EditPostClientImplementationForm from "./(clientImplementation)/form";

const EditPostPage: React.FC<{
  params: { postId: string };
}> = async ({ params }) => {
  const loggedUser = await getUserInfo();
  const postInfo = await getPostInformation(params.postId);

  if (loggedUser?.id !== postInfo.authorId) {
    redirect("/");
  }

  return (
    <>
      <Navbar />

      <main className="w-4/5 mx-auto justify-center items-center text-center mt-4">
        <h1 className="text-2xl">Edit your post</h1>

        <EditPostClientImplementationForm post={postInfo} />
      </main>
    </>
  );
};

export default EditPostPage;

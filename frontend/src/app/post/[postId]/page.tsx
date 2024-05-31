import Navbar from "@/components/navbar";
import { getPostInformation } from "@/integrations/posts/getPostInformation";
import { getUserInfo } from "@/integrations/user/getUserInfo";
import Link from "next/link";
import { redirect } from "next/navigation";

const SeePostPage: React.FC<{
  params: { postId: string };
}> = async ({ params }) => {
  const loggedUser = await getUserInfo();

  if (loggedUser == null) {
    redirect("/");
  }

  const post = await getPostInformation(params.postId);

  return (
    <>
      <Navbar />

      <main className="w-4/5 mx-auto justify-center items-center mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{post.title}</h1>
          {loggedUser?.id === post.id && (
            <Link
              className="text-red-500 underline"
              href={`/post/${post.id}/edit`}
            >
              Edit
            </Link>
          )}
        </div>

        <p className="whitespace-pre-line mt-4">{post.content}</p>
      </main>
    </>
  );
};

export default SeePostPage;

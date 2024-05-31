import { getAllPosts } from "@/integrations/posts/getAllPosts";
import { getUserInfo } from "@/integrations/user/getUserInfo";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "../navbar";
import PostsOrderSelector from "./orderSelector";

const HomePage: React.FC<{
  searchParams?: { [key: string]: string | string[] | undefined };
  onlyMe?: boolean;
}> = async ({ searchParams, onlyMe }) => {
  const loggedUser = await getUserInfo();

  if (loggedUser === null) {
    redirect("/");
  }

  const allPosts = await getAllPosts(searchParams?.order, onlyMe);

  return (
    <>
      <Navbar />

      <main className="w-4/5 mx-auto justify-center items-center text-center mt-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl">
            {onlyMe ? "All your posts" : "All posts"} - {allPosts.length}
          </h1>

          <PostsOrderSelector />
        </div>

        <ul className="mt-4 divide-y">
          {allPosts.map((post) => {
            const createdDate = new Date(post.createdAt);

            // PS: I know I could've use some library for date formatting like date-fns
            // But there's no need to add another dependency for something that can be done with native code

            const fill = (value: number) => value.toString().padStart(2, "0");

            const formattedDay = fill(createdDate.getDate());
            const formattedMonth = fill(createdDate.getMonth() + 1);

            const formattedDate = `${formattedDay}/${formattedMonth}/${createdDate.getFullYear()}`;

            const formattedHours = fill(createdDate.getHours());
            const formattedMinutes = fill(createdDate.getMinutes());

            return (
              <li key={post.id} className="flex w-full justify-between py-2">
                <p>
                  {post.title} - {formattedDate} - {formattedHours}:
                  {formattedMinutes}
                </p>
                <div className="flex items-center gap-x-3">
                  {post.authorId === loggedUser?.id && (
                    <Link
                      className="text-red-500 underline"
                      href={`/post/${post.id}/edit`}
                    >
                      Edit
                    </Link>
                  )}
                  <Link
                    className="text-blue-500 underline"
                    href={`/post/${post.id}`}
                  >
                    See more
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default HomePage;

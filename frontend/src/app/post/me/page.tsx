import HomePage from "@/components/home";

export default async function PageOnlyMePosts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <HomePage onlyMe searchParams={searchParams} />;
}

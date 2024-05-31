"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const PostsOrderSelector: React.FC = () => {
  const searchParams = useSearchParams();

  const handleSelectorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    const newUrl = new URL(window.location.href);

    newUrl.searchParams.set("order", newValue);

    window.location.href = newUrl.toString();
  };

  return (
    <select
      onChange={handleSelectorChange}
      className="bg-slate-200 px-4 py-2 rounded-md border-r-[16px] border-transparent"
      defaultValue={searchParams.get("order") ?? undefined}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  );
};

export default PostsOrderSelector;

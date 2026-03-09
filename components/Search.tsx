"use client";

import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { searchPosts } from "@/action/post";
import { postType } from "@/models/Post";
import SearchList from "./SearchList";

const Search = () => {
  const path = usePathname();

  const isHomePage = path === "/";

  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<postType[]>([]);

  const showSearchList = posts.length > 0 && searchTerm;

  useEffect(() => {
    if (searchTerm) {
      const findPosts = async () => {
        const res = await searchPosts(searchTerm);
        setPosts(res);
      };

      findPosts();
    }
  }, [searchTerm]);

  if (!isHomePage) {
    return null;
  }

  return (
    <div className="relative">
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        name="searchTerm"
        type="text"
        placeholder="Search by title"
        className="bg-input border rounded-md px-2 py-1 w-md"
      />

      {showSearchList && <SearchList setSearchTerm={setSearchTerm} posts={posts} />}
    </div>
  );
};

export default Search;

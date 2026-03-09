import { postType } from "@/models/Post";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type SearchListProps = {
  posts: postType[];
  setSearchTerm: (val: string) => void;
};

const SearchList = ({ posts, setSearchTerm }: SearchListProps) => {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRedirect = (e: any, link: string) => {
    e.preventDefault();

    router.push(link);
    setSearchTerm("");
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-lg divide-y absolute left-0 top-0 w-full mt-11 bg-card shadow-lg z-10 ${posts.length && "border"}`}
    >
      {posts.map((post, index) => (
        <li
          onClick={(e) => handleRedirect(e, `/fullPost/${post._id}`)}
          key={post.title}
          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-accent rounded-t-md ${index === 0 && "rounded-t-lg"} ${index === posts.length - 1 && "rounded-b-lg rounded-t-none"}`}
        >
          <h2>{post.title}</h2>
          <Image src={post.img} alt={post.title} width={50} height={50} />
        </li>
      ))}
    </div>
  );
};

export default SearchList;

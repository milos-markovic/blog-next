import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="text-2xl font-semibold dark:text-primary">Blog</h1>
    </Link>
  );
};

export default Logo;

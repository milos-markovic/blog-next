"use client";

import { ArrowBigLeft, ArrowBigRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export const Pagination = ({ pagination }: any) => {
  const { page, totalPages, hasNextPage, hasPrevPage } = pagination;

  return (
    <div className="flex justify-around gap-2 mt-6">
      {hasPrevPage && (
        <Link href={`?page=${page - 1}`} className="flex items-center gap-1 text-primary">
          <ArrowBigLeft size={20} /> Prev
        </Link>
      )}

      <span>
        Page {page} / {totalPages}
      </span>

      {hasNextPage && (
        <Link href={`?page=${page + 1}`} className="flex items-center gap-1 text-primary">
          Next <ArrowBigRight size={20} />
        </Link>
      )}
    </div>
  );
};

"use client";

import type { MouseEvent } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { maxMoviePages, getMoviePaginationItems } from "@/lib/movie-pagination";

type Props = {
  page: number;
  totalPages: number;
  disabled?: boolean;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};

export default function MoviePagination({ page, totalPages, disabled = false, isLoading = false, onPageChange }: Props) {
  const lastPage = Math.min(totalPages, maxMoviePages);
  if (lastPage <= 1) return null;

  function linkProps(target: number) {
    const unavailable = disabled || isLoading || target < 1 || target > lastPage;
    return {
      href: "#",
      "aria-disabled": unavailable,
      tabIndex: unavailable ? -1 : undefined,
      className: unavailable ? "pointer-events-none opacity-50" : undefined,
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (!unavailable && target !== page) onPageChange(target);
      },
    };
  }

  return (
    <div className="pt-4">
      <Pagination aria-label="Movie pages">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious {...linkProps(page - 1)} />
          </PaginationItem>
          {getMoviePaginationItems(page, lastPage).map((item, index) => (
            <PaginationItem
              key={item === "ellipsis" ? `ellipsis-${index}` : item}
              className={item === "ellipsis" || (lastPage > 5 && Math.abs(item - page) > 1)
                ? "hidden sm:block" : undefined}
            >
              {item === "ellipsis" ? <PaginationEllipsis /> : (
                <PaginationLink {...linkProps(item)} aria-label={`Go to page ${item}`} isActive={item === page}>
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext {...linkProps(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

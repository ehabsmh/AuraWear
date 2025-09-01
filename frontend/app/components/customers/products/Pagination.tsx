"use client";
import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-10 flex justify-center">
      <PaginationShadcn>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem onClick={() => goToPage(currentPage - 1)}>
              <PaginationPrevious href="#" />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={index} onClick={() => goToPage(page)}>
                <PaginationLink href="#" isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {currentPage < totalPages && (
            <PaginationItem onClick={() => goToPage(currentPage + 1)}>
              <PaginationNext href="#" />
            </PaginationItem>
          )}
        </PaginationContent>
      </PaginationShadcn>
    </div>
  );
}

export default Pagination;

/*

{Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={index}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded border transition ${
                page === currentPage
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              {page}
            </button>
          );
        })}
*/

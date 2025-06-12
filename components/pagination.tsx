import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
}

export function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      // Always include last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  // Function to generate page URL
  const getPageUrl = (page: number) => {
    try {
      const url = new URL(baseUrl, window.location.origin)
      url.searchParams.set("page", page.toString())
      return url.pathname + url.search
    } catch {
      // Fallback for relative URLs
      if (baseUrl.includes("?")) {
        if (baseUrl.includes("page=")) {
          return baseUrl.replace(/page=\d+/, `page=${page}`)
        } else {
          return `${baseUrl}&page=${page}`
        }
      } else {
        return `${baseUrl}?page=${page}`
      }
    }
  }

  return (
    <div className={cn("flex justify-center items-center gap-1 my-8", className)}>
      {/* First Page */}
      <Button
        variant="outline"
        size="icon"
        className="hidden sm:flex"
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage === 1 ? (
          <span>
            <ChevronsLeft className="h-4 w-4" />
          </span>
        ) : (
          <Link href={getPageUrl(1)}>
            <ChevronsLeft className="h-4 w-4" />
          </Link>
        )}
      </Button>

      {/* Previous Page */}
      <Button variant="outline" size="icon" disabled={currentPage === 1} asChild={currentPage !== 1}>
        {currentPage === 1 ? (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        ) : (
          <Link href={getPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        )}
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return (
            <Button key={`ellipsis-${index}`} variant="outline" size="icon" disabled className="cursor-default">
              ...
            </Button>
          )
        }

        return (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className={currentPage === page ? "bg-primary hover:bg-primary/90" : ""}
            asChild={currentPage !== page}
          >
            {currentPage === page ? <span>{page}</span> : <Link href={getPageUrl(page as number)}>{page}</Link>}
          </Button>
        )
      })}

      {/* Next Page */}
      <Button variant="outline" size="icon" disabled={currentPage === totalPages} asChild={currentPage !== totalPages}>
        {currentPage === totalPages ? (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        ) : (
          <Link href={getPageUrl(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </Button>

      {/* Last Page */}
      <Button
        variant="outline"
        size="icon"
        className="hidden sm:flex"
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage === totalPages ? (
          <span>
            <ChevronsRight className="h-4 w-4" />
          </span>
        ) : (
          <Link href={getPageUrl(totalPages)}>
            <ChevronsRight className="h-4 w-4" />
          </Link>
        )}
      </Button>
    </div>
  )
}

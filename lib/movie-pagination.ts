export const maxMoviePages = 500;

export function getMoviePaginationItems(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  // Small page counts fit without skipping any pages.
  if (totalPages <= 7) {
    const allPages: number[] = [];
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      allPages.push(pageNumber);
    }
    return allPages;
  }

  // Always include the first page, then the current page and its neighbors.
  // Keep the neighbors between 2 and the second-to-last page to avoid duplicates.
  const visiblePages = [1];
  const firstNeighbor = Math.max(2, currentPage - 1);
  const lastNeighbor = Math.min(totalPages - 1, currentPage + 1);

  for (let pageNumber = firstNeighbor; pageNumber <= lastNeighbor; pageNumber++) {
    visiblePages.push(pageNumber);
  }
  visiblePages.push(totalPages);

  // Show a missing page number for a one-page gap, or an ellipsis for a larger gap.
  const paginationItems: (number | "ellipsis")[] = [];
  let previousPage = 0;

  for (const pageNumber of visiblePages) {
    const skippedPages = pageNumber - previousPage - 1;

    if (skippedPages === 1) {
      paginationItems.push(previousPage + 1);
    } else if (skippedPages > 1) {
      paginationItems.push("ellipsis");
    }

    paginationItems.push(pageNumber);
    previousPage = pageNumber;
  }

  return paginationItems;
}

import { Suspense } from "react";
import Link from "next/link";
import type { DiscoverMovieResponse } from "@/app/contracts/discover-movie";
import { searchMovies } from "@/app/service/tmdb-service";
import MovieList from "@/components/movieList/MovieList";
import MovieCardSkeleton from "@/components/movieList/MovieCardSkeleton";
import ReturnToBrowse from "@/components/ReturnToBrowse";
import { buttonVariants } from "@/components/ui/button";
import { maxMoviePages } from "@/lib/movie-pagination";

type SearchParams = Promise<{
  q?: string | string[];
  page?: string | string[];
}>;

function SearchLoading() {
  return (
    <div role="status" aria-label="Loading search results" className="space-y-4">
      <p className="text-sm text-muted-foreground">Searching movies…</p>
      <div aria-hidden="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  let movies: DiscoverMovieResponse;
  try {
    movies = await searchMovies(query, page);
  } catch {
    return <p role="alert" className="text-destructive">Unable to search movies. Please try again or return to browsing.</p>;
  }

  const lastPage = Math.min(movies.total_pages, maxMoviePages);
  const pageHref = (target: number) => `/search?${new URLSearchParams({ q: query, page: String(target) })}`;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{movies.total_results} movies found</p>
      <MovieList movies={movies.results} />
      {lastPage > 1 && (
        <nav aria-label="Search result pages" className="flex flex-wrap items-center justify-center gap-4">
          {page > 1 && (
            <Link href={pageHref(page - 1)} className={buttonVariants({ variant: "outline" })}>
              Previous
            </Link>
          )}
          <span className="text-sm text-muted-foreground">Page {page} of {lastPage}</span>
          {page < lastPage && (
            <Link href={pageHref(page + 1)} className={buttonVariants({ variant: "outline" })}>
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

async function SearchContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1;
  const page = Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= maxMoviePages
    ? requestedPage : 1;

  return (
    <>
      <ReturnToBrowse />
      <section aria-labelledby="search-results-title" className="space-y-6">
        <div className="space-y-1">
          <h1 id="search-results-title" className="text-2xl font-semibold tracking-tight">
            {query ? `Results for “${query}”` : "Search movies"}
          </h1>
        </div>
        {query ? (
          <Suspense key={`${query}:${page}`} fallback={<SearchLoading />}>
            <SearchResults query={query} page={page} />
          </Suspense>
        ) : null}
      </section>
    </>
  );
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <Suspense fallback={<SearchLoading />}>
        <SearchContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

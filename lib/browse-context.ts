import { movieSortOptions } from "../app/contracts/discover-movie";
import {
  buildMoviePageQuery,
  movieFiltersToQuery,
  type MovieFilterValues,
} from "./movie-filters";
import { maxMoviePages } from "./movie-pagination";

export function getBrowseState(params: Pick<URLSearchParams, "get">) {
  const filters: MovieFilterValues = {
    genre: params.get("with_genres"),
    releaseYear: params.get("primary_release_year"),
    minimumRating: params.get("vote_average.gte"),
  };
  const requestedPage = Number(params.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= maxMoviePages
      ? requestedPage
      : 1;
  const sort = movieSortOptions.find((option) => option === params.get("sort_by"));

  const queryParams = new URLSearchParams(movieFiltersToQuery(filters));
  if (sort) queryParams.set("sort_by", sort);

  const query = buildMoviePageQuery(queryParams.toString(), page);
  return { filters, page, sort, query };
}

export function browseHref(query: string) {
  return query ? `/?${query}` : "/";
}

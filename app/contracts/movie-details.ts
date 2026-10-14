export interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  tagline: string;
  release_date: string;
  runtime: number | null;
  status: string;
  spoken_languages: { english_name: string; iso_639_1: string }[];
  genres: { id: number; name: string }[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  credits?: {
    cast: { credit_id: string; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string }[];
  };
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieGenresResponse {
  genres: MovieGenre[];
}

export interface MovieGenresErrorResponse {
  error: {
    code: "UPSTREAM_ERROR";
    message: string;
  };
}

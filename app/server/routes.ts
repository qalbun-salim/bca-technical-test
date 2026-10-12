export enum Domain {
  TMDB,
}

type ApiConfigValue = {
  url: string;
  headers: HeadersInit;
};
export const ApiDomainConfig: Record<Domain, ApiConfigValue> = {
  [Domain.TMDB]: {
    url: "https://api.themoviedb.org/3",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  },
};

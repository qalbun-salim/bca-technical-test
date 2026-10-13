import { Suspense } from "react";
import { discoverMovies } from "./service/tmdb-service";

async function DiscoverMovies() {
  try {
    const movies = await discoverMovies("page=1");
    console.info("Discovered movies:", movies);
  } catch (error) {
    console.error("Unable to discover movies:", error);
  }

  return null;
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <DiscoverMovies />
    </Suspense>
  );
}

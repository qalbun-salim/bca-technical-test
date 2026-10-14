This is MovieDB: A website where you can search your favourite movies! This project is a submission for BCA technical test.

## Key Decisions

Requirement Summary: A Movie Catalog website with search and filter. Each item in the catalog can be pressed to open the movie detail. The data is fetched from TMDB API.

These decisions below are made based on assessing the product, security, and performance:

### Decision 1: Implement API proxy to keep the TMDB API Key in server

The TMDB API needs an API Key to be called. Calling the API key in browser means that it will expose the API Key because it will be stored in client storage (either url, local storage, or cookie). By using API proxy, we can do the api call to TMDB API in server, making sure the API key is only stored in the server's environment secret.

### Decision 2: Implement Server Side Rendering for initial load

For a public movie catalogue website, implementing SSR will benefit the page by improving initial load time and SEO performance. The movie search can be indexed through prerendered html, and user won't need to see a loading screen in the first render since the data is already available.

Client side fetching is only used on filter and search using Tanstack Query. Implementing Client Side Rendering here benefits more since user only needs to fetch required data and will improve the user's perceived performance.

### Decision 3: Store the filter and search params in url/

The filter and search made by user is stored in the url query params. This enables user to be able to share their search result to other users!

## Tech Stacks

- UI Library: [shadcn-u](https://ui.shadcn.com/)
- Styling: Tailwind
- HTTP client: Axios
- Framework: Next.js

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Then, run `pnpm dev`.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!

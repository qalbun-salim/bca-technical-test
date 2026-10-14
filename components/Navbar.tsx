import { Suspense } from "react";
import Link from "next/link";
import { Film } from "lucide-react";
import NavbarSearch from "@/components/NavbarSearch";

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight"
        >
          <Film className="size-5 text-primary" aria-hidden="true" />
          MoviesDB
        </Link>
        <Suspense fallback={<div className="h-16 w-full sm:w-96" />}>
          <NavbarSearch />
        </Suspense>
      </nav>
    </header>
  );
}

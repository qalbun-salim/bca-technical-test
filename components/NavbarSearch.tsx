"use client";

import Form from "next/form";
import { usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NavbarSearch() {
  const pathname = usePathname();
  const params = useSearchParams();
  const query = pathname === "/search" ? params.get("q") ?? "" : "";

  return (
    <Form action="/search" role="search" className="w-full sm:w-96">
      <label htmlFor="navbar-search" className="sr-only">
        Search all movies by title
      </label>
      <div className="flex items-center gap-2">
        <Input
          key={query}
          id="navbar-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Enter a movie title…"
          required
          className="h-10 sm:h-8"
        />
        <Button type="submit" className="h-10 sm:h-8">
          <Search aria-hidden="true" />
          Search
        </Button>
      </div>
    </Form>
  );
}

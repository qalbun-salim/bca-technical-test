"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function MovieError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Unable to load this movie</h1>
      <p role="alert" className="text-sm text-muted-foreground">
        Please try again in a moment.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Browse movies
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import { Film } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function MovieNotFound() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
      <Film className="size-10 text-muted-foreground" aria-hidden="true" />
      <h1 className="text-2xl font-semibold">Movie not found</h1>
      <p className="text-sm text-muted-foreground">
        This movie may have been removed or the link is incorrect.
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Browse movies
      </Link>
    </main>
  );
}

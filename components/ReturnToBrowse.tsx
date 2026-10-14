import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReturnToBrowse() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Back to browse movies
    </Link>
  );
}

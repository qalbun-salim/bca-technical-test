"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToResults({ returnTo }: { returnTo: string }) {
  const router = useRouter();

  function goBack() {
    let destination = "/";
    try {
      const url = new URL(returnTo, window.location.origin);
      if (url.origin === window.location.origin) {
        destination = `${url.pathname}${url.search}${url.hash}`;
      }
    } catch {
      destination = "/";
    }
    router.push(destination);
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {returnTo.startsWith("/search?")
        ? "Back to search results"
        : "Back to browse movies"}
    </button>
  );
}

"use client";

import { usePaginatedQuery } from "convex/react";

import { useSearchParams } from "@/hooks/use-search-params";
import { DEFAULT_INITIAL_NUM_ITEMS } from "@/lib/constants";
import { api } from "../../../convex/_generated/api";
import { DocumentsView } from "./_components/documents-view";
import { Navbar } from "./_components/navbar";
import { TemplatesGallery } from "./_components/templates-gallery";

export default function Home() {
  const [search] = useSearchParams("search");

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: DEFAULT_INITIAL_NUM_ITEMS }
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[10] h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsView
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}

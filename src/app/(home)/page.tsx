"use client";

import { useQuery } from "convex/react";

import { Navbar } from "./_components/navbar";
import { TemplatesGallery } from "./_components/templates-gallery";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const documents = useQuery(api.documents.get);

  console.log({documents});

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[10] h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <pre>{JSON.stringify(documents, null, 4)}</pre>
      </div>
    </div>
  );
}

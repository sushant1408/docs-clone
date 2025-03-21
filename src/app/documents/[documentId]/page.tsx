import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    {
      id: documentId as Id<"documents">,
    },
    { token }
  );

  if (!preloadedDocument) {
    throw new Error("Document not found");
  }

  return <Document preloadedDocument={preloadedDocument} />;
}

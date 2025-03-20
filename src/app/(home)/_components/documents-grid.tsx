import { PaginationStatus } from "convex/react";
import { format } from "date-fns";
import { Building2Icon, CircleUserIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { DocumentMenu } from "./document-menu";

interface DocumentsGridProps {
  documents: Array<Doc<"documents">> | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

const DocumentsGrid = ({ documents, loadMore, status }: DocumentsGridProps) => {
  const router = useRouter();

  const onClick = (id: Id<"documents">) => {
    router.push(`/documents/${id}`);
  };

  const onNewTabClick = (id: Id<"documents">) => {
    window.open(`/documents/${id}`, "_blank");
  };

  return (
    <>
      {documents === undefined || status === "LoadingFirstPage" ? (
        <div className="flex items-center justify-center h-24">
          <Loader2Icon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <>
          {documents.length === 0 ? (
            <div className="flex items-center justify-center h-24">
              No documents found
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5">
              {documents.map((document) => (
                <div
                  key={document._id}
                  onClick={() => onClick(document._id)}
                  className="border rounded-sm hover:border-blue-500 cursor-pointer"
                >
                  <div className="h-[263px] w-full relative">
                    <div className="absolute h-[78px] w-full bottom-0 bg-gradient-to-t from-[rgba(0,0,0,.02)] to-[rgba(0,0,0,0)]" />
                  </div>
                  <div className="flex flex-col border-t pt-4 pr-2 pb-3.5 pl-4">
                    <p className="truncate font-medium text-sm">
                      {document.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        {document.organizationId ? (
                          <Building2Icon className="size-4" />
                        ) : (
                          <CircleUserIcon className="size-4" />
                        )}
                        <p className="text-muted-foreground text-sm truncate">
                          {format(
                            new Date(document._creationTime),
                            "MMM dd, yyyy"
                          )}
                        </p>
                      </div>

                      <DocumentMenu
                        documentId={document._id}
                        documentTitle={document.title}
                        onNewTab={onNewTabClick}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export { DocumentsGrid };

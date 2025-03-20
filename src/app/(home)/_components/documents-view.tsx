"use client";

import { PaginationStatus } from "convex/react";
import { LayoutGridIcon, ListIcon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { DEFAULT_INITIAL_NUM_ITEMS } from "@/lib/constants";
import { Doc } from "../../../../convex/_generated/dataModel";
import { DocumentsGrid } from "./documents-grid";
import { DocumentsTable } from "./documents-table";

interface DocumentsViewProps {
  documents: Array<Doc<"documents">> | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

const DocumentsView = (props: DocumentsViewProps) => {
  const [viewMethod, setViewMethod] = useLocalStorage<"list" | "grid">(
    "docs-view-method",
    "grid"
  );

  const onChangeViewMethod = () => {
    setViewMethod(viewMethod === "grid" ? "list" : "grid");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-16 pt-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Your documents</h3>
        {props.documents !== undefined && (
          <TooltipWrapper
            label={viewMethod === "list" ? "Grid view" : "List view"}
            side="bottom"
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onChangeViewMethod}
            >
              {viewMethod === "list" ? (
                <LayoutGridIcon className="size-4" />
              ) : (
                <ListIcon className="size-4" />
              )}
            </Button>
          </TooltipWrapper>
        )}
      </div>

      {viewMethod === "list" && <DocumentsTable {...props} />}
      {viewMethod === "grid" && <DocumentsGrid {...props} />}

      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => props.loadMore(DEFAULT_INITIAL_NUM_ITEMS)}
          disabled={props.status !== "CanLoadMore"}
        >
          {props.status === "CanLoadMore" ? "Load more" : "End of results"}
        </Button>
      </div>
    </div>
  );
};

export { DocumentsView };

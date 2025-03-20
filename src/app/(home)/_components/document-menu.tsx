import { useMutation } from "convex/react";
import { ExternalLinkIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { MdTextFields } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { RenameDialog } from "@/components/rename-dialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  documentTitle: Doc<"documents">["title"];
  onNewTab: (id: Id<"documents">) => void;
}

const DocumentMenu = ({
  documentId,
  documentTitle,
  onNewTab,
}: DocumentMenuProps) => {
  const [ConfirmationDialog, confirm] = useConfirm({
    message:
      "This actin cannot be undone. This will permanently delete your document.",
    title: "Are you sure?",
  });

  const remove = useMutation(api.documents.removeById);
  const [isRemoving, setIsRemoving] = useState(false);

  const onRemove = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    setIsRemoving(true);
    remove({ id: documentId }).finally(() => setIsRemoving(false));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDialog documentId={documentId} initialTitle={documentTitle}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            disabled={isRemoving}
          >
            <MdTextFields />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <ConfirmationDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            disabled={isRemoving}
          >
            <Trash2Icon />
            Remove
          </DropdownMenuItem>
        </ConfirmationDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DocumentMenu };

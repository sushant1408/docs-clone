import { ImageIcon, Link2Icon, UploadIcon } from "lucide-react";
import { useState } from "react";

import { InsertImageDialog } from "@/components/insert-image-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";

const ImageButton = () => {
  const { editor } = useEditorStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onChange = (href: string) => {
    editor?.chain().focus().setImage({ src: href }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = (imageUrl: string) => {
    onChange(imageUrl);
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer">
            <ImageIcon className="!size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="!size-4" />
            Upload from computer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <Link2Icon className="!size-4" />
            By URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <InsertImageDialog
        open={isDialogOpen}
        onClose={setIsDialogOpen}
        onImageUrlSubmit={handleImageUrlSubmit}
      />
    </>
  );
};

export { ImageButton };

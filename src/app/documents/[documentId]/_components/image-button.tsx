import { ImageIcon, Link2Icon, UploadIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/use-editor-store";

const ImageButton = () => {
  const { editor } = useEditorStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu
        onOpenChange={(open) => {
          if (open) {
            // setValue(editor?.getAttributes("link").href);
          }
        }}
      >
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image url</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ImageButton };

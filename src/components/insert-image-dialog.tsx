import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface InsertImageDialogProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onImageUrlSubmit: (imageUrl: string) => void;
}

const InsertImageDialog = ({
  onClose,
  open,
  onImageUrlSubmit,
}: InsertImageDialogProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = () => {
    if (imageUrl) {
      onImageUrlSubmit(imageUrl);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
              onSubmit();
            }
          }}
        />
        <DialogFooter>
          <Button onClick={onSubmit}>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { InsertImageDialog };

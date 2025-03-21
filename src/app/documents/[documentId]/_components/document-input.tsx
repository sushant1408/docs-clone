import { useStatus } from "@liveblocks/react";
import { useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { toast } from "sonner";

import { useDebounce } from "@/hooks/use-debounce";
import { api } from "../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";

interface DocumentInputProps {
  documentId: Id<"documents">;
  initialTitle: Doc<"documents">["title"];
}

const DocumentInput = ({ documentId, initialTitle }: DocumentInputProps) => {
  const [value, setValue] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const status = useStatus();

  const inputRef = useRef<HTMLInputElement>(null);

  const update = useMutation(api.documents.updateById);

  const handleUpdate = (newValue: string) => {
    if (newValue === initialTitle) {
      return;
    }

    setIsPending(true);
    update({ id: documentId, title: newValue })
      .then(() => {
        toast.success("Document renamed");
        setIsEditing(false);
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setIsPending(false);
      });
  };

  const debouncedUpdate = useDebounce(handleUpdate);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleUpdate(value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={onSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            disabled={isPending}
            className="absolute inset-0 text-lg text-black px-1.6 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {initialTitle}
        </span>
      )}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && (
        <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
      )}
      {showError && <BsCloudSlash className="size-4" />}
    </div>
  );
};

export { DocumentInput };

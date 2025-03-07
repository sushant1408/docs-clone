"use client";

import { type Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";

const headings = [
  { label: "Normal text", value: 0, fontSize: "16px" },
  { label: "Heading 1", value: 1, fontSize: "32px" },
  { label: "Heading 2", value: 2, fontSize: "24px" },
  { label: "Heading 3", value: 3, fontSize: "20px" },
  { label: "Heading 4", value: 4, fontSize: "18px" },
  { label: "Heading 5", value: 5, fontSize: "16px" },
];

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }

      return "Normal text";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm cursor-pointer">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="!size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {headings.map((heading) => (
          <DropdownMenuCheckboxItem
            checked={
              (heading.value === 0 && !editor?.isActive("heading")) ||
              editor?.isActive("heading", { level: heading.value })
            }
            onClick={() => {
              if (heading.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run();
              }
            }}
            style={{ fontSize: heading.fontSize }}
            key={heading.value}
          >
            {heading.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { HeadingLevelButton };

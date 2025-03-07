"use client";

import { ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";

const fonts = [
  { label: "Ariel", value: "Ariel" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
  { label: "Georgia", value: "Georgia" },
  { label: "Verdana", value: "Verdana" },
  { label: "Inter", value: "Inter" },
  { label: "Comic Sans MS", value: "Comic Sans MS" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Exo 2", value: "Exo 2" },
];

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm cursor-pointer"
          style={{
            fontFamily: editor?.getAttributes("textStyle").fontFamily || "Ariel",
          }}
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Ariel"}
          </span>
          <ChevronDownIcon className="!size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {fonts.map((font) => (
          <DropdownMenuCheckboxItem
            checked={
              editor?.getAttributes("textStyle").fontFamily === font.value
            }
            onClick={() => {
              editor?.chain().focus().setFontFamily(font.value).run();
            }}
            style={{ fontFamily: font.value }}
            key={font.value}
          >
            {font.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { FontFamilyButton };

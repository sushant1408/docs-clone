"use client";

import {
  BoldIcon,
  ItalicIcon,
  ListChecksIcon,
  ListIcon,
  ListOrderedIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/use-editor-store";
import { FontFamilyButton } from "./font-family-button";
import { FontSizeButton } from "./font-size-button";
import { HeadingLevelButton } from "./heading-level-button";
import { HighlightColorButton } from "./highlight-color-button";
import { ImageButton } from "./image-button";
import { LineHeightButton } from "./line-height-button";
import { LinkButton } from "./link-button";
import { TextAlignButton } from "./text-align-button";
import { TextColorButton } from "./text-color-button";
import { ToolbarButton } from "./toolbar-button";

const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {},
      },
    ],
    [
      {
        label: "Checklist",
        icon: ListChecksIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Bulleted list",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
      },
      {
        label: "Numbered list",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
      },
    ],
  ];

  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[25px] min-h-[40px] flex items-center gap-x-0.5 overflow-auto">
      {sections[0].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}

      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />

      <HeadingLevelButton />

      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />

      <FontFamilyButton />

      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />

      <FontSizeButton />

      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />

      {sections[1].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}

      <TextColorButton />

      <HighlightColorButton />

      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />

      <LinkButton />

      {sections[2].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}

      <ImageButton />

      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />

      <TextAlignButton />

      <LineHeightButton />

      {sections[3].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}

      <ToolbarButton
        label="Clear formatting"
        icon={RemoveFormattingIcon}
        onClick={() => editor?.chain().focus().unsetAllMarks().run()}
      />
    </div>
  );
};

export { Toolbar };

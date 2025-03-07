import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";

import { TooltipWrapper } from "@/components/tooltip-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { ToolbarButton } from "./toolbar-button";

const alignments = [
  { label: "Left align", value: "left", icon: AlignLeftIcon },
  { label: "Center align", value: "center", icon: AlignCenterIcon },
  { label: "Right align", value: "right", icon: AlignRightIcon },
  { label: "Justify", value: "justify", icon: AlignJustifyIcon },
];

const TextAlignButton = () => {
  const { editor } = useEditorStore();

  const getCurrentAlignmentIcon = () => {
    if (editor?.isActive({ textAlign: "left" })) {
      return <AlignLeftIcon className="!size-4" />;
    } else if (editor?.isActive({ textAlign: "center" })) {
      return <AlignCenterIcon className="!size-4" />;
    } else if (editor?.isActive({ textAlign: "right" })) {
      return <AlignRightIcon className="!size-4" />;
    } else if (editor?.isActive({ textAlign: "justify" })) {
      return <AlignJustifyIcon className="!size-4" />;
    } else {
      return <AlignLeftIcon className="!size-4" />;
    }
  };

  return (
    <DropdownMenu>
      <TooltipWrapper label="Align & Indent">
        <DropdownMenuTrigger asChild>
          <button className="text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer">
            {getCurrentAlignmentIcon()}
          </button>
        </DropdownMenuTrigger>
      </TooltipWrapper>
      <DropdownMenuContent className="flex items-center justify-between">
        {alignments.map(({ icon, label, value }) => (
          <ToolbarButton
            key={value}
            label={label}
            icon={icon}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TextAlignButton };

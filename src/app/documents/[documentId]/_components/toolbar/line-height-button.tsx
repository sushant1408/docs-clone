import { TooltipWrapper } from "@/components/tooltip-wrapper";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { TbLineHeight } from "react-icons/tb";

const lineHeights = [
  { label: "Default", value: "normal" },
  { label: "Single", value: "1" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "Double", value: "2" },
];

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  return (
    <DropdownMenu>
      <TooltipWrapper label="Line & Paragraph spacing">
        <DropdownMenuTrigger asChild>
          <button className="text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer">
            <TbLineHeight className="!size-4" />
          </button>
        </DropdownMenuTrigger>
      </TooltipWrapper>
      <DropdownMenuContent>
        {lineHeights.map(({ label, value }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={editor?.getAttributes("paragraph").lineHeight === value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LineHeightButton };

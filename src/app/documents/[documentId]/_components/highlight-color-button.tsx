import { HighlighterIcon } from "lucide-react";
import { type ColorResult, CirclePicker } from "react-color";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import COLORS from "@/lib/colors";
import { useEditorStore } from "@/store/use-editor-store";

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer">
          <HighlighterIcon className="!size-4 mb-1" />
          <div
            className="h-0.5 w-5"
            style={{
              backgroundColor: value,
            }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker
          color={value}
          onChange={onChange}
          colors={COLORS}
          circleSize={21}
          circleSpacing={4}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { HighlightColorButton };

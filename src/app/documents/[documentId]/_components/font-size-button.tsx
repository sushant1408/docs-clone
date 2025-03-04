import { MinusIcon, PlusIcon } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState } from "react";

import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fontSizes = [
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "14", value: "14" },
  { label: "18", value: "18" },
  { label: "24", value: "24" },
  { label: "30", value: "30" },
  { label: "36", value: "36" },
  { label: "48", value: "48" },
  { label: "60", value: "60" },
  { label: "72", value: "72" },
  { label: "96", value: "96" },
];

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize?.replace("px", "")
    : 16;

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;

    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="text-sm h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer"
      >
        <MinusIcon className="!size-4" />
      </button>
      {isEditing ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="h-7 w-10 text-sm rounded-sm border border-neutral-400 text-center bg-transparent focus:outline-none focus:ring-0"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {fontSizes.map((size) => (
              <DropdownMenuItem
                key={size.value}
                onClick={() => updateFontSize(size.value)}
              >
                {size.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="text-sm h-7 w-10 rounded-sm border border-neutral-400 text-center bg-transparent cursor-text"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="text-sm h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer"
      >
        <PlusIcon className="!size-4" />
      </button>
    </div>
  );
};

export { FontSizeButton };

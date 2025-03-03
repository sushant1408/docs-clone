"use client";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { TooltipWrapper } from "@/components/tooltip-wrapper";

interface ToolbarButtonProps {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <TooltipWrapper label={label} side="bottom">
      <button
        onClick={onClick}
        className={cn(
          "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer",
          isActive && "bg-neutral-200/80"
        )}
      >
        <Icon className="!size-4" />
      </button>
    </TooltipWrapper>
  );
};

export { ToolbarButton };

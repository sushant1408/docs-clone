"use client";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  DownloadIcon,
  ItalicIcon,
  ListChecksIcon,
  ListIcon,
  ListOrderedIcon,
  PencilIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TableIcon,
  Trash2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SiGoogledocs } from "react-icons/si";
import { TbLineHeight } from "react-icons/tb";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/use-editor-store";
import { DocumentInput } from "./document-input";

const Navbar = () => {
  const { editor } = useEditorStore();

  const [columns, setColumns] = useState(11);
  const [rows, setRows] = useState(5);
  const [hoveredCell, setHoveredCell] = useState({ row: 0, col: 0 });
  const maxSize = 20;

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    setHoveredCell({ row: rowIndex, col: colIndex });

    if (colIndex === columns - 1 && columns < maxSize) {
      setColumns(columns + 1);
    }
    if (rowIndex === rows - 1 && rows < maxSize) {
      setRows(rows + 1);
    }
  };

  const isCellSelected = (rowIndex: number, colIndex: number) => {
    return (
      rowIndex >= 0 &&
      colIndex >= 0 &&
      rowIndex <= hoveredCell.row &&
      colIndex <= hoveredCell.col
    );
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" height={36} width={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <SiGoogledocs className="size-4 mr-2 text-muted-foreground" />
                      New
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <SiGoogledocs />
                        Document
                      </MenubarItem>
                      <MenubarItem>
                        <ItalicIcon />
                        From a template
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <DownloadIcon className="size-4 mr-2 text-muted-foreground" />
                      Download
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>JSON (.json)</MenubarItem>
                      <MenubarItem>HTML (.html)</MenubarItem>
                      <MenubarItem>PDF (.pdf)</MenubarItem>
                      <MenubarItem>Text (.txt)</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    <PencilIcon />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <Trash2Icon />
                    Move to trash
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon />
                    Print
                    <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon />
                    Undo
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon />
                    Redo
                    <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub
                    onOpenChange={(open) => {
                      if (!open) {
                        setColumns(11);
                        setRows(5);
                        setHoveredCell({ col: 0, row: 0 });
                      }
                    }}
                  >
                    <MenubarSubTrigger>
                      <TableIcon className="size-4 mr-2 text-muted-foreground" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent className="flex flex-col items-center gap-y-2">
                      <div
                        className="grid gap-[3px]"
                        style={{
                          gridTemplateColumns: `repeat(${columns}, 15px)`,
                          gridTemplateRows: `repeat(${rows}, 15px)`,
                        }}
                      >
                        {Array.from({ length: rows }).map((_, rowIndex) =>
                          Array.from({ length: columns }).map((_, colIndex) => (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className="size-[15px] bg-gray-100 border hover:bg-[#90caf9] cursor-pointer"
                              style={{
                                backgroundColor: isCellSelected(
                                  rowIndex,
                                  colIndex
                                )
                                  ? "#64b5f6"
                                  : undefined,
                                borderColor: isCellSelected(rowIndex, colIndex)
                                  ? "#90caf9"
                                  : undefined,
                              }}
                              onMouseEnter={() =>
                                handleMouseEnter(rowIndex, colIndex)
                              }
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .insertTable({
                                    rows: hoveredCell.row + 1,
                                    cols: hoveredCell.col + 1,
                                    withHeaderRow: false,
                                  })
                                  .run()
                              }
                            />
                          ))
                        )}
                      </div>
                      <span className="text-sm">
                        {hoveredCell.row + 1} x {hoveredCell.col + 1}
                      </span>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <BoldIcon className="size-4 mr-2 text-muted-foreground" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon />
                        Bold
                        <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon />
                        Italic
                        <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon />
                        Underline
                        <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon />
                        Strikethrough&nbsp;&nbsp;&nbsp;&nbsp;
                        <MenubarShortcut>⌘⇧X</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>Size</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem>Increase font size</MenubarItem>
                          <MenubarItem>Decrease font size</MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <AlignJustifyIcon className="size-4 mr-2 text-muted-foreground" />
                      Paragraph styles
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setParagraph().run()
                        }
                      >
                        Normal text
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run()
                        }
                      >
                        Heading 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                        }
                      >
                        Heading 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                        }
                      >
                        Heading 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 4 })
                            .run()
                        }
                      >
                        Heading 4
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 5 })
                            .run()
                        }
                      >
                        Heading 5
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <AlignLeftIcon className="size-4 mr-2 text-muted-foreground" />
                      Align & indent
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setTextAlign("left").run()
                        }
                      >
                        <AlignLeftIcon />
                        Left
                        <MenubarShortcut>⌘⇧L</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setTextAlign("center").run()
                        }
                      >
                        <AlignCenterIcon />
                        Center&nbsp;&nbsp;&nbsp;&nbsp;
                        <MenubarShortcut>⌘⇧E</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setTextAlign("right").run()
                        }
                      >
                        <AlignRightIcon />
                        Right
                        <MenubarShortcut>⌘⇧R</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setTextAlign("justify").run()
                        }
                      >
                        <AlignJustifyIcon />
                        Justify&nbsp;&nbsp;&nbsp;&nbsp;
                        <MenubarShortcut>⌘⇧J</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TbLineHeight className="size-4 mr-2 text-muted-foreground" />
                      Line & paragraph spacing&nbsp;&nbsp;&nbsp;&nbsp;
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setLineHeight("normal").run()
                        }
                      >
                        Default
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setLineHeight("1").run()
                        }
                      >
                        Single
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setLineHeight("1.15").run()
                        }
                      >
                        1.15
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setLineHeight("1.5").run()
                        }
                      >
                        1.5
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setLineHeight("2").run()
                        }
                      >
                        Double
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <ListIcon className="size-4 mr-2 text-muted-foreground" />
                      Bullets & numbering
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleTaskList().run()
                        }
                      >
                        <ListChecksIcon />
                        Checklist
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBulletList().run()
                        }
                      >
                        <ListIcon />
                        Bulleted list
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleOrderedList().run()
                        }
                      >
                        <ListOrderedIcon />
                        Numbered list
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    <RemoveFormattingIcon />
                    Clear formatting
                    <MenubarShortcut>⌘\</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Tools
                </MenubarTrigger>
                <MenubarContent></MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Help
                </MenubarTrigger>
                <MenubarContent></MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };

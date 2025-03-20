"use client";

import { useStorage } from "@liveblocks/react";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";

import { FontSizeExtention } from "@/extensions/font-size";
import { LineHeightExtention } from "@/extensions/line-height";
import { DEFAULT_LEFT_MARGIN, DEFAULT_RIGHT_MARGIN } from "@/lib/constants";
import { useEditorStore } from "@/store/use-editor-store";
import { Threads } from "../threads";
import { Ruler } from "./ruler";

const Editor = () => {
  const { setEditor } = useEditorStore();
  const liveblocks = useLiveblocksExtension();

  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? DEFAULT_LEFT_MARGIN}px; padding-right: ${rightMargin ?? DEFAULT_RIGHT_MARGIN}px`,
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      liveblocks,
      Color,
      FontFamily,
      FontSizeExtention,
      Highlight.configure({
        multicolor: true,
      }),
      Image,
      ImageResize,
      LineHeightExtention,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      StarterKit.configure({
        history: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Underline,
    ],
  });

  return (
    <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

export { Editor };

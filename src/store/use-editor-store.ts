import { type Editor } from "@tiptap/react";
import { create } from "zustand";

interface EditorProps {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

const useEditorStore = create<EditorProps>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

export { useEditorStore };

import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

const LineHeightExtention = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultLineHeight: "normal",
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: (element) =>
              element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }

              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);

          const { from, to } = selection;
          state.doc.nodesBetween(from, to, (node, position) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(position, undefined, {
                ...node.attrs,
                lineHeight,
              });
            }
          });

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        },
      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);

          const { from, to } = selection;
          state.doc.nodesBetween(from, to, (node, position) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(position, undefined, {
                ...node.attrs,
                lineHeight: this.options.defaultLineHeight,
              });
            }
          });

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        },
    };
  },
});

export { LineHeightExtention };

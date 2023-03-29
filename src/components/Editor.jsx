import "./EditorStyles.scss";

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@mui/material";

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Add some notes...",
      }),
    ],
  });

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Button
            variant="outlined"
            sx={{
              color: editor.isActive("heading", { level: 1 })
                ? "white"
                : "grey",
              borderColor: editor.isActive("heading", { level: 1 })
                ? "white"
                : "grey",
            }}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            H1
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            sx={{
              color: editor.isActive("heading", { level: 2 })
                ? "white"
                : "grey",
              borderColor: editor.isActive("heading", { level: 2 })
                ? "white"
                : "grey",
            }}
          >
            H2
          </Button>
          <Button
            variant="outlined"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            sx={{
              color: editor.isActive("bulletList") ? "white" : "grey",
              borderColor: editor.isActive("bulletList") ? "white" : "grey",
            }}
          >
            Bullet List
          </Button>
          <Button
            variant="outlined"
            onClick={addImage}
            sx={{
              color: editor.isActive("image") ? "white" : "grey",
              borderColor: editor.isActive("image") ? "white" : "grey",
            }}
          >
            Image
          </Button>
        </div>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

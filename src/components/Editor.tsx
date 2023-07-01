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
import { Button, IconButton } from "@mui/material";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

export const Editor = ({
  getPlyrInstance,
}: {
  getPlyrInstance: () => Plyr;
}) => {
  const [open, setOpenn] = React.useState(false);

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
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleCurrentTime = () => {
    const plyrInstance = getPlyrInstance();
    if (plyrInstance) {
      const currentTime = plyrInstance;
      console.log(currentTime);
    }
  };

  return open ? (
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
            variant="contained"
            sx={{
              backgroundColor: editor.isActive("heading", { level: 1 })
                ? "white"
                : "grey",
              // borderColor: editor.isActive("heading", { level: 1 })
              //   ? "white"
              //   : "#5e80df;",
            }}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            H1
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            sx={{
              backgroundColor: editor.isActive("heading", { level: 2 })
                ? "white"
                : "grey",
              // borderColor: editor.isActive("heading", { level: 2 })
              //   ? "white"
              //   : "#5e80df",
            }}
          >
            H2
          </Button>
          <Button
            variant="contained"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            sx={{
              backgroundColor: editor.isActive("bulletList") ? "white" : "grey",
              // borderColor: editor.isActive("bulletList") ? "white" : "#5e80df",
            }}
          >
            Bullet List
          </Button>
          <Button
            variant="contained"
            onClick={addImage}
            sx={{
              backgroundColor: editor.isActive("image") ? "white" : "grey",
              // borderColor: editor.isActive("image") ? "white" : "#5e80df",
            }}
          >
            Image
          </Button>
          <Button
            variant="contained"
            onClick={handleCurrentTime}
            sx={{
              backgroundColor: "grey",
              // borderColor: "#5e80df",
            }}
          >
            Current Time
          </Button>
        </div>
      )}
      <EditorContent editor={editor} />
    </>
  ) : (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <IconButton
        color="inherit"
        onClick={() => setOpenn(!open)}
        // sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <ArrowDropDown />
      </IconButton>
    </div>
  );
};

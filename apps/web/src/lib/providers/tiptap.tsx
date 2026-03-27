"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Strikethrough, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, useImperativeHandle } from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { useAIStore } from "@/modules/ai/stores/ai.store";
import { useEffect } from "react"


interface TiptapProps {
  onChange?: (html: string) => void;
}

// Yeh type parent mein use hogi ref ke saath
export interface TiptapRef {
  editor: Editor | null;
}

const Tiptap = forwardRef<TiptapRef, TiptapProps>(({ onChange }, ref) => {
  
  const content = useAIStore((state) => state.content)
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-40 h-[70vh] outline-none text-white/80 text-lg leading-relaxed overflow-y-scroll",
      },
    },
  });

    useEffect(() => {
    if (!editor || !content) return;
    
    // Sirf tab update karo jab content actually different ho
    const current = editor.getHTML();
    if (current !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Parent ko editor instance expose karo
  useImperativeHandle(ref, () => ({
    editor: editor ?? null,
  }));

  return (
<div>
      {editor && (
        <BubbleMenu
          editor={editor}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800 border border-white/10 shadow-xl">

          {/* Bold button */}

          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              editor.isActive("bold")
                ? "bg-indigo-500/30 text-indigo-300"
                : "text-white/50 hover:text-white hover:bg-white/10",
            )}
          >
            {" "}
            <Bold className="w-3.5 h-3.5" />
          </Button>

          {/* Italic */}
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              editor.isActive("italic")
                ? "bg-indigo-500/30 text-indigo-300"
                : "text-white/50 hover:text-white hover:bg-white/10",
            )}
          >
            {" "}
            <Italic className="w-3.5 h-3.5" />
          </Button>

          {/* Striket */}
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              editor.isActive("strike")
                ? "bg-indigo-500/30 text-indigo-300"
                : "text-white/50 hover:text-white hover:bg-white/10",
            )}
          >
            {" "}
            <Strikethrough className="w-3.5 h-3.5" />
          </Button>

          {/* Code */}
          <Button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              editor.isActive("code")
                ? "bg-indigo-500/30 text-indigo-300"
                : "text-white/50 hover:text-white hover:bg-white/10",
            )}
          >
            {" "}
            <Code className="w-3.5 h-3.5" />
          </Button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
});

Tiptap.displayName = "Tiptap";
export default Tiptap;
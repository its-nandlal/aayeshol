"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, Send, Smile, Hash, AtSign, Type, X, Bold, Italic } from "lucide-react";
import Header from "@/components/ui/header";
import Tiptap, { TiptapRef } from "@/lib/providers/tiptap";
import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import AiRequest from "../../../modules/ai/components/ai-request";

export default function NewPostPage() {
  const tiptapRef = useRef<TiptapRef>(null);
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const EMOJIS = [
    "😀","😂","🥹","😍","🤩","😎","🥳","😅","🙏","👏",
    "🔥","💯","✨","🎉","💡","🚀","💪","❤️","👀","🎯",
  ];

  const charCount = content.replace(/<[^>]*>/g, "").length;
  const ref = useOutsideClick(() => setShowEmojiPicker(false));

  const insertBold = () => tiptapRef.current?.editor?.chain().focus().toggleBold().run();
  const insertItalic = () => tiptapRef.current?.editor?.chain().focus().toggleItalic().run();
  const insertHashtag = () => tiptapRef.current?.editor?.chain().focus().insertContent(" #").run();
  const insertMention = () => tiptapRef.current?.editor?.chain().focus().insertContent(" @").run();
  const insertEmoji = (emoji: string) => {
    tiptapRef.current?.editor?.chain().focus().insertContent(emoji).run();
    setShowEmojiPicker(false);
  };
  const clearContent = () => {
    tiptapRef.current?.editor?.commands.clearContent();
    setContent("");
  };

  const toolbarBtnClass = "p-3 rounded-lg bg-indigo-800/30 text-indigo-300/40 hover:text-indigo-200/80 hover:bg-indigo-500/30 transition-all cursor-pointer";

  return (
    <section className="w-full h-full">
      <Header
        heading="Create New Post"
        actions={[{ label: "Drafts", icon: "Clock", href: "/dashboard/posts" }]}
      />

      <div className="p-4">
        <div className="mx-auto">
          <div className="relative h-full">

            {/* Main Editor Card */}
            <div className="relative h-[88vh] bg-linear-to-tl from-black to-indigo-950/60 rounded-2xl border border-indigo-900/30 overflow-hidden">

              {/* Top Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-900/30 bg-black/40">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-950/50 rounded-lg border border-indigo-800/30">
                  <Type className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-indigo-200/60">New Post</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-indigo-300/40">
                    {charCount} chars
                  </span>
                  <button className="group p-2 bg-linear-to-tl from-pink-600/60 to-indigo-600/60 border border-indigo-500/30 rounded-lg hover:from-pink-600/80 hover:to-indigo-600/80 ease-in-out duration-300 cursor-pointer">
                    <Sparkles className="w-5 h-5 text-white/80 group-hover:text-white/95" />
                  </button>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="w-full h-full grid grid-cols-2 gap-0 overflow-hidden">

                {/* Left — Editor */}
                <div className="relative w-full h-full overflow-hidden border-r border-indigo-900/30">

                  {/* Toolbar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-900/30 bg-indigo-950/30">
                    <div className="flex items-center gap-1">
                      <Button onClick={insertBold} title="Bold" className={toolbarBtnClass}>
                        <Bold className="w-5 h-5" />
                      </Button>
                      <Button onClick={insertItalic} title="Italic" className={toolbarBtnClass}>
                        <Italic className="w-5 h-5" />
                      </Button>
                      <Button onClick={insertHashtag} title="Hashtag" className={toolbarBtnClass}>
                        <Hash className="w-5 h-5" />
                      </Button>
                      <Button onClick={insertMention} title="Mention" className={toolbarBtnClass}>
                        <AtSign className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={() => setShowEmojiPicker((v) => !v)}
                        title="Emoji"
                        className={toolbarBtnClass}
                      >
                        <Smile className="w-5 h-5" />
                      </Button>

                      {/* Emoji Picker */}
                      {showEmojiPicker && (
                        <motion.div
                          ref={ref}
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ y: 8, scale: 0.95, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-20 left-0 z-50 p-3 bg-indigo-950 border border-indigo-800/40 rounded-2xl shadow-2xl shadow-indigo-950/50"
                        >
                          <div className="flex items-center justify-between mb-2 px-1">
                            <span className="text-xs text-indigo-300/40">Emojis</span>
                            <button
                              onClick={() => setShowEmojiPicker(false)}
                              className="text-indigo-300/30 hover:text-indigo-200/60 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-5 gap-1">
                            {EMOJIS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => insertEmoji(emoji)}
                                className="w-9 h-9 flex items-center justify-center text-xl rounded-lg hover:bg-indigo-800/30 transition-colors cursor-pointer"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        onClick={clearContent}
                        className="px-4 py-2 bg-linear-to-tl from-black via-red-900 to-red-700 text-sm text-white/70 hover:text-white/90 transition-colors cursor-pointer"
                      >
                        Clear
                      </Button>
                      <Button
                        onClick={() => console.log("Post HTML:", content)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-tl from-black via-indigo-800 to-indigo-700 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        Post
                      </Button>
                    </div>
                  </div>

                  {/* Editor Area */}
                  <div className="p-4 h-[calc(100%-56px)] bg-black/70 overflow-y-auto"
                  >
                    <Tiptap ref={tiptapRef} onChange={(html) => setContent(html)} />
                  </div>
                </div>

                {/* Right — AI Panel */}
                <div className="h-full overflow-hidden bg-indigo-950/20">
                  <AiRequest />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
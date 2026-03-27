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

  // Common emojis list
  const EMOJIS = [
    "😀",
    "😂",
    "🥹",
    "😍",
    "🤩",
    "😎",
    "🥳",
    "😅",
    "🙏",
    "👏",
    "🔥",
    "💯",
    "✨",
    "🎉",
    "💡",
    "🚀",
    "💪",
    "❤️",
    "👀",
    "🎯",
  ];

  const charCount = content.replace(/<[^>]*>/g, "").length;

  const ref = useOutsideClick(() => setShowEmojiPicker(false));

  const insertBold = () => {
    tiptapRef.current?.editor?.chain().focus().toggleBold().run();
  }

  const insertItalic = () => {
    tiptapRef.current?.editor?.chain().focus().toggleItalic().run();
  }

  const insertHashtag = () => {
    tiptapRef.current?.editor?.chain().focus().insertContent(" #").run();
  };

  const insertMention = () => {
    tiptapRef.current?.editor?.chain().focus().insertContent(" @").run();
  };

  const insertEmoji = (emoji: string) => {
    tiptapRef.current?.editor?.chain().focus().insertContent(emoji).run();
    setShowEmojiPicker(false);
  };

  const clearContent = () => {
    tiptapRef.current?.editor?.commands.clearContent();
    setContent("");
  };

  return (
    <section className="w-full h-full ">
      <Header
        heading="Create New Post"
        actions={[{ label: "Drafts", icon: "Clock", href: "/dashboard/posts" }]}
      />

      <div className="p-4">
        <div className="mx-auto">
          <div
            className="relative h-full"
          >
            {/* Main Editor Card */}
            <div className="relative h-[88vh] bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                  <Type className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-white/70">New Post</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-white/40">
                    {charCount} chars
                  </span>
                  <button className="group p-2 bg-linear-to-tl from-pink-600/60 to-indigo-600/60 backdrop-blur-md border border-slate-600/60 rounded-lg hover:from-pink-600/80 hover:to-indigo-600/80 ease-in-out duration-300 cursor-pointer">
                    <Sparkles className="w-5 h-5 text-white/80 group-hover:text-white/95" />
                  </button>
                </div>
              </div>

              {/* Tiptap Editor — onChange se content update hota hai */}
              <div className="w-full h-full grid grid-cols-2 gap-2">
                <div className="relative w-full">
                  
                  {/* Top actions */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/50">
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={insertBold}
                        title="Insert hashtag"
                        className="p-3 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"
                      >
                        <Bold className="w-5 h-5 text-bold" />
                      </Button>

                      <Button
                        onClick={insertItalic}
                        title="Insert hashtag"
                        className="p-3 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"
                      >
                        <Italic className="w-5 h-5 text-bold" />
                      </Button>

                      <Button
                        onClick={insertHashtag}
                        title="Insert hashtag"
                        className="p-3 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"
                      >
                        <Hash className="w-5 h-5" />
                      </Button>

                      <Button
                        onClick={insertMention}
                        title="Insert mention"
                        className="p-3 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"
                      >
                        <AtSign className="w-5 h-5" />
                      </Button>

                      <Button
                        onClick={() => setShowEmojiPicker((v) => !v)}
                        title="Insert emoji"
                        className="p-3 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"
                      >
                        <Smile className="w-5 h-5" />
                      </Button>

                      {showEmojiPicker && (
                        <motion.div
                          ref={ref}
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ y: 8, scale: 0.95, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-20 left-0 z-50 p-3 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl"
                        >
                          <div className="flex items-center justify-between mb-2 px-1">
                            <span className="text-xs text-white/40">
                              Emojis
                            </span>
                            <button
                              onClick={() => setShowEmojiPicker(false)}
                              className="text-white/30 hover:text-white/60 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-5 gap-1">
                            {EMOJIS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => insertEmoji(emoji)}
                                className="w-9 h-9 flex items-center justify-center text-xl rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Clear — editor ka content reset karna alag handle hoga */}
                      <Button
                        onClick={clearContent}
                        className="px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-colors"
                      >
                        Clear
                      </Button>
                      <Button
                        onClick={() => console.log("Post HTML:", content)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all"
                      >
                        <Send className="w-4 h-4" />
                        Post
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 h-full">
                    <Tiptap
                      ref={tiptapRef}
                      onChange={(html) => setContent(html)}
                    />
                  </div>
                </div>

                <AiRequest />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

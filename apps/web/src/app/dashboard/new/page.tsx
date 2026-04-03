"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Send,
  Smile,
  Hash,
  AtSign,
  Type,
  X,
  Bold,
  Italic,
  Save,
} from "lucide-react";
import Header from "@/components/ui/header";
import Tiptap, { TiptapRef } from "@/lib/providers/tiptap";
import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import AiRequest from "../../../modules/ai/components/ai-request";
import { usePostContent, useSaveDraft } from "@/modules/new/hooks/use-new";

export default function NewPostPage() {
  const tiptapRef = useRef<TiptapRef>(null);
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAiDrawer, setShowAiDrawer] = useState(false);

  const post = usePostContent();
  const saveDraft = useSaveDraft();

  const handlePost = () => {
    const editorContent = tiptapRef.current?.editor?.getHTML() ?? "";
    post.mutate(editorContent);
  };

  const handleSaveDraft = () => {
    const editorContent = tiptapRef.current?.editor?.getHTML() ?? "";
    saveDraft.mutate(editorContent);
  };

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
  const emojiRef = useOutsideClick(() => setShowEmojiPicker(false));

  const insertBold = () =>
    tiptapRef.current?.editor?.chain().focus().toggleBold().run();
  const insertItalic = () =>
    tiptapRef.current?.editor?.chain().focus().toggleItalic().run();
  const insertHashtag = () =>
    tiptapRef.current?.editor?.chain().focus().insertContent(" #").run();
  const insertMention = () =>
    tiptapRef.current?.editor?.chain().focus().insertContent(" @").run();
  const insertEmoji = (emoji: string) => {
    tiptapRef.current?.editor?.chain().focus().insertContent(emoji).run();
    setShowEmojiPicker(false);
  };
  const clearContent = () => {
    tiptapRef.current?.editor?.commands.clearContent();
    setContent("");
  };

  const toolbarBtnClass =
    "p-2.5 md:p-3 rounded-lg bg-indigo-800/30 text-indigo-300/40 hover:text-indigo-200/80 hover:bg-indigo-500/30 transition-all cursor-pointer";

  return (
    <>
      {/* ── Mobile AI Drawer (position fixed) ── */}
      <AnimatePresence>
        {showAiDrawer && (
          <>
            {/* Backdrop */}
            <motion.div
              key="ai-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowAiDrawer(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 40,
                background: "rgba(0,0,0,0.6)",
              }}
              className="lg:hidden"
            />

            {/* Drawer panel — slides up from bottom */}
            <motion.div
              key="ai-drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 50,
              }}
              className="lg:hidden h-[82vh] bg-[#07071a] border-t border-indigo-800/40 rounded-t-2xl overflow-hidden flex flex-col"
            >
              {/* Drawer handle + header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-900/30 bg-indigo-950/60 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-linear-to-tl from-pink-600/60 to-indigo-600/60 border border-indigo-500/30">
                    <Sparkles className="w-4 h-4 text-white/80" />
                  </div>
                  <span className="text-sm font-medium text-indigo-200/80">
                    AI Assistant
                  </span>
                </div>
                <button
                  onClick={() => setShowAiDrawer(false)}
                  className="p-1.5 rounded-lg text-indigo-300/50 hover:text-indigo-200/80 hover:bg-indigo-800/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* AI content */}
              <div className="flex-1 overflow-y-auto">
                <AiRequest />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main page ── */}
      <section className="w-full min-h-screen overflow-y-auto">
        <Header
          heading="Create New Post"
          actions={[
            {
              label: "Save",
              icon: Save,
              onClick: handleSaveDraft,
              isPending: saveDraft.isPending,
              loadingText: "Saving...",
            },
          ]}
        />

        <div className="p-2 sm:p-4">
          <div className="mx-auto">
            <div className="relative bg-linear-to-tl from-black to-indigo-950/60 rounded-2xl border border-indigo-900/30 overflow-hidden">
              {/* Top Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-indigo-900/30 bg-black/40">
                <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-indigo-950/50 rounded-lg border border-indigo-800/30">
                  <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                  <span className="text-xs sm:text-sm text-indigo-200/60">
                    New Post
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm text-indigo-300/40">
                    {charCount} chars
                  </span>

                  {/* Mobile AI trigger button */}
                  <button
                    onClick={() => setShowAiDrawer(true)}
                    className="lg:hidden group p-2 bg-linear-to-tl from-pink-600/60 to-indigo-600/60 border border-indigo-500/30 rounded-lg hover:from-pink-600/80 hover:to-indigo-600/80 ease-in-out duration-300 cursor-pointer"
                    title="Open AI Assistant"
                  >
                    <Sparkles className="w-4 h-4 text-white/80 group-hover:text-white/95" />
                  </button>

                  {/* Desktop sparkles — decorative */}
                  <button className="hidden lg:block group p-2 bg-linear-to-tl from-pink-600/60 to-indigo-600/60 border border-indigo-500/30 rounded-lg hover:from-pink-600/80 hover:to-indigo-600/80 ease-in-out duration-300 cursor-pointer">
                    <Sparkles className="w-5 h-5 text-white/80 group-hover:text-white/95" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
                {/* Left — Editor */}
                <div className="relative w-full lg:border-r border-indigo-900/30">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-indigo-900/30 bg-indigo-950/30">
                    <div className="relative flex items-center gap-0.5 sm:gap-1">
                      <Button
                        onClick={insertBold}
                        title="Bold"
                        className={toolbarBtnClass}
                      >
                        <Bold className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        onClick={insertItalic}
                        title="Italic"
                        className={toolbarBtnClass}
                      >
                        <Italic className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        onClick={insertHashtag}
                        title="Hashtag"
                        className={toolbarBtnClass}
                      >
                        <Hash className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        onClick={insertMention}
                        title="Mention"
                        className={toolbarBtnClass}
                      >
                        <AtSign className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        onClick={() => setShowEmojiPicker((v) => !v)}
                        title="Emoji"
                        className={toolbarBtnClass}
                      >
                        <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>

                      {/* Emoji Picker */}
                      {showEmojiPicker && (
                        <motion.div
                          ref={emojiRef}
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ y: 8, scale: 0.95, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-12 left-0 z-50 p-3 bg-indigo-950 border border-indigo-800/40 rounded-2xl shadow-2xl shadow-indigo-950/50"
                        >
                          <div className="flex items-center justify-between mb-2 px-1">
                            <span className="text-xs text-indigo-300/40">
                              Emojis
                            </span>
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

                    <div className="flex items-center gap-1.5 sm:gap-3">
                      <Button
                        onClick={clearContent}
                        className="px-3 sm:px-4 py-2 bg-linear-to-tl to-indigo-900 text-xs sm:text-sm text-white/70 hover:text-white/90 transition-colors cursor-pointer"
                      >
                        Clear
                      </Button>
                      <Button
                        onClick={handlePost}
                        className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-linear-to-tl from-indigo-900 via-indigo-900 to-indigo-800 hover:to-indigo-700 hover:via-indigo-700 text-white rounded-lg text-xs sm:text-sm font-medium ease-in-out duration-200 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Post
                      </Button>
                    </div>
                  </div>

                  {/* Editor Area */}
                  <div className="p-3 sm:p-4 min-h-80 lg:h-[calc(88vh-112px)] bg-indigo-500/20 overflow-y-auto">
                    <Tiptap
                      ref={tiptapRef}
                      onChange={(html) => setContent(html)}
                    />
                  </div>
                </div>

                {/* Right — AI Panel (desktop only) */}
                <div className="hidden lg:block h-[calc(88vh-56px)] bg-indigo-950/20 overflow-hidden">
                  <AiRequest />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Copy, Terminal, Check } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
) as React.ComponentType<any>;
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type TerminalCardProps = {
  command: string | string[];
  language?: string;
  className?: string;
};

const TerminalCard: React.FC<TerminalCardProps> = ({ command, language = "tsx", className }) => {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);

  const commands = Array.isArray(command) 
    ? command 
    : command.split("\n").filter(line => line.trim() !== "");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullText = commands[currentCommandIndex];

    if (!isDeleting && displayedText.length < currentFullText.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
      }, 60);
    } else if (!isDeleting && displayedText.length === currentFullText.length) {
      // Pause after typing
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
      }, 30);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next command
      setIsDeleting(false);
      setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentCommandIndex, commands]);

  // Copy handler
  const handleCopy = () => {
    const fullCommand = Array.isArray(command) ? command.join("\n") : command;
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        "border rounded-lg backdrop-blur-md min-w-[300px] max-w-full",
        "bg-white/70 border-gray-300 text-black",
        "dark:bg-white/10 dark:border-gray-400/30 dark:text-white",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-[#202425] rounded-t-lg text-sm font-semibold text-gray-700 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-500" />
          Terminal
        </div>
        <button
          className="p-1 border rounded transition hover:border-gray-600 dark:hover:border-white text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Content with Syntax Highlighting */}
      <div className="rounded-b-lg text-sm font-mono p-3 bg-black text-white dark:bg-black min-h-[60px] flex items-center overflow-auto">
        <motion.pre className="whitespace-pre-wrap">
          <span className="text-green-500 mr-2">$</span>
          {displayedText}
          <motion.span
            className="inline-block w-2 h-4 bg-white ml-1 align-middle"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.pre>
      </div>
    </div>
  );
};

export default TerminalCard;

"use server";

import { whatsappGateTasks, TaskLanguage } from "../data/whatsappGate";

export async function getCommunityInvite(
  state: string,
  taskKey?: TaskLanguage,
  answers?: Record<string, string>
) {
  // 1. Initial State Check
  if (state !== "Kerala") {
    // If not in Kerala, return Telegram
    return {
      type: "telegram",
      link: process.env.TELEGRAM_INVITE_LINK || "",
    };
  }

  // 2. Validate Task (WhatsApp only)
  if (!taskKey || !answers) {
    return { error: "Missing verification data." };
  }

  const task = whatsappGateTasks[taskKey];
  if (!task) return { error: "Invalid task." };

  // 3. Server-side Score Calculation (Safety First)
  let correctCount = 0;
  task.questions.forEach((q) => {
    if (answers[q.id] === q.answer) {
      correctCount++;
    }
  });

  if (correctCount === task.questions.length) {
    // Perfect score! Reveal WhatsApp Link
    return {
      type: "whatsapp",
      link: process.env.WHATSAPP_INVITE_LINK || "",
    };
  }

  return { 
    error: "Verification failed. Please try again.",
    score: correctCount
  };
}

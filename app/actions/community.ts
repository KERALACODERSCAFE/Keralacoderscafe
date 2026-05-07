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

  const submittedAnswers = Object.entries(answers);
  const minimumAnswers = Math.min(3, task.questions.length);

  if (submittedAnswers.length < minimumAnswers) {
    return { error: "Please answer all questions." };
  }

  const questionsById = new Map(task.questions.map((q) => [q.id, q.answer]));

  // 3. Server-side Score Calculation (Safety First)
  let correctCount = 0;
  submittedAnswers.forEach(([questionId, answer]) => {
    if (questionsById.get(questionId) === answer) {
      correctCount++;
    }
  });

  if (correctCount === submittedAnswers.length) {
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageCircle, ChevronRight, XCircle, Loader2, Send } from "lucide-react";
import { whatsappGateTaskList, majorStates } from "../data/whatsappGate";
import type { LanguageQuestion, LanguageTask } from "../data/whatsappGate";
import { getCommunityInvite } from "../actions/community";

interface JoinGateProps {
  onStatusChange?: (isSubmitted: boolean) => void;
}

const QUESTIONS_PER_ATTEMPT = 3;

function shuffleQuestions(questions: LanguageQuestion[]) {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function pickRandomQuestions(
  questions: LanguageQuestion[],
  previousQuestions: LanguageQuestion[] = []
) {
  const previousIds = new Set(previousQuestions.map((question) => question.id));
  const freshQuestions = questions.filter((question) => !previousIds.has(question.id));
  const candidateQuestions =
    freshQuestions.length >= QUESTIONS_PER_ATTEMPT ? freshQuestions : questions;

  return shuffleQuestions(candidateQuestions).slice(
    0,
    Math.min(QUESTIONS_PER_ATTEMPT, candidateQuestions.length)
  );
}

export default function JoinGate({ onStatusChange }: JoinGateProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<LanguageTask | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<LanguageQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resultPopup, setResultPopup] = useState<"success" | "failure" | null>(null);

  const startTask = (task: LanguageTask) => {
    setSelectedTask(task);
    setActiveQuestions(pickRandomQuestions(task.questions));
    setAnswers({});
    setError(null);
  };

  const handleOptionSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleTelegramJoin = async (stateName: string) => {
    setIsSubmitting(true);
    const res = await getCommunityInvite(stateName);
    if ("link" in res) {
      setInviteLink(res.link || null);
      onStatusChange?.(true);
    }
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!selectedTask || !selectedState) return;

    setIsSubmitting(true);
    const res = await getCommunityInvite(selectedState, selectedTask.key, answers);

    if ("link" in res) {
      setInviteLink(res.link || null);
      onStatusChange?.(true);
      setResultPopup("success");
    } else if ("error" in res) {
      setError(res.error || "Verification failed. Try this new set.");
      setAnswers({});
      setActiveQuestions(pickRandomQuestions(selectedTask.questions, activeQuestions));
      setResultPopup("failure");
    }
    setIsSubmitting(false);
  };

  const handleTryAgain = () => {
    setResultPopup(null);
    setError(null);
  };

  const reset = () => {
    setSelectedState(null);
    setSelectedTask(null);
    setActiveQuestions([]);
    setAnswers({});
    onStatusChange?.(false);
    setInviteLink(null);
    setError(null);
    setResultPopup(null);
  };

  // ─── STEP 0: Select State ───
  if (!selectedState) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 font-black uppercase tracking-tight hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back Home
        </Link>

        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black uppercase tracking-tight text-black leading-none">
            Where are you from?
          </h1>
          <p className="mt-4 text-lg font-bold text-black/70">
            We operate location-based chapters to keep the community local and relevant.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {majorStates.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className="group border-3 border-black bg-white p-6 text-left transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-kcc-gold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <span className="text-xl font-black uppercase text-black group-hover:underline">
                  {state}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 0.5: Global Community (Telegram) ───
  if (selectedState !== "Kerala") {
    return (
      <div className="mx-auto max-w-xl px-6 py-20">
        <div className="border-4 border-black bg-kcc-green p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              <Send className="h-10 w-10 text-black translate-x-[-2px]" />
            </div>
            <h2 className="text-3xl font-black uppercase text-black leading-tight">Join our global community</h2>
            <p className="mt-4 text-lg font-bold text-black/80">
              Our WhatsApp groups are currently exclusive to Kerala residents. However, everyone is welcome in our global Telegram!
            </p>

            {inviteLink ? (
              <Link
                href={inviteLink}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-flex h-16 w-full items-center justify-center gap-3 border-3 border-black bg-black px-8 text-lg font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(0,136,204,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,136,204,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Send className="h-5 w-5" />
                Join on Telegram
              </Link>
            ) : (
              <button
                onClick={() => handleTelegramJoin(selectedState)}
                disabled={isSubmitting}
                className="mt-8 inline-flex h-16 w-full items-center justify-center gap-3 border-3 border-black bg-black px-8 text-lg font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(0,136,204,1)] transition-all enabled:hover:translate-x-[-2px] enabled:hover:translate-y-[-2px]"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send className="h-5 w-5" />}
                Get Telegram Link
              </button>
            )}

            <button onClick={reset} className="mt-6 text-sm font-black uppercase tracking-wider text-black/60 hover:text-black hover:underline">
              Changed my mind (Go back)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 1: Select Language ───
  if (!selectedTask) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <button onClick={reset} className="mb-8 inline-flex items-center gap-2 font-black uppercase tracking-tight hover:underline">
          <ArrowLeft className="h-4 w-4" /> Change Location
        </button>

        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black uppercase tracking-tight text-black leading-none">
            Welcome, Keralite!
          </h1>
          <p className="mt-4 text-lg font-bold text-black/70">
            Pick your language to solve a small challenge and unlock our Kerala-only WhatsApp group.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {whatsappGateTaskList.map((task) => (
              <button
                key={task.key}
                onClick={() => startTask(task)}
                className="group flex flex-col border-3 border-black bg-white p-5 text-left transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-kcc-gold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <span className="mb-2 inline-block self-start border-2 border-black bg-kcc-green px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-widest text-black">
                  {task.badge}
                </span>
                <span className="text-xl font-black uppercase text-black group-hover:underline">
                  {task.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 2: Answer Questions ───
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <button
        onClick={() => {
          setSelectedTask(null);
          setActiveQuestions([]);
          setAnswers({});
          setError(null);
        }}
        className="mb-8 inline-flex items-center gap-2 font-black uppercase tracking-tight hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Change Language
      </button>

      <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-8 border-b-2 border-black pb-6">
          <span className="inline-block border-2 border-black bg-kcc-accent px-3 py-1 text-xs font-black uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {selectedTask.label} Challenge
          </span>
          <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-black leading-none">
            {selectedTask.title}
          </h1>
          <p className="mt-3 font-bold text-black/60 italic">
            Hint: {selectedTask.hint}
          </p>
          {error && (
            <p className="mt-4 border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-black uppercase text-red-700">
              Here are three new random questions.
            </p>
          )}
        </div>

        <div className="space-y-10">
          {activeQuestions.map((q, idx) => (
            <div key={q.id}>
              <h3 className="flex gap-3 text-xl font-black text-black">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black bg-kcc-gold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {idx + 1}
                </span>
                {q.prompt}
              </h3>
              <div className="mt-5 grid gap-3">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(q.id, option)}
                    className={`border-3 p-4 text-left font-bold transition-all ${answers[q.id] === option
                        ? "border-black bg-kcc-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                        : "border-black/10 bg-white hover:border-black/30"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < activeQuestions.length || isSubmitting}
          className="mt-12 inline-flex h-16 w-full items-center justify-center gap-3 border-3 border-black bg-black px-8 text-xl font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all enabled:shadow-[6px_6px_0px_0px_rgba(0,229,255,1)] enabled:hover:translate-x-[-2px] enabled:hover:translate-y-[-2px] enabled:hover:shadow-[8px_8px_0px_0px_rgba(0,229,255,1)] disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Check Answers"} <ChevronRight className="h-5 w-5 stroke-[4]" />
        </button>
      </div>

      {resultPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5">
          <div
            className={`w-full max-w-xl border-4 border-black p-8 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] ${
              resultPopup === "success" ? "bg-kcc-green" : "bg-white"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-result-title"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              {resultPopup === "success" ? (
                <CheckCircle2 className="h-10 w-10 text-black" />
              ) : (
                <XCircle className="h-10 w-10 text-red-500" />
              )}
            </div>

            {resultPopup === "success" ? (
              <>
                <h2 id="join-result-title" className="text-3xl font-black uppercase text-black leading-tight">
                  Verification Successful!
                </h2>
                <p className="mt-4 text-lg font-bold text-black/80">
                  You&apos;re in! Join our verified Kerala WhatsApp community below.
                </p>

                <Link
                  href={inviteLink || "#"}
                  target="_blank"
                  rel="noopener"
                  className="mt-8 inline-flex h-16 w-full items-center justify-center gap-3 border-3 border-black bg-black px-8 text-lg font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(37,211,102,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(37,211,102,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <MessageCircle className="h-5 w-5 stroke-[3]" />
                  Join (WhatsApp)
                </Link>
              </>
            ) : (
              <>
                <h2 id="join-result-title" className="text-3xl font-black uppercase text-black">
                  Not quite right...
                </h2>
                <p className="mt-4 text-lg font-bold text-black/80">
                  {error || "Verification failed. Please try again to unlock the link!"}
                </p>

                <button
                  onClick={handleTryAgain}
                  className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 border-3 border-black bg-kcc-gold font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

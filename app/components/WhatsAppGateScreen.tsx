"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  LaptopMinimalCheck,
  LockKeyhole,
  RotateCcw,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { getWhatsAppInviteUrl } from "../lib/site-links";
import {
  defaultTaskLanguage,
  type LanguageQuestion,
  type LanguageTask,
  type TaskLanguage,
  whatsappGateTaskList,
  whatsappGateTasks,
} from "../lib/whatsapp-gate-tasks";

type AnswerMap = Record<string, string>;
type ValidationState = "idle" | "incorrect" | "unanswered" | "correct";
type ValidationMap = Record<string, ValidationState>;

function createAnswerState(task: LanguageTask): AnswerMap {
  return Object.fromEntries(task.questions.map((question) => [question.id, ""]));
}

function createValidationState(task: LanguageTask): ValidationMap {
  return Object.fromEntries(
    task.questions.map((question) => [question.id, "idle"]),
  );
}

function QuestionCard({
  question,
  index,
  answer,
  validation,
  onSelect,
  compact = false,
}: {
  question: LanguageQuestion;
  index: number;
  answer: string;
  validation: ValidationState;
  onSelect: (option: string) => void;
  compact?: boolean;
}) {
  const hasError = validation === "incorrect" || validation === "unanswered";
  const isCorrect = validation === "correct";

  return (
    <article
      className={`border ${
        hasError
          ? "border-red-500/35 bg-red-500/[0.06]"
          : isCorrect
            ? "border-emerald-500/24 bg-emerald-500/[0.04]"
            : "border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)]"
      } ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`grid h-8 w-8 shrink-0 place-items-center border bg-[color:var(--ui-surface)] text-[0.72rem] font-semibold ${
            hasError
              ? "border-red-500/35 text-red-400"
              : isCorrect
                ? "border-emerald-500/24 text-emerald-400"
                : "border-[color:var(--ui-border-soft)] text-[color:var(--ui-page-text-soft)]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`font-semibold tracking-[-0.03em] text-[color:var(--ui-page-text)] ${
              compact ? "text-base leading-7" : "text-lg leading-8"
            }`}
          >
            {question.prompt}
          </h3>

          <div className="mt-4 grid gap-3">
            {question.options.map((option, optionIndex) => {
              const selected = answer === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelect(option)}
                  className={`flex w-full items-start gap-3 border px-4 py-3 text-left text-sm transition-all duration-200 ${
                    selected
                      ? "border-[color:var(--ui-page-text)] bg-[color:var(--ui-page-text)] text-[color:var(--ui-selection-text)]"
                      : hasError
                        ? "border-red-500/18 bg-[color:var(--ui-surface)] text-[color:var(--ui-page-text-muted)] hover:border-red-500/28 hover:text-[color:var(--ui-page-text)]"
                        : "border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] text-[color:var(--ui-page-text-muted)] hover:border-[color:var(--ui-border-strong)] hover:text-[color:var(--ui-page-text)]"
                  }`}
                >
                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border text-[0.72rem] font-semibold ${
                      selected
                        ? "border-[color:var(--ui-selection-text)]/15 bg-[color:var(--ui-selection-text)]/10"
                        : "border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)]"
                    }`}
                  >
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span className="leading-6">{option}</span>
                </button>
              );
            })}
          </div>

          {validation === "incorrect" ? (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              This answer is not correct yet.
            </div>
          ) : null}

          {validation === "unanswered" ? (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              Choose one answer before submitting.
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function WhatsAppGateScreen() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<TaskLanguage>(defaultTaskLanguage);
  const [answers, setAnswers] = useState<AnswerMap>(() =>
    createAnswerState(whatsappGateTasks[defaultTaskLanguage]),
  );
  const [validation, setValidation] = useState<ValidationMap>(() =>
    createValidationState(whatsappGateTasks[defaultTaskLanguage]),
  );
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [countdown, setCountdown] = useState(3);
  const activeTask = whatsappGateTasks[selectedLanguage];
  const answeredCount = activeTask.questions.filter(
    (question) => answers[question.id],
  ).length;
  const incorrectCount = activeTask.questions.filter(
    (question) =>
      validation[question.id] === "incorrect" ||
      validation[question.id] === "unanswered",
  ).length;

  useEffect(() => {
    if (status !== "success") {
      return;
    }

    const tick = window.setInterval(() => {
      setCountdown((current) => (current > 1 ? current - 1 : current));
    }, 1000);

    const redirect = window.setTimeout(() => {
      window.location.assign(getWhatsAppInviteUrl());
    }, 2200);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(redirect);
    };
  }, [status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextValidation = Object.fromEntries(
      activeTask.questions.map((question) => {
        const selectedAnswer = answers[question.id];

        if (!selectedAnswer) {
          return [question.id, "unanswered" satisfies ValidationState];
        }

        if (selectedAnswer === question.answer) {
          return [question.id, "correct" satisfies ValidationState];
        }

        return [question.id, "incorrect" satisfies ValidationState];
      }),
    ) as ValidationMap;

    setValidation(nextValidation);

    const allCorrect = activeTask.questions.every(
      (question) => nextValidation[question.id] === "correct",
    );

    if (allCorrect) {
      setCountdown(3);
      setStatus("success");
      return;
    }

    setStatus("error");
  }

  function handleLanguageChange(language: TaskLanguage) {
    const nextTask = whatsappGateTasks[language];
    setSelectedLanguage(language);
    setAnswers(createAnswerState(nextTask));
    setValidation(createValidationState(nextTask));
    setCountdown(3);
    setStatus("idle");
  }

  function handleAnswerChange(questionId: string, option: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: option,
    }));
    setValidation((current) => ({
      ...current,
      [questionId]: "idle",
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  }

  function resetCurrentTask() {
    setAnswers(createAnswerState(activeTask));
    setValidation(createValidationState(activeTask));
    setCountdown(3);
    setStatus("idle");
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-kcc-bg text-kcc-text">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--ui-orb),transparent_28%),radial-gradient(circle_at_left,var(--ui-hero-glow),transparent_24%),linear-gradient(180deg,var(--color-kcc-bg)_0%,var(--color-kcc-surface-elevated)_48%,var(--color-kcc-bg)_100%)]" />
      <div className="noise-overlay opacity-90" />
      <div className="absolute left-[-8rem] top-10 h-80 w-80 rounded-full bg-[color:var(--ui-orb)] blur-[140px]" />
      <div className="absolute right-[-10rem] top-[18%] h-[28rem] w-[28rem] rounded-full bg-[color:var(--ui-hero-glow)] blur-[180px]" />
      <div className="absolute bottom-[-8rem] left-[34%] h-72 w-72 rounded-full bg-[color:var(--ui-orb)] blur-[150px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-5 pb-10 pt-6 sm:px-6 md:px-10 md:pt-8 lg:px-12">
        <div className="flex items-start gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] px-4 py-2 text-sm font-medium text-[color:var(--ui-page-text)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-8 md:py-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.section
                key="success"
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="mx-auto max-w-[30rem] md:hidden">
                  <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-5 shadow-[0_24px_72px_rgba(0,0,0,0.22)]">
                    <div className="grid h-14 w-14 place-items-center border border-emerald-500/24 bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>

                    <h1 className="mt-5 text-[2.4rem] font-semibold leading-[0.94] tracking-[-0.06em] text-[color:var(--ui-page-text)]">
                      Questions done.
                    </h1>
                    <p className="mt-4 text-base leading-7 text-[color:var(--ui-page-text-muted)]">
                      You cleared the {activeTask.label} round. The invite opens
                      automatically in {countdown}s.
                    </p>

                    <div className="mt-6 border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] p-4">
                      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--ui-page-text-soft)]">
                        Completed
                      </div>
                      <div className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[color:var(--ui-page-text)]">
                        {activeTask.title}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      <button
                        type="button"
                        onClick={() => window.location.assign(getWhatsAppInviteUrl())}
                        className="inline-flex h-13 items-center justify-center gap-2 bg-[color:var(--ui-button-primary-bg)] px-5 py-3 text-sm font-semibold text-[color:var(--ui-button-primary-text)]"
                      >
                        <LaptopMinimalCheck className="h-4 w-4" />
                        Join WhatsApp now
                      </button>

                      <button
                        type="button"
                        onClick={resetCurrentTask}
                        className="inline-flex h-13 items-center justify-center gap-2 border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] px-5 py-3 text-sm font-semibold text-[color:var(--ui-page-text)]"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Try another language
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden md:grid w-full max-w-[1220px] items-center gap-10 md:grid-cols-[minmax(0,0.94fr)_minmax(420px,0.9fr)]">
                  <div className="max-w-[640px]">
                    <h1 className="text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-[color:var(--ui-page-text)]">
                      Nice work,
                      <span className="ml-4 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.03em] text-[color:var(--ui-page-text)]">
                        you&apos;re in.
                      </span>
                    </h1>

                    <p className="mt-6 max-w-[36rem] text-lg leading-8 text-[color:var(--ui-page-text-muted)]">
                      Your invite is unlocked. It will open automatically in{" "}
                      {countdown}s, or you can continue right away.
                    </p>
                  </div>

                  <div className="relative overflow-hidden border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-6 shadow-[0_36px_120px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-8">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-400/12 blur-[90px]" />
                    <div className="relative">
                      <div className="grid h-16 w-16 place-items-center border border-emerald-500/24 bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>

                      <div className="mt-8 border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] p-5">
                        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--ui-page-text-soft)]">
                          Question set cleared
                        </div>
                        <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ui-page-text)]">
                          {activeTask.title}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-[color:var(--ui-page-text-muted)]">
                          Completed in {activeTask.label}. The WhatsApp invite is
                          ready.
                        </p>
                      </div>

                      <div className="mt-8 flex flex-col gap-4">
                        <button
                          type="button"
                          onClick={() => window.location.assign(getWhatsAppInviteUrl())}
                          className="inline-flex h-14 items-center justify-center gap-2 bg-[color:var(--ui-button-primary-bg)] px-6 text-sm font-semibold text-[color:var(--ui-button-primary-text)] transition-transform duration-300 hover:-translate-y-0.5"
                        >
                          <LaptopMinimalCheck className="h-4 w-4" />
                          Join WhatsApp now
                        </button>

                        <button
                          type="button"
                          onClick={resetCurrentTask}
                          className="inline-flex h-14 items-center justify-center gap-2 border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] px-6 text-sm font-semibold text-[color:var(--ui-page-text)] transition-transform duration-300 hover:-translate-y-0.5"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Try another language
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            ) : (
              <motion.section
                key="task"
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="mx-auto max-w-[34rem] space-y-5 md:hidden">
                  <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-5 shadow-[0_24px_72px_rgba(0,0,0,0.18)]">
                    <div className="grid h-12 w-12 place-items-center border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] text-[color:var(--ui-page-text)]">
                      <LockKeyhole className="h-5 w-5" />
                    </div>

                    <h1 className="mt-5 text-[2.35rem] font-semibold leading-[0.94] tracking-[-0.06em] text-[color:var(--ui-page-text)]">
                      Pick a language,
                      <span className="ml-3 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.03em] text-[color:var(--ui-page-text)]">
                        answer a few.
                      </span>
                    </h1>

                    <p className="mt-4 text-base leading-7 text-[color:var(--ui-page-text-muted)]">
                      Choose what you know best, answer a few quick questions,
                      and we&apos;ll unlock the invite in the same flow.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {whatsappGateTaskList.map((task) => {
                      const active = task.key === selectedLanguage;

                      return (
                        <button
                          key={task.key}
                          type="button"
                          onClick={() => handleLanguageChange(task.key)}
                          className={`border px-4 py-3 text-left transition-all duration-200 ${
                            active
                              ? "border-[color:var(--ui-page-text)] bg-[color:var(--ui-page-text)] text-[color:var(--ui-selection-text)]"
                              : "border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] text-[color:var(--ui-page-text)]"
                          }`}
                        >
                          <div className="text-sm font-semibold">{task.label}</div>
                          <div className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] opacity-70">
                            {task.badge}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-5">
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--ui-page-text-soft)]">
                      Current round
                    </div>
                    <h2 className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em] text-[color:var(--ui-page-text)]">
                      {activeTask.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--ui-page-text-muted)]">
                      {activeTask.goal}
                    </p>
                    <div className="mt-4 border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] px-4 py-3 text-sm leading-7 text-[color:var(--ui-page-text-muted)]">
                      {activeTask.hint}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-4">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-[color:var(--ui-page-text-muted)]">
                          Progress
                        </span>
                        <span className="font-medium text-[color:var(--ui-page-text)]">
                          {answeredCount}/{activeTask.questions.length}
                        </span>
                      </div>
                      {status === "error" ? (
                        <div className="mt-2 text-sm text-red-400">
                          {incorrectCount} question
                          {incorrectCount === 1 ? "" : "s"} need attention.
                        </div>
                      ) : null}
                    </div>

                    {activeTask.questions.map((question, index) => (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                        answer={answers[question.id] ?? ""}
                        validation={validation[question.id] ?? "idle"}
                        onSelect={(option) => handleAnswerChange(question.id, option)}
                        compact
                      />
                    ))}

                    <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-4">
                      <div className="text-sm leading-7 text-[color:var(--ui-page-text-muted)]">
                        {answeredCount} of {activeTask.questions.length} answers
                        selected
                      </div>

                      <button
                        type="submit"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[color:var(--ui-button-primary-bg)] px-5 py-3 text-sm font-semibold text-[color:var(--ui-button-primary-text)]"
                      >
                        Validate answers
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>

                    {status === "error" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] px-4 py-3 text-sm leading-7 text-[color:var(--ui-page-text-muted)]"
                      >
                        A few answers still need fixing. Check the basics and
                        try again.
                      </motion.div>
                    ) : null}
                  </form>
                </div>

                <div className="hidden md:grid w-full items-start gap-10 md:grid-cols-1 lg:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)]">
                  <div className="lg:sticky lg:top-28">
                    <div className="grid h-14 w-14 place-items-center border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] text-[color:var(--ui-page-text)]">
                      <LockKeyhole className="h-6 w-6" />
                    </div>

                    <h1 className="mt-6 max-w-[12ch] text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-[color:var(--ui-page-text)]">
                      Pick your language,
                      <span className="ml-4 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.03em] text-[color:var(--ui-page-text)]">
                        answer a few.
                      </span>
                    </h1>

                    <p className="mt-6 max-w-[34rem] text-lg leading-8 text-[color:var(--ui-page-text-muted)]">
                      Choose the language you are most comfortable with, answer a
                      few quick questions, and we&apos;ll unlock the invite in the
                      same flow.
                    </p>

                    <div className="mt-10">
                      <div className="flex flex-wrap gap-3">
                        {whatsappGateTaskList.map((task) => {
                          const active = task.key === selectedLanguage;

                          return (
                            <button
                              key={task.key}
                              type="button"
                              onClick={() => handleLanguageChange(task.key)}
                              className={`inline-flex items-center gap-2 border px-4 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                                active
                                  ? "border-[color:var(--ui-page-text)] bg-[color:var(--ui-page-text)] text-[color:var(--ui-selection-text)] shadow-[0_16px_42px_rgba(0,0,0,0.14)]"
                                  : "border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] text-[color:var(--ui-page-text)] hover:border-[color:var(--ui-border-strong)] hover:bg-[color:var(--ui-surface-hover)]"
                              }`}
                            >
                              <span>{task.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-10 overflow-hidden border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                      <div className="border-b border-[color:var(--ui-border-soft)] px-5 py-4">
                        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--ui-page-text-soft)]">
                          {activeTask.badge}
                        </div>
                        <h2 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.04em] text-[color:var(--ui-page-text)]">
                          {activeTask.title}
                        </h2>
                      </div>

                      <div className="space-y-4 px-5 py-5">
                        <p className="text-base leading-8 text-[color:var(--ui-page-text-muted)]">
                          {activeTask.goal}
                        </p>

                        <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] px-4 py-3 text-sm leading-7 text-[color:var(--ui-page-text-muted)]">
                          {activeTask.hint}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={
                      status === "error"
                        ? { x: [0, -8, 8, -5, 5, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.32 }}
                    className="overflow-hidden border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] shadow-[0_36px_120px_rgba(0,0,0,0.22)] backdrop-blur-xl"
                  >
                    <div className="border-b border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] px-5 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                          </div>

                          <div>
                        <div className="text-sm font-semibold tracking-[-0.02em] text-[color:var(--ui-page-text)]">
                          Question set
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--ui-page-text-soft)]">
                              {answeredCount}/{activeTask.questions.length} answered
                        </div>
                      </div>
                    </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-5 md:p-6">
                      <div className="space-y-4">
                        {activeTask.questions.map((question, index) => (
                          <QuestionCard
                            key={question.id}
                            question={question}
                            index={index}
                            answer={answers[question.id] ?? ""}
                            validation={validation[question.id] ?? "idle"}
                            onSelect={(option) =>
                              handleAnswerChange(question.id, option)
                            }
                          />
                        ))}
                      </div>

                      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-[30rem] text-sm leading-7 text-[color:var(--ui-page-text-muted)]">
                          Answer all questions correctly to unlock the invite.
                          {status === "error" ? (
                            <span className="mt-1 block text-red-400">
                              {incorrectCount} question
                              {incorrectCount === 1 ? "" : "s"} still need fixing.
                            </span>
                          ) : null}
                        </div>

                        <button
                          type="submit"
                          className="inline-flex h-12 items-center justify-center gap-2 bg-[color:var(--ui-button-primary-bg)] px-5 text-sm font-semibold text-[color:var(--ui-button-primary-text)] transition-transform duration-300 hover:-translate-y-0.5"
                        >
                          Validate answers
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>

                      {status === "error" ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] px-4 py-3 text-sm leading-7 text-[color:var(--ui-page-text-muted)]"
                        >
                          A few answers still need fixing. Check the basics and
                          try again.
                        </motion.div>
                      ) : null}
                    </form>
                  </motion.div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

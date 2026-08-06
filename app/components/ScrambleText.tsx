"use client";

import React, { useEffect, useRef } from "react";

class TextScramble {
  el: HTMLElement;
  chars: string;
  updateBind: () => void;
  queue: any[];
  frameRequest: number;
  frame: number;
  resolve: (value?: unknown) => void;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.updateBind = this.update.bind(this);
    this.queue = [];
    this.frameRequest = 0;
    this.frame = 0;
    this.resolve = () => {};
  }
  
  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.updateBind();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="opacity-50">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.updateBind);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

interface ScrambleTextProps {
  phrases: string[];
  className?: string;
  delay?: number;
}

export default function ScrambleText({ phrases, className = "", delay = 2000 }: ScrambleTextProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    
    const fx = new TextScramble(elRef.current);
    let counter = 0;
    let timeoutId: NodeJS.Timeout;
    let isActive = true;

    const next = () => {
      if (!isActive) return;
      fx.setText(phrases[counter]).then(() => {
        if (!isActive) return;
        timeoutId = setTimeout(next, delay);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
      cancelAnimationFrame(fx.frameRequest);
    };
  }, [phrases, delay]);

  return <div ref={elRef} className={className}></div>;
}

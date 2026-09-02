"use client";

import React, { useEffect, useRef } from "react";

const getPointID = (j: number, i: number, gridH: number) => j + i * gridH;

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

class Vec2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  zero() {
    this.x = 0;
    this.y = 0;
  }
  reset(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  add(v: Vec2) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  subtractNew(v: Vec2) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
  get lengthSquared() {
    return this.x ** 2 + this.y ** 2;
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
}

class Particle {
  pos: Vec2;
  oldPos: Vec2;
  velocity: Vec2;
  acceleration: Vec2;
  pinned: boolean;
  originalPinnedState: boolean;
  id: number;
  char: string;
  gravityVec: Vec2;
  downConstraint?: Constraint;

  constructor({ x, y, pinned, id, char }: { x: number; y: number; pinned: boolean; id: number; char: string }) {
    this.pos = new Vec2(x, y);
    this.oldPos = new Vec2(x, y);
    this.velocity = new Vec2();
    this.acceleration = new Vec2();
    this.pinned = pinned;
    this.originalPinnedState = pinned;
    this.id = id;
    this.char = char;
    this.gravityVec = new Vec2();
  }

  contain(CONFIG: any) {
    if (this.pinned) return;
    const radius = 5;

    if (this.pos.x < radius) {
      this.pos.x = radius;
      this.oldPos.x = this.pos.x + Math.abs(this.oldPos.x - this.pos.x) * 0.8;
    } else if (this.pos.x > CONFIG.awidth - radius) {
      this.pos.x = CONFIG.awidth - radius;
      this.oldPos.x = this.pos.x - Math.abs(this.oldPos.x - this.pos.x) * 0.8;
    }
    if (this.pos.y < radius) {
      this.pos.y = radius;
      this.oldPos.y = this.pos.y + Math.abs(this.oldPos.y - this.pos.y) * 0.8;
    } else if (this.pos.y > CONFIG.aheight - radius) {
      this.pos.y = CONFIG.aheight - radius;
      this.oldPos.y = this.pos.y - Math.abs(this.oldPos.y - this.pos.y) * 0.8;
    }
  }

  update(delta: number, CONFIG: any) {
    if (this.pinned) {
      this.acceleration.zero();
      return;
    }

    this.velocity.reset(
      (this.pos.x - this.oldPos.x) * CONFIG.damping,
      (this.pos.y - this.oldPos.y) * CONFIG.damping
    );

    this.oldPos.reset(this.pos.x, this.pos.y);

    const dd = delta ** 2;
    const clampedDd = Math.max(dd, 1);
    this.gravityVec.reset(0, CONFIG.gravity / clampedDd);

    this.applyForce(this.gravityVec);

    this.pos.x += this.velocity.x + this.acceleration.x * clampedDd;
    this.pos.y += this.velocity.y + this.acceleration.y * clampedDd;

    this.acceleration.zero();
  }

  applyForce(v: Vec2) {
    this.acceleration.add(v);
  }
}

class Constraint {
  p1: Particle;
  p2: Particle;
  length: number;
  id: number;
  isSpacer: boolean;
  minLength: number;
  maxLength: number;

  constructor({ p1, p2, length, id, compressFactor, stretchFactor, isSpacer }: any) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = length;
    this.id = id;
    this.isSpacer = isSpacer || false;
    this.minLength = length * compressFactor;
    this.maxLength = length * stretchFactor;
  }

  solve() {
    const dx = this.p2.pos.x - this.p1.pos.x;
    const dy = this.p2.pos.y - this.p1.pos.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) return;

    let targetLength = this.length;
    if (distance < this.minLength) targetLength = this.minLength;
    else if (distance > this.maxLength) targetLength = this.maxLength;
    else return;

    const difference = targetLength - distance;
    const percent = difference / distance / 2;

    const offsetX = dx * percent;
    const offsetY = dy * percent;

    if (!this.p1.pinned) {
      this.p1.pos.x -= offsetX;
      this.p1.pos.y -= offsetY;
    }
    if (!this.p2.pinned) {
      this.p2.pos.x += offsetX;
      this.p2.pos.y += offsetY;
    }
  }
}

class Input {
  c: HTMLCanvasElement;
  particles: Particle[];
  mousePos: Vec2;
  grabRadius: number;
  grabbedParticle: Particle | null;
  pointerIsDown: boolean;
  pointerUpTimer: any;
  CONFIG: any;
  dpr: number;

  constructor({ c, particles, CONFIG, dpr }: any) {
    this.c = c;
    this.particles = particles;
    this.CONFIG = CONFIG;
    this.dpr = dpr;
    this.mousePos = new Vec2();
    this.grabRadius = 20;
    this.grabbedParticle = null;
    this.pointerIsDown = false;
    this.bind();
  }

  setMouse(e: PointerEvent) {
    const rect = this.c.getBoundingClientRect();
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    const offsetX = (this.c.width / this.dpr - this.CONFIG.awidth) / 2;
    const offsetY = (this.c.height / this.dpr - this.CONFIG.aheight) / 2;
    this.mousePos.x = cssX - offsetX;
    this.mousePos.y = cssY - offsetY;
  }

  pointerdown = (e: PointerEvent) => {
    this.setMouse(e);
    for (const p of this.particles) {
      if (this.mousePos.subtractNew(p.pos).lengthSquared < this.grabRadius ** 2) {
        this.grabbedParticle = p;
        this.grabbedParticle.originalPinnedState = this.grabbedParticle.pinned;
        this.grabbedParticle.pinned = true;
        break;
      }
    }
    if (!this.grabbedParticle) {
      this.pointerIsDown = true;
    }
  };

  pointerup = () => {
    if (this.grabbedParticle) {
      this.grabbedParticle.pinned = this.grabbedParticle.originalPinnedState;
      this.grabbedParticle = null;
    }
    clearTimeout(this.pointerUpTimer);
    this.pointerUpTimer = setTimeout(() => {
      this.pointerIsDown = false;
    }, 1000);
  };

  pointermove = (e: PointerEvent) => {
    this.setMouse(e);
    if (this.grabbedParticle) {
      this.grabbedParticle.pos.reset(this.mousePos.x, this.mousePos.y);
      this.grabbedParticle.oldPos.reset(this.mousePos.x, this.mousePos.y);
    }
    for (const p of this.particles) {
      const diff = this.mousePos.subtractNew(p.pos);
      const ls = diff.lengthSquared;
      if (ls < this.CONFIG.mouseSize) {
        const a = diff.angle - Math.PI;
        const strength = smoothstep(this.CONFIG.mouseSize, -2000, ls) * this.CONFIG.mouseStrength / 300;
        const force = new Vec2(Math.cos(a) * strength, Math.sin(a) * strength);
        p.applyForce(force);
      }
    }
  };

  contextmenu = (e: Event) => {
    e.preventDefault();
  };

  bind() {
    this.c.addEventListener("pointerdown", this.pointerdown);
    window.addEventListener("pointerup", this.pointerup);
    window.addEventListener("pointermove", this.pointermove);
    this.c.addEventListener("contextmenu", this.contextmenu);
  }

  unbind() {
    this.c.removeEventListener("pointerdown", this.pointerdown);
    window.removeEventListener("pointerup", this.pointerup);
    window.removeEventListener("pointermove", this.pointermove);
    this.c.removeEventListener("contextmenu", this.contextmenu);
  }
}

export default function CodeCurtain() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Sample code snippet for the text curtain
    const fullCode = `function sizeCanvas() {
  if (!c) return;
  c.style.width  = window.innerWidth + 'px';
  c.style.height = window.innerHeight + 'px';
  c.width  = Math.round(window.innerWidth  * dpr);
  c.height = Math.round(window.innerHeight * dpr);
}`;

    let w = 450, h = 450;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width > 0) w = rect.width;
      if (rect.height > 0) h = rect.height;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const CONFIG = {
      awidth: w,
      aheight: h,
      gridW: Math.max(20, Math.floor(w / 8)), // Smaller cells for finer text
      gridH: Math.max(20, Math.floor(h / 8)),
      gravity: 0.2,
      damping: 0.99,
      iterationsPerFrame: 5,
      compressFactor: 0.02,
      stretchFactor: 1.1,
      mouseSize: 5000,
      mouseStrength: 4,
      contain: false,
      randomSolve: false,
      cellWidth: 0,
      cellHeight: 0
    };
    CONFIG.cellWidth = CONFIG.awidth / (CONFIG.gridW - 1);
    CONFIG.cellHeight = CONFIG.aheight / (CONFIG.gridH - 1);

    const c = document.createElement("canvas");
    containerRef.current.appendChild(c);
    
    const sizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      c.style.width = '100%';
      c.style.height = '100%';
      c.width = Math.round(rect.width * dpr);
      c.height = Math.round(rect.height * dpr);
    };
    sizeCanvas();
    const resizeObserver = new ResizeObserver(() => sizeCanvas());
    if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
    }

    const ctx = c.getContext("2d");
    if (!ctx) return;

    const charCanvases: Record<string, any> = {};
    const fontSize = Math.max(10, CONFIG.cellHeight * 1.1); // Smaller font size
    const box = Math.ceil(fontSize * 1.5);
    
    for (const ch of new Set(fullCode)) {
      if (ch === " " || ch === "\n") continue;
      const off = document.createElement("canvas");
      off.width = off.height = box * dpr;
      const octx = off.getContext("2d");
      if (!octx) continue;
      octx.scale(dpr, dpr);
      octx.font = `bold ${fontSize}px monospace`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      // Using a light, vivid green that contrasts perfectly with the dark green background
      octx.fillStyle = "#aec58d"; 
      octx.fillText(ch, box / 2, box / 2);
      (off as any).logicalSize = box;
      charCanvases[ch] = off;
    }

    const particles: Particle[] = [];
    const constraints: Constraint[] = [];

    const input = new Input({ c, particles, CONFIG, dpr });

    for (let i = 0; i < CONFIG.gridW; i++) {
      for (let j = 0; j < CONFIG.gridH; j++) {
        let x = i * CONFIG.cellWidth;
        let y = j * CONFIG.cellHeight;

        const id = getPointID(j, i, CONFIG.gridH);
        const pinned = j === 0;

        const charIndex = (i + j * CONFIG.gridW) % fullCode.length;
        const char = fullCode[charIndex] || " ";

        const particle = new Particle({ x, y, pinned, id, char });
        particles.push(particle);
      }
    }

    for (let i = 0; i < CONFIG.gridW; i++) {
      for (let j = 0; j < CONFIG.gridH; j++) {
        const id = getPointID(j, i, CONFIG.gridH);
        const p = particles[id];

        if (j < CONFIG.gridH - 1) {
          const bottomP = particles[getPointID(j + 1, i, CONFIG.gridH)];
          const c = new Constraint({
            p1: p,
            p2: bottomP,
            length: CONFIG.cellHeight,
            id: id + CONFIG.gridW * CONFIG.gridH,
            compressFactor: CONFIG.compressFactor,
            stretchFactor: CONFIG.stretchFactor
          });
          constraints.push(c);
          p.downConstraint = c;
        }

        if (i < CONFIG.gridW - 1) {
          const rightP = particles[getPointID(j, i + 1, CONFIG.gridH)];
          const hc = new Constraint({
            p1: p,
            p2: rightP,
            length: CONFIG.cellWidth,
            id: id + CONFIG.gridW * CONFIG.gridH * 2,
            compressFactor: 0.6,
            stretchFactor: 4,
            isSpacer: true
          });
          constraints.push(hc);
        }
      }
    }

    const drawCode = () => {
      const offsetX = (c.width / dpr - CONFIG.awidth) / 2;
      const offsetY = (c.height / dpr - CONFIG.aheight) / 2;

      particles.forEach((p) => {
        if (!p.char || p.char === " ") return;
        const img = charCanvases[p.char];
        if (!img) return;

        let cos = 1, sin = 0;
        const constraint = p.downConstraint;
        if (constraint) {
          const dx = constraint.p2.pos.x - constraint.p1.pos.x;
          const dy = constraint.p2.pos.y - constraint.p1.pos.y;
          const angle = Math.atan2(dy, dx) - Math.PI / 2;
          cos = Math.cos(angle);
          sin = Math.sin(angle);
        }

        const tx = p.pos.x + offsetX;
        const ty = p.pos.y + offsetY;
        ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * tx, dpr * ty);

        const half = img.logicalSize / 2;
        ctx.drawImage(img, -half, -half, img.logicalSize, img.logicalSize);
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    let rafID: number;
    let lastTime = 0;
    
    const runloop = (time: number) => {
      rafID = requestAnimationFrame(runloop);
      
      const delta = lastTime === 0 ? 16 : (time - lastTime);
      lastTime = time;
      
      // Limit delta for stability
      const clampedDelta = Math.min(delta, 32);

      ctx.save();
      ctx.clearRect(0, 0, c.width, c.height);

      particles.forEach((p) => p.update(clampedDelta, CONFIG));

      for (let i = 0; i < CONFIG.iterationsPerFrame; i++) {
        for (let j = 0; j < constraints.length; j++) constraints[j].solve();
      }

      if (CONFIG.contain) particles.forEach((p) => p.contain(CONFIG));

      drawCode();
      ctx.restore();
    };

    rafID = requestAnimationFrame(runloop);

    return () => {
      cancelAnimationFrame(rafID);
      input.unbind();
      resizeObserver.disconnect();
      if (c && containerRef.current?.contains(c)) {
        containerRef.current.removeChild(c);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative" style={{ touchAction: 'none' }} />;
}

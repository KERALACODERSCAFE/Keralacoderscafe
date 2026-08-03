"use client";

import React, { useEffect, useRef } from 'react';
import './FlowerGenerator.css';

interface FlowerGeneratorProps {
  fullScreen?: boolean;
  className?: string;
}

export default function FlowerGenerator({ fullScreen = false, className = '' }: FlowerGeneratorProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    
    svg.innerHTML = '';

    const { random, PI, sin, cos, round, floor, ceil } = Math;
    const mMin = Math.min;

    let width = 0, height = 0, cx = 0, cy = 0;
    let zoom = 100;
    let vbOX = 0;
    let vbOY = 0;

    function rnd(min: number, max?: number) {
      if (max === undefined) { max = min; min = 0; }
      return random() * (max - min) + min;
    }

    function rndInt(min: number, max?: number) {
      if (max === undefined) { max = min; min = 0; }
      min = ceil(min);
      max = floor(max);
      return floor(random() * (max - min)) + min;
    }
    
    const colorsArr = ['#21B91B', '#FFFF80', '#D1104D', '#7F266A'];
    
    function getColor(t: number, alpha: number) {
        const hex2rgb = (hex: string) => {
            if (hex.length === 4) {
                hex = '#' + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
        };
        const idx1 = floor(t * (colorsArr.length - 1));
        const idx2 = mMin(idx1 + 1, colorsArr.length - 1);
        const t2 = (t * (colorsArr.length - 1)) - idx1;
        
        const rgb1 = hex2rgb(colorsArr[idx1]);
        const rgb2 = hex2rgb(colorsArr[idx2]);
        const r = round(rgb1[0] + (rgb2[0] - rgb1[0]) * t2);
        const g = round(rgb1[1] + (rgb2[1] - rgb1[1]) * t2);
        const b = round(rgb1[2] + (rgb2[2] - rgb1[2]) * t2);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    class QCurve {
      sp: number[];
      cp: number[];
      ep: number[];
      constructor({ sp, cp, ep }: any) {
        this.sp = sp;
        this.cp = cp;
        this.ep = ep;
      }
      pathD() {
        return [
          `M${this.sp[0]} ${this.sp[1]}`,
          `Q${this.cp[0]} ${this.cp[1]}`,
          `${this.ep[0]} ${this.ep[1]}`,
        ].join(' ');
      }
    }

    class Petal {
      parent: Element;
      fill: string;
      sp: number[];
      cp1: number[];
      cp2: number[];
      ep: number[];
      curve1: QCurve;
      curve2: QCurve;
      path: SVGElement | null = null;

      constructor({ parent, x, y, startA, endA, iRadius, oRadius, cpda, cpdr, fill }: any) {
        this.parent = parent;
        this.fill = fill;

        const da = endA - startA;
        const iRadius0 = iRadius / 5;
        this.sp = [x + cos(startA + da / 2) * iRadius0, y + sin(startA + da / 2) * iRadius0];
        this.cp1 = [x + cos(startA - cpda) * (iRadius + cpdr), y + sin(startA - cpda) * (iRadius + cpdr)];
        this.cp2 = [x + cos(endA + cpda) * (iRadius + cpdr), y + sin(endA + cpda) * (iRadius + cpdr)];
        this.ep = [x + cos(startA + da / 2) * oRadius, y + sin(startA + da / 2) * oRadius];

        this.curve1 = new QCurve({ sp: this.sp, cp: this.cp1, ep: this.ep });
        this.curve2 = new QCurve({ sp: this.sp, cp: this.cp2, ep: this.ep });
        this.create();
      }
      create() {
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('d', this.pathD());
        this.path.style.fill = this.fill;
        this.parent.appendChild(this.path);
      }
      pathD() {
        return [
          this.curve1.pathD(),
          this.curve2.pathD(),
        ].join(' ');
      }
    }

    class Flower {
      conf: any;
      group: Element | null = null;
      constructor(conf: any) {
        this.conf = {
          alpha: 1,
          angle: 0,
          iRadius: 2, iRadiusCoef: 5,
          oRadius: 5, oRadiusCoef: 10,
          layerAnim: 'layerAnim' + (rndInt(1, 12)),
          reverseDelay: rnd(1) > 0.5,
          ...conf
        };
        this.create();
      }
      create() {
        const { parent, x, y, petals, rings, step, alpha, angle, iRadius, iRadiusCoef, oRadius, oRadiusCoef, layerAnim, reverseDelay } = this.conf;

        this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.group.classList.add('flower');
        parent.appendChild(this.group);

        let layer, np, color, di;
        for (let i = rings; i > 0; i--) {
          layer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          layer.classList.add('layer');

          np = floor((i + step - 1) / step) * petals;
          const t = i / rings;
          color = getColor(t, alpha);
          
          this.createPetalsRing(layer, x, y, np, iRadius + i * iRadiusCoef, oRadius + i * oRadiusCoef, angle + i % 2 * PI / np, color);

          di = reverseDelay ? (rings - i + 1) : i;
          (layer as SVGElement).style.animationName = layerAnim;
          (layer as SVGElement).style.animationDuration = (rings * 0.3) + 's';
          (layer as SVGElement).style.animationDelay = (di * 0.15) + 's';
          if (this.group) {
            this.group.appendChild(layer);
          }
        }
      }
      createPetalsRing(parent: Element, x: number, y: number, n: number, iRadius: number, oRadius: number, angle: number, fill: string) {
        const da = 2 * PI / n;
        const dr = oRadius - iRadius;
        const cpda = rnd(0.5 * da / 5, 1.5 * da / 5);
        const cpdr = rnd(dr * 0.25, dr * 1.1);
        let a;
        for (let i = 0; i < n; i++) {
          a = angle + i * da;
          new Petal({
            parent,
            x, y,
            startA: a,
            endA: a + da,
            iRadius,
            oRadius,
            cpda,
            cpdr,
            fill,
          });
        }
      }
    }

    function init() {
      onResize();
      if (!svg) return;
      new Flower({
        parent: svg,
        x: 0,
        y: 0,
        petals: 8,
        rings: 12,
        step: 4,
        alpha: 0.8,
        angle: rnd(PI),
        layerAnim: 'layerAnim5',
        reverseDelay: false,
      });
    }

    function createFlower(params: any) {
      if(!svg) return;
      const iRadiusCoef = rnd(1, 7);
      const oRadiusCoef = rnd(iRadiusCoef, 7);
      new Flower({
        parent: svg,
        petals: rndInt(4, 12),
        rings: rndInt(3, 8),
        step: rndInt(3, 8),
        alpha: rnd(0.7, 1),
        angle: rnd(PI),
        iRadius: rnd(2, 5),
        iRadiusCoef,
        oRadius: rnd(5, 10),
        oRadiusCoef,
        ...params
      });
    }

    function onClick(e: MouseEvent) {
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      createFlower({
        x: e.clientX - rect.left - cx,
        y: e.clientY - rect.top - cy,
      });
    }

    function onResize() {
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      width = r.width;
      height = r.height;
      cx = width / 2;
      cy = height / 2;
      updateViewBox();
    }

    function updateViewBox() {
      if (!svg) return;
      const vbW = (width * 100) / zoom;
      const vbH = (height * 100) / zoom;
      const vbX = vbOX - vbW / 2;
      const vbY = vbOY - vbH / 2;
      svg.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
    }

    init();
    
    window.addEventListener('resize', onResize);
    svg.addEventListener('click', onClick);
    
    return () => {
      window.removeEventListener('resize', onResize);
      svg.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      <svg className="fixed w-[1px] h-[1px] -left-[100em] opacity-0 pointer-events-none absolute">
        <defs>
          <filter id="f" width="200" height="200" x="-100" y="-100">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>
            <feFlood floodColor="rgb(60,10,60)" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feOffset in="shadow" dx="3" dy="3" result="offset"></feOffset>
            <feMerge>
              <feMergeNode in="offset" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <symbol id="petal2" viewBox="0 -100 200 200">
            <path transform="translate(0,-100)" d="M25.91,-15.12 Q0,0 25.91,15.12L94.09,54.889 Q120,70 142.58,50.24L177.42,19.76 Q200,0 177.42,-19.756L142.58,-50.24 Q120,-70 94.087,-54.88Z"></path>
          </symbol>
          <symbol id="petal3" viewBox="0 -100 200 200">
            <path transform="translate(0,-100)" d="M27.69,-11.54  Q0,0 27.69,11.54  L92.3,38.46  Q120,50 145.44,34.1 L174.56,15.9  Q200,0 174.56,-15.9 L145.44,-34.1 Q120,-50 92.3,-38.46Z"></path>
          </symbol>
          <symbol id="petal4" viewBox="0 -100 200 200">
            <path transform="translate(0,-100)" d="M28.09,-10.53 Q0,0 28.09,10.53L91.91,34.47 Q120,45 146.147,30.29L173.85,14.7 Q200,0 173.85,-14.7L146.15,-30.29 Q120,-45 91.91,-34.467Z"></path>
          </symbol>
          <symbol id="petal5" viewBox="0 -100 200 200">
            <path transform="translate(0,-100)" d="M28.85,-8.24 Q0,0 28.85,8.24L111.15,31.76 Q140,40 164.96,23.36L175.04,16.64 Q200,0 175.038,-16.64L164.96,-23.36 Q140,-40 111.15,-31.76Z"></path>
          </symbol>
        </defs>
      </svg>
      <svg 
        ref={svgRef} 
        id="flower-svg" 
        className={`flower-generator animate-[spin_60s_linear_infinite] ${fullScreen ? 'flower-fullscreen' : ''} ${className}`} 
      />
    </>
  );
}

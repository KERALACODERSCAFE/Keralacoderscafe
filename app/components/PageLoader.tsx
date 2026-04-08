"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY || '',
  apiUrl: 'https://api.themoviedb.org/3',
  cacheDuration: 86400000, // 24 hours
  loaderTimeout: 12000,
  minLoadTime: 2000,
};

const PS = { h: 40, w: 27, pad: 2, cols: 11, rows: 10, resIdx: 2 };
const START_Y = -PS.h - PS.pad;

const fetchWithCache = async (key: string, url: string) => {
  if (typeof window === 'undefined') return { results: [] };
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CONFIG.cacheDuration) return data;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
    return data;
  } catch { return { results: [] }; }
};

const PageLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash || localStorage.getItem('kcc_loader_seen')) return;
    setIsVisible(true);
    const startTime = Date.now();
    let animId: number, scrollTimeout: NodeJS.Timeout, isScrolling = false;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 200, 500);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current?.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.rotation.x = 0.6;
    camera.position.set(0, PS.h * 1.5, 100);

    scene.add(new THREE.PointLight(0xffffff, 3000, 600).translateY(PS.h * 1.5).translateZ(50));
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const assetGroup = new THREE.Group();
    assetGroup.position.set(-((PS.w * PS.cols) + (PS.pad * (PS.cols - 1))) / 2, START_Y, 0);
    scene.add(assetGroup);

    const handleResize = () => {
      const w = window.innerWidth, h = w * (414 / 1075);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // 2. Data Loading
    const loadContent = async () => {
      try {
        const config = await fetchWithCache('tmdb_config', `${CONFIG.apiUrl}/configuration?api_key=${CONFIG.apiKey}`);
        const base = config.images?.secure_base_url || 'https://image.tmdb.org/t/p/';
        const size = config.images?.poster_sizes[PS.resIdx] || 'w342';

        const endpoints = ['tv/1', 'tv/2', 'movie/1', 'movie/2'];
        const results = await Promise.all(endpoints.map((ep, i) =>
          fetchWithCache(`tmdb_${ep.replace('/', '_')}`, `${CONFIG.apiUrl}/discover/${ep.split('/')[0]}?api_key=${CONFIG.apiKey}&page=${ep.split('/')[1]}`)
            .then(d => { setProgress(Math.round(25 + (i + 1) * 18.75)); return d.results || []; })
        ));

        const assets = results.flat().filter((a: any) => a.poster_path).sort(() => 0.5 - Math.random()).slice(0, PS.cols * PS.rows);

        // Single Geometry for all posters
        const shape = new THREE.Shape();
        const r = 3;
        shape.moveTo(0, r); shape.lineTo(0, PS.h - r); shape.quadraticCurveTo(0, PS.h, r, PS.h);
        shape.lineTo(PS.w - r, PS.h); shape.quadraticCurveTo(PS.w, PS.h, PS.w, PS.h - r);
        shape.lineTo(PS.w, r); shape.quadraticCurveTo(PS.w, 0, PS.w - r, 0);
        shape.lineTo(r, 0); shape.quadraticCurveTo(0, 0, 0, r);
        const geo = new THREE.ShapeGeometry(shape);
        const texLoader = new THREE.TextureLoader();

        let rowGroup: THREE.Group;
        assets.forEach((asset: any, i) => {
          if (i % PS.cols === 0) {
            rowGroup = new THREE.Group();
            rowGroup.position.y = (i / PS.cols) * (PS.h + PS.pad);
            rowGroup.userData = { baseY: rowGroup.position.y, offset: Math.random() * Math.PI * 2, speed: 0.001 + Math.random() * 0.002 };
            assetGroup.add(rowGroup);
          }
          const tex = texLoader.load(`${base}${size}${asset.poster_path}`, () => setProgress(p => Math.min(p + 1, 100)));
          tex.colorSpace = THREE.SRGBColorSpace;
          const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.8 }));
          mesh.position.x = (i % PS.cols) * (PS.w + PS.pad);
          rowGroup.add(mesh);
        });
        setProgress(100);
      } catch { setErrorMsg('Unable to load posters.'); setProgress(100); }
    };
    loadContent();

    // 3. Animation Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isScrolling) {
        assetGroup.position.y += 0.15 * delta * 60;
        if (assetGroup.position.y > PS.pad) assetGroup.position.y = START_Y;
      }

      assetGroup.children.forEach(row => {
        if (row.userData.baseY !== undefined) {
          row.position.y = row.userData.baseY + Math.sin(time * row.userData.speed + row.userData.offset) * 0.5;
        }
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    // 4. Events & Cleanup
    const handleDismiss = () => {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('kcc_loader_seen', 'true');
        setTimeout(() => setIsVisible(false), 800);
      }, Math.max(0, CONFIG.minLoadTime - (Date.now() - startTime)));
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); isScrolling = true;
      assetGroup.position.y += e.deltaY * 0.05;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => isScrolling = false, 100);
    };
    const onKey = (e: KeyboardEvent) => ['Escape', 'Enter', ' '].includes(e.key) && handleDismiss();

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    const timer = setTimeout(handleDismiss, CONFIG.loaderTimeout);

    return () => {
      clearTimeout(timer); clearTimeout(scrollTimeout); cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey);

      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          Array.isArray(obj.material) ? obj.material.forEach((m: any) => m.dispose()) : obj.material.dispose();
          if (obj.material.map) obj.material.map.dispose();
        }
      });
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Use the same handleDismiss logic inside the component scope for the onClick event
  const handleTapToDismiss = () => {
    setIsLoading(false);
    localStorage.setItem('kcc_loader_seen', 'true');
    setTimeout(() => setIsVisible(false), 800);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleTapToDismiss}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-800 ease-out cursor-pointer ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div ref={containerRef} className="absolute bottom-0 left-0 w-full overflow-hidden" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 pointer-events-none">
        <div className="w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[50vw]">
          <svg viewBox="0 0 720 250" className="w-full h-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
            <defs>
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Playwrite+IE:wght@400&display=swap');
                .text-kerala { font: 900 110px 'Montserrat', sans-serif; letter-spacing: 16px; fill: #FFF; }
                .text-coders { font: 900 92px 'Montserrat', sans-serif; letter-spacing: 6px; fill: #FFF; opacity: 0.95; }
                .text-cafe { font: 400 85px 'Playwrite IE', cursive; fill: #d95715; }
                .shadow-group { filter: drop-shadow(0px 8px 12px rgba(0,0,0,0.5)); }
              `}</style>
            </defs>
            <g className="shadow-group">
              <text x="10" y="100" className="text-kerala">KERALA</text>
              <text x="15" y="195" className="text-coders">CODERS</text>
              <text x="450" y="195" className="text-cafe" transform="rotate(-8, 450, 195)">Cafe</text>
            </g>
            <g transform="translate(680, 20)">
              {['#FCCC12', '#FF7112', '#EF1541', '#6E55DC', '#069DE0', '#05AC3F'].map((c, i) => (
                <circle key={i} cy={i * 32} r={12} fill={c} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </g>
          </svg>
        </div>

        <div className="mt-12 w-full max-w-xs sm:max-w-sm">
          <div className="relative h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden border border-white/30 shadow-lg">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 transition-all duration-300" style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold uppercase tracking-widest text-white/90">{errorMsg ? '⚠️ ' : ''}{errorMsg || 'Loading Experience'}</span>
            <span className="text-white/70 font-mono">{progress}%</span>
          </div>
          <p className="mt-2 text-center text-[10px] text-white/50 animate-pulse">
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">ESC</kbd> or <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">Space</kbd> to skip</span>
            <span className="sm:hidden">Tap anywhere to skip</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
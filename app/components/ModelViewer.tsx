"use client";

import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Html,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import {
  Suspense,
  Component,
  ReactNode,
  type ElementRef,
  useState,
  useRef,
  useEffect,
} from "react";
import { RotateCw, RefreshCw, Play } from "lucide-react";

/* ─── Hooks ────────────────────────────────────────────────────── */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/** Detect iOS vs Android for AR link selection */
function useARPlatform() {
  return useState<"ios" | "android" | "none">(() => {
    if (typeof navigator === "undefined") return "none";

    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) return "ios";
    if (/Android/.test(ua)) return "android";
    return "none";
  })[0];
}

/* ─── Error Boundary ───────────────────────────────────────────── */

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: (error: Error) => ReactNode;
};

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean; error: Error | null }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) return this.props.fallback(this.state.error!);
    return this.props.children;
  }
}

/* ─── Loader ───────────────────────────────────────────────────── */

function Loader({ error }: { error?: string }) {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-center px-4 w-56">
        {error ? (
          <div className="bg-red-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black uppercase text-xs tracking-tighter text-red-600">
              {error}
            </p>
          </div>
        ) : (
          <>
            {/* Pure CSS ring — no hooks, no shared Zustand state */}
            <div
              className="w-12 h-12 rounded-full border-4 border-yellow-400 border-t-transparent"
              style={{ animation: "spin 1s linear infinite" }}
            />
            <span
              className="font-black uppercase text-xs tracking-tighter"
              style={{ color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
            >
              Rendering 3D…
            </span>
          </>
        )}
      </div>
    </Html>
  );
}

/* ─── Model ────────────────────────────────────────────────────── */

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

/* ─── Studio Lighting ──────────────────────────────────────────── */

function StudioLights({ mobile }: { mobile: boolean }) {
  return (
    <>
      <ambientLight intensity={mobile ? 1.2 : 0.9} />
      {/* Key — warm front-upper-left */}
      <directionalLight
        position={[-4, 6, 4]}
        intensity={mobile ? 2.5 : 3.5}
        color="#ffe8c0"
        castShadow={!mobile}
      />
      {/* Fill — cool right */}
      <directionalLight
        position={[5, 3, -3]}
        intensity={mobile ? 1.0 : 1.8}
        color="#c8e0ff"
      />
      {/* Rim / back */}
      <directionalLight
        position={[0, -2, -6]}
        intensity={mobile ? 0.6 : 1.0}
        color="#ffd580"
      />
      {/* Ground bounce */}
      <hemisphereLight args={["#ffe0a0", "#3d2800", mobile ? 0.5 : 0.8]} />
    </>
  );
}

/* ─── AR Button ────────────────────────────────────────────────── */

function ARButton({
  modelUrl,
  usdzUrl,
  title,
  platform,
}: {
  modelUrl: string;
  usdzUrl?: string;
  title: string;
  platform: "ios" | "android" | "none";
}) {
  if (platform === "none") return null;

  /** Resolve absolute URL for model (Scene Viewer needs full URL) */
  const absModel =
    modelUrl.startsWith("http")
      ? modelUrl
      : `${typeof window !== "undefined" ? window.location.origin : ""}${modelUrl}`;

  if (platform === "ios") {
    // iOS Quick Look needs .usdz — if not provided, show disabled
    if (!usdzUrl) return null;
    return (
      <a
        href={usdzUrl}
        rel="ar"
        className="flex items-center gap-2 bg-black text-white border-4 border-yellow-400 px-4 py-2.5 font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] hover:bg-yellow-400 hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        <span className="text-base">📱</span>
        View in AR
      </a>
    );
  }

  // Android — Google Scene Viewer (via Intent scheme for local network compatibility)
  const androidIntentUrl =
    `intent://arvr.google.com/scene-viewer/1.0` +
    `?file=${absModel}` +
    `&mode=ar_preferred` +
    `&title=${encodeURIComponent(title)}` +
    `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;

  return (
    <a
      href={androidIntentUrl}
      className="flex items-center gap-2 bg-black text-white border-4 border-yellow-400 px-4 py-2.5 font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] hover:bg-yellow-400 hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
    >
      {/* AR icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5v7L12 19.82 4 15.5v-7L12 4.18zM12 7l-5 2.5v5L12 17l5-2.5v-5L12 7zm0 2.06L15 10.5v3L12 15l-3-1.5v-3L12 9.06z"/>
      </svg>
      View in AR
    </a>
  );
}

/* ─── Cover / Poster ───────────────────────────────────────────── */

function CoverPoster({
  coverImage,
  title,
  onPlay,
}: {
  coverImage: string;
  title: string;
  onPlay: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverImage}
        alt={title}
        className="w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <button
          onClick={onPlay}
          className="group flex flex-col items-center gap-3 focus:outline-none"
          aria-label="View 3D Model"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 border-4 border-white backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-yellow-400/30 group-hover:border-yellow-400 transition-all duration-300">
            <Play
              size={36}
              strokeWidth={2.5}
              className="text-white fill-white group-hover:text-yellow-400 group-hover:fill-yellow-400 translate-x-0.5"
            />
          </div>
          <div className="bg-black border-4 border-yellow-400 px-5 py-2 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
            <span className="text-white font-black uppercase text-sm tracking-widest">
              View 3D Model
            </span>
          </div>
        </button>
      </div>

    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */

export default function ModelViewer({
  modelUrl,
  coverImage,
  usdzUrl,
  title = "3D Model",
}: {
  modelUrl: string;
  coverImage?: string;
  /** iOS AR Quick Look — provide a .usdz URL for iOS AR support */
  usdzUrl?: string;
  title?: string;
}) {
  const orbitRef = useRef<ElementRef<typeof OrbitControls> | null>(null);
  const isMobile = useIsMobile();
  const arPlatform = useARPlatform();
  const [autoRotate, setAutoRotate] = useState(true);
  const [playing, setPlaying] = useState(!coverImage);

  /* Mobile orbit-lock (prevents scroll hijacking) */
  const [mobileActive, setMobileActive] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activateMobile = () => {
    setMobileActive(true);
    resetInactivity();
  };
  const resetInactivity = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => setMobileActive(false), 4000);
  };
  useEffect(
    () => () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    },
    []
  );

  const resetView = () => orbitRef.current?.reset();

  return (
    <div
      className="w-full border-4 border-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group"
      style={{
        minHeight: isMobile ? "280px" : "520px",
        height: isMobile ? "280px" : "600px",
      }}
    >
      {/* Cover Poster */}
      {coverImage && !playing && (
        <CoverPoster
          coverImage={coverImage}
          title={title}
          onPlay={() => setPlaying(true)}
        />
      )}

      {/* 3D Canvas */}
      {playing && (
        <>
          {/* Top-left badge */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter border-2 border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
              {isMobile ? "3D View" : "High Fidelity Render"}
            </div>
          </div>

          {/* Top-right: AR button (mobile only) + close */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            {isMobile && (
              <ARButton
                modelUrl={modelUrl}
                usdzUrl={usdzUrl}
                title={title}
                platform={arPlatform}
              />
            )}
            {coverImage && (
              <button
                onClick={() => setPlaying(false)}
                className="bg-white border-2 border-black px-2 py-1 text-[10px] font-black uppercase hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Toolbar */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white border-4 border-black p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={resetView}
              className="p-1.5 hover:bg-yellow-400 border-2 border-transparent hover:border-black transition-all"
              title="Reset View"
            >
              <RefreshCw size={16} strokeWidth={3} />
            </button>
            <div className="w-[2px] h-5 bg-black" />
            <button
              onClick={() => setAutoRotate((v) => !v)}
              className={`p-1.5 border-2 border-transparent hover:border-black transition-all ${
                autoRotate
                  ? "bg-yellow-400 border-black"
                  : "hover:bg-yellow-400"
              }`}
              title={autoRotate ? "Stop Rotation" : "Start Rotation"}
            >
              <RotateCw
                size={16}
                strokeWidth={3}
                className={autoRotate ? "animate-spin-slow" : ""}
              />
            </button>
            {!isMobile && (
              <>
                <div className="w-[2px] h-5 bg-black" />
                <p className="px-2 font-black uppercase text-[10px] tracking-widest">
                  Drag · Scroll to Zoom
                </p>
              </>
            )}
          </div>

          {/* Mobile orbit-lock overlay */}
          {isMobile && !mobileActive && (
            <button
              onClick={activateMobile}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px]"
              style={{ touchAction: "pan-y" }}
            >
              <div className="bg-white border-4 border-black px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black uppercase text-sm tracking-tight">
                  👆 Tap to rotate
                </span>
              </div>
            </button>
          )}

          {/* Canvas */}
          <div
            className="w-full h-full"
            style={{
              pointerEvents: isMobile && !mobileActive ? "none" : "auto",
            }}
            onPointerMove={
              isMobile && mobileActive ? resetInactivity : undefined
            }
          >
            <Canvas
              shadows={!isMobile}
              dpr={isMobile ? 1 : [1, 1.5]}
              frameloop={isMobile && !autoRotate ? "demand" : "always"}
              performance={{ min: 0.5 }}
              camera={{ position: [4, 3, 6], fov: isMobile ? 52 : 42 }}
              style={{ touchAction: "none" }}
            >
              <ErrorBoundary
                fallback={(err) => (
                  <Loader
                    error={
                      err.message.includes("Unexpected token")
                        ? "Invalid File Format — use a direct .glb URL"
                        : err.message
                    }
                  />
                )}
              >
                <Suspense fallback={<Loader />}>
                  <StudioLights mobile={isMobile} />
                  <Environment
                    preset={isMobile ? "sunset" : "studio"}
                    background={false}
                  />
                  <Center>
                    <Model url={modelUrl} />
                  </Center>
                  {!isMobile && (
                    <AccumulativeShadows
                      temporal
                      frames={40}
                      alphaTest={0.85}
                      opacity={0.4}
                      position={[0, -1.2, 0]}
                    >
                      <RandomizedLight
                        amount={6}
                        radius={4}
                        ambient={0.5}
                        position={[-3, 5, 3]}
                      />
                    </AccumulativeShadows>
                  )}
                  <OrbitControls
                    ref={orbitRef}
                    makeDefault
                    enableDamping={!isMobile}
                    dampingFactor={0.05}
                    autoRotate={autoRotate}
                    autoRotateSpeed={isMobile ? 1 : 1.8}
                    minDistance={2}
                    maxDistance={14}
                    minPolarAngle={Math.PI / 8}
                    maxPolarAngle={Math.PI / 1.8}
                    touches={{ ONE: 1, TWO: 2 }}
                  />
                </Suspense>
              </ErrorBoundary>
            </Canvas>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}

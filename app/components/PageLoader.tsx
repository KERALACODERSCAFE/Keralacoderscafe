"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { REPOS, Project } from "@/lib/projects";
import KccCupMark from "./KccCupMark";

const POSTER_WIDTH = 2.7;
const POSTER_HEIGHT = 4;
const PADDING = 0.2;
const COLS = 5;
const VISIBLE_ROWS = 8;
const ROW_HEIGHT = POSTER_HEIGHT + PADDING;
const TOTAL_HEIGHT = VISIBLE_ROWS * ROW_HEIGHT;

function ProjectPoster({ project, x, y }: { project: Project; x: number; y: number }) {
  // Use neobrutalist colors for poster backgrounds
  const bgColor = useMemo(() => {
    const colors = ["#FFE66D", "#A5FFD6", "#FF6B6B", "#ffffff"];
    return colors[project.id % colors.length];
  }, [project.id]);

  return (
    <group position={[x, y, 0]}>
      {/* Poster Base */}
      <mesh>
        <planeGeometry args={[POSTER_WIDTH, POSTER_HEIGHT]} />
        <meshStandardMaterial 
          color={bgColor} 
          metalness={0.1} 
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Border */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[POSTER_WIDTH / 2 - 0.05, POSTER_WIDTH / 2, 4]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Project Text */}
      <Text
        position={[0, 0.5, 0.05]}
        fontSize={0.25}
        color="black"
        font="/fonts/Inter-Black.woff" // Assuming Inter is available or fallback
        maxWidth={POSTER_WIDTH - 0.4}
        textAlign="center"
        anchorY="middle"
      >
        {project.name.toUpperCase()}
      </Text>
      
      <Text
        position={[0, -0.8, 0.05]}
        fontSize={0.12}
        color="black"
        fillOpacity={0.6}
        maxWidth={POSTER_WIDTH - 0.6}
        textAlign="center"
      >
        {project.topics[0] || "OPEN SOURCE"}
      </Text>
    </group>
  );
}

function InfinitePosterWall() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Create an extended list of projects to fill the wall
  const extendedRepos = useMemo(() => {
    const list: Project[] = [];
    for (let i = 0; i < COLS * VISIBLE_ROWS; i++) {
      list.push(REPOS[i % REPOS.length]);
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Move the entire group down (slightly slower for 10s duration)
    groupRef.current.position.y -= delta * 1.2;

    // Loop logic
    if (groupRef.current.position.y < -ROW_HEIGHT) {
      groupRef.current.position.y += ROW_HEIGHT;
    }
  });

  const startX = -((POSTER_WIDTH * COLS) + (PADDING * (COLS - 1))) / 2 + POSTER_WIDTH / 2;

  return (
    <group ref={groupRef}>
      {extendedRepos.map((project, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return (
          <ProjectPoster
            key={`${project.id}-${i}`}
            project={project}
            x={startX + col * (POSTER_WIDTH + PADDING)}
            y={row * ROW_HEIGHT}
          />
        );
      })}
    </group>
  );
}

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Minimum loading time for the animation to be seen
    const timer = setTimeout(() => {
      setLoading(false);
      // Remove from DOM after transition
      setTimeout(() => setShouldRender(false), 800);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-700 ease-in-out ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none scale-105"
      }`}
    >
      {/* 3D Poster Wall */}
      <div className="absolute inset-0 opacity-40">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <InfinitePosterWall />
          </Float>
        </Canvas>
      </div>

      {/* Center Branding Overlay */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_20px_50px_rgba(255,230,109,0.3)] animate-pulse">
          <KccCupMark className="w-full h-full" />
        </div>
        
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-[0.2em] slide-up">
            Kerala Coders Cafe
          </h1>
          <div className="mt-4 flex items-center gap-3">
             <div className="h-1 w-12 bg-kcc-gold rounded-full animate-loader-bar" />
             <span className="text-xs font-black text-kcc-gold uppercase tracking-widest">
               Syncing Community
             </span>
             <div className="h-1 w-12 bg-kcc-gold rounded-full animate-loader-bar-reverse" />
          </div>
        </div>
      </div>

      {/* Decorative Scanlines for Retro Tech Vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}
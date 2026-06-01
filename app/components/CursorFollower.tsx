'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);
  
  // Ref to access the latest placed state inside event listeners without re-binding
  const isPlacedRef = useRef(isPlaced);
  useEffect(() => {
    isPlacedRef.current = isPlaced;
  }, [isPlaced]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Track the actual physical mouse position relative to the viewport
  const lastClient = useRef({ x: -100, y: -100 });

  const springConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Calculate tilt based on horizontal velocity ONLY when following the cursor
  const rotate = useTransform(smoothX, () => {
    if (isPlacedRef.current) return 0;
    const velocity = cursorX.getVelocity();
    return Math.min(Math.max(velocity * 0.03, -30), 30);
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      lastClient.current = { x: e.clientX, y: e.clientY };
      // If we are following the cursor, update its target to absolute document coordinates
      if (!isPlacedRef.current) {
        cursorX.set(e.clientX + window.scrollX);
        cursorY.set(e.clientY + window.scrollY);
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleScroll = () => {
      // Keep tracking the absolute position when scrolling if not placed
      if (!isPlacedRef.current && lastClient.current.x !== -100) {
        cursorX.set(lastClient.current.x + window.scrollX);
        cursorY.set(lastClient.current.y + window.scrollY);
      }
    };

    const handleGlobalClick = () => {
      // We only drop it if it's not already placed.
      // If it IS placed, picking it up is handled by the bottle's own onClick
      if (!isPlacedRef.current) {
        setIsPlaced(true);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleGlobalClick);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleGlobalClick);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className={`absolute z-[9999] text-4xl md:text-5xl select-none transition-all ${
        isPlaced ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none mix-blend-normal'
      }`}
      style={{
        left: smoothX,
        top: smoothY,
        x: '15px', 
        y: '15px',
        rotate: rotate,
        opacity: (isVisible || isPlaced) ? 1 : 0,
      }}
      onClick={(e) => {
        if (isPlaced) {
          e.stopPropagation(); // don't let global click trigger and instantly re-place it
          setIsPlaced(false);
          // Snap it back to following the current physical mouse cursor + scroll
          cursorX.set(lastClient.current.x + window.scrollX);
          cursorY.set(lastClient.current.y + window.scrollY);
        }
      }}
    >
      <motion.div 
        className="relative"
        animate={isPlaced ? {
          y: [0, -8, 0], 
          rotate: [0, -6, 6, 0] 
        } : { y: 0, rotate: 0 }}
        transition={isPlaced ? {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        } : { duration: 0.3 }}
        whileHover={isPlaced ? { scale: 1.15 } : {}}
      >
        <span 
          className={`block transition-all duration-300 ${
            isPlaced 
              ? 'drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:drop-shadow-[0_0_25px_rgba(250,204,21,1)] filter brightness-110' 
              : 'drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]'
          }`}
        >
          🍶
        </span>
      </motion.div>
    </motion.div>
  );
}

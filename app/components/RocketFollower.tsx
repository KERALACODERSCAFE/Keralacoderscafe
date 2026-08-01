'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function RocketFollower() {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const rotate = useTransform(smoothX, () => {
    const velocityX = cursorX.getVelocity();
    const velocityY = cursorY.getVelocity();
    if (Math.abs(velocityX) < 1 && Math.abs(velocityY) < 1) return 45;
    const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
    return angle + 45;
  });

  useEffect(() => {
    const section = document.getElementById('teams');
    if (!section) return;

    const moveCursor = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cursorX.set(x);
      cursorY.set(y);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    section.addEventListener('mousemove', moveCursor);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', moveCursor);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="absolute pointer-events-none z-[100] drop-shadow-2xl flex items-center justify-center hidden md:flex"
      style={{
        x: smoothX,
        y: smoothY,
        rotate,
        opacity: isVisible ? 1 : 0,
        translateX: "-50%",
        translateY: "-50%"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      <div className="relative">
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-500 rounded-full blur-md opacity-70 animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full blur-sm opacity-90 animate-ping" />
        <svg 
          className="w-10 h-10 fill-white stroke-white stroke-[1.5]" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      </div>
    </motion.div>
  );
}

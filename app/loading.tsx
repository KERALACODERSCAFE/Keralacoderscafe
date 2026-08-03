import React from 'react';
import FlowerGenerator from "./components/FlowerGenerator";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="w-96 h-96 relative">
        <FlowerGenerator />
      </div>
      <p className="mt-8 text-2xl font-black uppercase tracking-widest text-black animate-pulse">Loading...</p>
    </div>
  );
}

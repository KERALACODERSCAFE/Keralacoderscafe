'use client';
import { useEffect, useState, useRef } from 'react';
import './SpeakingRobot.css';

export default function SpeakingRobot() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Welcome to the Kerala Coders Cafe Team! We are a community of passionate developers. Feel free to explore our projects and connect with us!`;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utteranceRef.current = utterance;

      // Try to load a cool robotic voice or Google UK English
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        const preferredVoice = voices.find(v => v.name === 'Fred' || v.name.includes('Google UK English Male')) || voices[0];
        if (preferredVoice && utteranceRef.current) {
          utteranceRef.current.voice = preferredVoice;
        }
      };

      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
      loadVoices();
    }
    
    return () => {
      if (synthRef.current?.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleClick = () => {
    if (!synthRef.current || !utteranceRef.current) return;

    if (synthRef.current.speaking) {
      setIsSpeaking(false);
      synthRef.current.cancel();
    } else {
      setIsSpeaking(true);
      synthRef.current.speak(utteranceRef.current);
    }
  };

  return (
    <div 
      className={`new-robot ${isSpeaking ? 'is-speaking' : ''}`}
      onClick={handleClick}
      title="Click me to talk!"
    >
      <div className="antenna">
        <div className="antenna-ball"></div>
      </div>
      <div className="robot-head">
        <div className="visor">
          <div className="eye-track">
            <div className="eye-glow"></div>
          </div>
        </div>
        <div className="robot-mouth">
          <div className="voice-wave"></div>
          <div className="voice-wave"></div>
          <div className="voice-wave"></div>
          <div className="voice-wave"></div>
          <div className="voice-wave"></div>
        </div>
      </div>
      <div className="floating-ring"></div>
    </div>
  );
}

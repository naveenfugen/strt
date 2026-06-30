import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChevronDown } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function Hero() {
  const { name, heroSubtitle } = birthdayData;

  useEffect(() => {
    // Define custom emoji shapes for the premium love-themed birthday blast
    const heart = confetti.shapeFromText({ text: '❤️' });
    const sparkle = confetti.shapeFromText({ text: '✨' });
    const pinkHeart = confetti.shapeFromText({ text: '💖' });
    const themedShapes = [heart, sparkle, pinkHeart, 'circle', 'square'];

    // Blast 1: Center burst on mount
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#FFD700', '#E8A0BF', '#ffffff', '#B8860B', '#F5D3E3'],
      shapes: themedShapes,
      scalar: 2
    });

    // Blast 2: Left side burst after 700ms
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#FFD700', '#E8A0BF', '#ffffff'],
        shapes: themedShapes,
        scalar: 2
      });
    }, 700);

    // Blast 3: Right side burst after 1000ms
    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#FFD700', '#E8A0BF', '#ffffff'],
        shapes: themedShapes,
        scalar: 2
      });
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('wishes-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-transparent px-4 select-none">
      {/* Background Starfield */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars-1 absolute inset-0 opacity-60"></div>
        <div className="stars-2 absolute inset-0 opacity-40"></div>
        <div className="stars-3 absolute inset-0 opacity-50"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        
        {/* Cake Container with Candles */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 70, 
            damping: 15,
            delay: 0.2 
          }}
          className="relative w-40 h-40 flex items-center justify-center mb-8 animate-float"
        >
          {/* Glowing Ring Backdrop */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/20 to-roseGold/20 blur-md animate-pulse-glow border border-gold/10"></div>
          
          {/* Circular Glassmorphism Panel */}
          <div className="absolute w-32 h-32 rounded-full glass-panel flex items-center justify-center border border-white/10 shadow-2xl">
            <span className="text-6xl filter drop-shadow-[0_0_12px_rgba(255,215,0,0.3)]">🎂</span>
          </div>

          {/* Candle 1 (Left) */}
          <div className="absolute top-0 left-12 flex flex-col items-center">
            <svg className="w-3 h-7 animate-flicker" viewBox="0 0 20 40">
              <defs>
                <linearGradient id="flame-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF099" />
                  <stop offset="40%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FF4500" />
                </linearGradient>
              </defs>
              <path d="M10,4 C6,16 4,26 10,36 C16,26 14,16 10,4 Z" fill="url(#flame-grad-1)" />
            </svg>
            <div className="w-1 h-4 bg-gradient-to-b from-roseGold to-roseGold-dark rounded-sm"></div>
          </div>

          {/* Candle 2 (Center) */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <svg className="w-4 h-8 animate-flicker" viewBox="0 0 20 40" style={{ animationDelay: '0.07s' }}>
              <path d="M10,4 C6,16 4,26 10,36 C16,26 14,16 10,4 Z" fill="url(#flame-grad-1)" />
            </svg>
            <div className="w-1.5 h-5 bg-gradient-to-b from-gold to-gold-dark rounded-sm"></div>
          </div>

          {/* Candle 3 (Right) */}
          <div className="absolute top-0 right-12 flex flex-col items-center">
            <svg className="w-3 h-7 animate-flicker" viewBox="0 0 20 40" style={{ animationDelay: '0.14s' }}>
              <path d="M10,4 C6,16 4,26 10,36 C16,26 14,16 10,4 Z" fill="url(#flame-grad-1)" />
            </svg>
            <div className="w-1 h-4 bg-gradient-to-b from-roseGold to-roseGold-dark rounded-sm"></div>
          </div>
        </motion.div>

        {/* Shimmering Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-serif text-5xl md:text-8xl font-bold tracking-tight mb-4 select-text"
        >
          <span className="text-shimmer animate-shimmer">
            Happy Birthday
          </span>
        </motion.h1>

        {/* Glowing Name Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="font-serif text-3xl md:text-6xl font-light text-white tracking-wide mb-6"
        >
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-roseGold-light to-white drop-shadow-[0_0_8px_rgba(232,160,191,0.6)]">
            {name}
            {/* Soft underline glow */}
            <span className="absolute bottom-[-6px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80 shadow-md"></span>
          </span>
        </motion.p>

        {/* Subtle Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="text-sm md:text-base text-roseGold/70 italic tracking-wide max-w-md mx-auto"
        >
          {heroSubtitle}
        </motion.p>
      </div>

      {/* Bounce scroll down arrow */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2, duration: 1 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        className="absolute bottom-8 cursor-pointer z-10 flex flex-col items-center text-xs text-gold/60 uppercase tracking-widest gap-2"
      >
        <span>Scroll to wishes</span>
        <ChevronDown className="w-5 h-5 text-gold animate-bounce" />
      </motion.button>
    </section>
  );
}

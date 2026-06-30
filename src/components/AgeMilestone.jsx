import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';

export default function AgeMilestone() {
  const { age, subheading } = birthdayData;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(age);
      const duration = 2200; // 2.2 seconds
      
      let startTime = null;

      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease Out Cubic: f(t) = 1 - (1-t)^3
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutCubic * end);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, age]);

  // SVG circular properties
  const radius = 85;
  const circumference = 2 * Math.PI * radius; // Approx 534.07

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 bg-transparent flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center">
        
        {/* Milestone Circle and Number Container */}
        <div className="relative w-64 h-64 mb-8 flex items-center justify-center select-none">
          
          {/* Subtle Outer Glow Aura */}
          <div className="absolute w-52 h-52 rounded-full bg-gradient-to-tr from-gold/10 to-roseGold/10 blur-xl animate-pulse-glow"></div>

          {/* SVG Progress Circle */}
          <svg className="w-full h-full transform -rotate-95" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFF099" />
                <stop offset="100%" stopColor="#E8A0BF" />
              </linearGradient>
            </defs>

            {/* Background Track Circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="5"
              fill="transparent"
            />

            {/* Animated Foreground Circle */}
            <motion.circle
              cx="100"
              cy="100"
              r={radius}
              stroke="url(#ringGradient)"
              strokeWidth="5"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: circumference }}
              transition={{ duration: 2.2, ease: "easeOut" }}
            />
          </svg>

          {/* Counted Number */}
          <div className="absolute flex flex-col items-center justify-center">
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gold-light to-gold drop-shadow-[0_4px_12px_rgba(255,215,0,0.3)]"
            >
              {count}
            </motion.span>
          </div>
        </div>

        {/* Milestone Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-white tracking-wide uppercase"
        >
          Milestone Celebration
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-lg md:text-xl text-roseGold font-light tracking-widest italic"
        >
          {subheading}
        </motion.p>
        
        {/* Underline accent */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "60px" } : { width: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[2px] bg-gradient-to-r from-gold to-roseGold mt-6 rounded-full"
        ></motion.div>

      </div>
    </section>
  );
}

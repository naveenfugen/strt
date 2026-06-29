import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  // Generate 8 floating heart particles
  const hearts = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: `${15 + i * 10 + Math.random() * 6}%`,
    size: 12 + Math.random() * 12, // 12px to 24px
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 4 // 5s to 9s
  }));

  return (
    <footer className="relative py-16 w-full bg-[#070514] flex flex-col justify-center items-center overflow-hidden border-t border-white/5 select-none">
      
      {/* Floating Hearts Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            initial={{ y: 60, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: -140, 
              x: [0, 10, -10, 0],
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.5, 1, 0.7]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              left: heart.left,
              fontSize: `${heart.size}px`,
              filter: 'drop-shadow(0 0 6px rgba(232, 160, 191, 0.6))',
              zIndex: 0
            }}
          >
            ❤️
          </motion.span>
        ))}
      </div>

      {/* Footer Content */}
      <div className="relative z-10 text-center">
        
        {/* Soft Glow Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sans text-sm md:text-base tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-roseGold drop-shadow-[0_0_8px_rgba(255,215,0,0.35)]"
        >
          Made with <span className="text-roseGold animate-pulse">❤️</span> just for you
        </motion.p>
        
        {/* Copyright or date */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xs text-gray-500 mt-4 tracking-wider uppercase"
        >
          All rights reserved &copy; {new Date().getFullYear()}
        </motion.p>
      </div>
      
    </footer>
  );
}

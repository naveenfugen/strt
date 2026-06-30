import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveBackground() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Track mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring animation for fluid spotlight movement
  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile screen sizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) {
        // Spotlight coordinates relative to viewport
        mouseX.set(e.clientX - 250); // Offset by half of spotlight diameter (500px)
        mouseY.set(e.clientY - 250);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Render 15 random sparkle locations
  const [sparkles, setSparkles] = useState([]);
  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 1.5 + Math.random() * 2,
    }));
    setSparkles(list);
  }, []);

  // Render 12 floating background love particles
  const [loveParticles, setLoveParticles] = useState([]);
  useEffect(() => {
    const symbols = ['❤️', '💖', '✨', '💕', '💝'];
    const list = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${Math.random() * 90 + 5}%`,
      size: 14 + Math.random() * 18, // 14px to 32px
      delay: Math.random() * 6,
      duration: 15 + Math.random() * 10, // 15s to 25s
    }));
    setLoveParticles(list);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#030209]">
      {/* 1. Fine-grain overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] z-50 mix-blend-overlay"></div>

      {/* 2. Dynamic spotlight tracker (desktop only) */}
      {!isMobile && (
        <motion.div
          style={{
            x: spotlightX,
            y: spotlightY,
          }}
          className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.06)_0%,rgba(232,160,191,0.03)_50%,transparent_100%)] blur-3xl mix-blend-screen z-10"
        />
      )}

      {/* 3. Floating Mesh Gradient Blobs */}
      {/* Orb 1: Violet/Indigo */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -100, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#1e144a]/12 blur-[130px] z-0"
      />

      {/* Orb 2: Rose Gold/Pink */}
      <motion.div
        animate={{
          x: [0, -120, 50, 0],
          y: [0, 80, -90, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full bg-[#e8a0bf]/8 blur-[140px] z-0"
      />

      {/* Orb 3: Gold/Amber */}
      <motion.div
        animate={{
          x: [0, 100, -70, 0],
          y: [0, 120, -50, 0],
          scale: [0.9, 1.1, 0.95, 0.9],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[#ffd700]/6 blur-[120px] z-0"
      />

      {/* 4. Tiny Ambient Sparkles */}
      <div className="absolute inset-0">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              backgroundColor: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 8px #fff, 0 0 15px rgba(255,215,0,0.5)',
            }}
          />
        ))}
      </div>

      {/* 5. Floating Background Love Symbols */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {loveParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "115vh", opacity: 0, rotate: 0 }}
            animate={{
              y: "-15vh",
              opacity: [0, 0.18, 0.18, 0],
              rotate: [0, 45, -45, 90, 0],
              x: [0, 15, -15, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: 'absolute',
              left: p.left,
              fontSize: `${p.size}px`,
              filter: 'drop-shadow(0 0 8px rgba(232, 160, 191, 0.35))',
            }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

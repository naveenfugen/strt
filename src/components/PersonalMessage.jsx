import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function PersonalMessage() {
  const { personalMessage, signature } = birthdayData;

  // Generate 10 floating balloons
  const balloons = Array.from({ length: 10 }).map((_, i) => {
    const size = 35 + Math.random() * 25; // 35px to 60px
    return {
      id: i,
      left: `${5 + i * 10 + Math.random() * 4}%`,
      size,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8, // 12s to 20s
      // Alternate gold, rose gold, and soft pink colors
      color: i % 3 === 0 
        ? 'rgba(255, 215, 0, 0.35)'      // Gold translucent
        : i % 3 === 1 
          ? 'rgba(232, 160, 191, 0.35)'  // Rose gold translucent
          : 'rgba(245, 211, 227, 0.35)'  // Soft pink translucent
    };
  });

  // Generate 8 twinkling sparkles
  const sparkles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    top: `${10 + Math.random() * 80}%`,
    left: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 3,
    size: 8 + Math.random() * 12 // 8px to 20px
  }));

  return (
    <section className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#0a0a1a] via-[#120b2e] to-[#0a0a1a] flex flex-col justify-center items-center overflow-hidden">
      
      {/* Floating Balloons Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            initial={{ y: "110vh", rotate: 0 }}
            animate={{ 
              y: "-20vh",
              rotate: [0, 8, -8, 8, 0],
              x: [0, 12, -12, 12, 0]
            }}
            transition={{
              duration: balloon.duration,
              delay: balloon.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: balloon.left,
              width: balloon.size,
              zIndex: 0
            }}
          >
            {/* Balloon Body */}
            <div 
              style={{
                width: balloon.size,
                height: balloon.size * 1.25,
                backgroundColor: balloon.color,
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), inset 3px 3px 6px rgba(255,255,255,0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative'
              }}
            >
              {/* Highlight flare inside balloon */}
              <div className="absolute top-2 left-3 w-2 h-4 bg-white/40 rounded-full rotate-[30deg]"></div>
              
              {/* Balloon Knot */}
              <div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-transparent"
                style={{ borderBottomColor: balloon.color }}
              ></div>
              
              {/* Balloon String */}
              <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-[1px] h-[24px] bg-white/10"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sparkles Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ scale: 0.3, opacity: 0.2 }}
            animate={{ 
              scale: [0.3, 1, 0.3], 
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360] 
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
            }}
            className="text-gold/55"
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl w-full z-10">
        
        {/* Heartfelt Letter Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative glass-panel rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl text-center overflow-hidden"
        >
          {/* Inner Glow/Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-roseGold/5 via-transparent to-gold/5 pointer-events-none"></div>

          {/* Decorative Corner Borders */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-lg"></div>
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-lg"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-lg"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-lg"></div>

          {/* Large Quote Mark Left */}
          <span className="absolute top-4 left-6 md:top-8 md:left-12 font-serif text-8xl md:text-9xl text-gold/15 select-none leading-none">
            “
          </span>

          {/* Quotation Body */}
          <div className="relative z-10 my-4 md:my-8 px-4 md:px-12 select-text">
            <p className="font-serif text-xl md:text-3xl italic font-medium leading-relaxed md:leading-loose text-transparent bg-clip-text bg-gradient-to-b from-gold via-gold-light to-roseGold drop-shadow-sm">
              {personalMessage}
            </p>
          </div>

          {/* Large Quote Mark Right */}
          <span className="absolute bottom-16 right-6 md:bottom-24 md:right-12 font-serif text-8xl md:text-9xl text-roseGold/15 select-none leading-none">
            ”
          </span>

          {/* Signature and Underline Animation */}
          <div className="relative z-10 mt-12 flex flex-col items-center select-none">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-serif text-lg md:text-2xl text-roseGold/80 tracking-widest italic"
            >
              {signature}
            </motion.p>
            
            {/* Slide-in Underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mt-2"
            ></motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

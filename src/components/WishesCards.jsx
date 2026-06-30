import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 14
    }
  }
};

function WishCard({ wish }) {
  const IconComponent = Icons[wish.iconName] || Icons.Gift;
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      className="relative overflow-hidden glass-panel rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center transition-all duration-300 group select-none"
    >
      {/* Glare spotlight overlay on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(circle 220px at ${coords.x}px ${coords.y}px, ${wish.accentColor}18, transparent 80%)`,
          }}
        />
      )}

      {/* Illuminated card border glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 opacity-100"
          style={{
            padding: '1px',
            background: `radial-gradient(circle 140px at ${coords.x}px ${coords.y}px, ${wish.accentColor}55, transparent 70%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Decorative border top line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
        style={{
          background: `linear-gradient(to right, transparent, ${wish.accentColor}50, transparent)`
        }}
      />

      {/* Category Tag */}
      <span
        style={{ 
          transform: 'translateZ(15px)',
          color: wish.accentColor,
          textShadow: `0 0 10px ${wish.accentColor}30`
        }}
        className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] mb-4"
      >
        {wish.tag}
      </span>

      {/* Icon Container with Glow */}
      <div 
        style={{ 
          transform: 'translateZ(30px)',
          borderColor: isHovered ? `${wish.accentColor}50` : 'rgba(255, 255, 255, 0.05)',
          backgroundColor: isHovered ? `${wish.accentColor}15` : 'rgba(255, 255, 255, 0.02)'
        }}
        className="relative mb-6 p-4 rounded-2xl border transition-all duration-500"
      >
        <div 
          className="absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
          style={{ backgroundColor: `${wish.accentColor}25` }}
        />
        <IconComponent 
          className="w-8 h-8 transition-colors duration-500 relative z-10" 
          style={{ color: wish.accentColor }}
        />
      </div>

      {/* Card Title */}
      <h3 
        style={{ 
          transform: 'translateZ(20px)',
          backgroundImage: `linear-gradient(to bottom, #ffffff, ${wish.accentColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
        className="font-serif text-xl md:text-2xl mb-4 font-semibold tracking-wide"
      >
        {wish.title}
      </h3>

      {/* Card Message */}
      <p 
        style={{ transform: 'translateZ(10px)' }}
        className="font-sans text-sm md:text-[15px] text-gray-400/90 leading-relaxed font-light"
      >
        {wish.message}
      </p>

      {/* Corner Decorative Dots */}
      <div 
        className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: wish.accentColor }}
      />
      <div 
        className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: wish.accentColor }}
      />
    </motion.div>
  );
}

export default function WishesCards() {
  const { wishes } = birthdayData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  return (
    <section
      id="wishes-section"
      className="relative min-h-screen py-24 px-4 bg-transparent flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="max-w-6xl w-full z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-roseGold">
            Wishes For You
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-gold to-roseGold mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        {/* Wishes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-150px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {wishes.map((wish) => (
            <WishCard key={wish.id} wish={wish} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

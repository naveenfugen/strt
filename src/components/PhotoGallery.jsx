import React from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';

export default function PhotoGallery() {
  const { photos } = birthdayData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 15 
      } 
    }
  };

  // Assign classes for asymmetric layout
  // Photo 1: col-span-7, Photo 2: col-span-5, Photo 3: col-span-5, Photo 4: col-span-7
  const getColSpanClass = (index) => {
    switch (index) {
      case 0: return 'md:col-span-7 h-[300px] md:h-[400px]';
      case 1: return 'md:col-span-5 h-[300px] md:h-[400px]';
      case 2: return 'md:col-span-5 h-[300px] md:h-[400px]';
      case 3: return 'md:col-span-7 h-[300px] md:h-[400px]';
      default: return 'md:col-span-6 h-[300px]';
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#0b081e] to-deepNavy flex flex-col justify-center items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-y-0 w-full z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-roseGold/5 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-6xl w-full z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-roseGold via-white to-gold">
            Beautiful Memories 📸
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-roseGold to-gold mx-auto rounded-full shadow-lg"></div>
          <p className="mt-4 text-gray-400 text-sm md:text-base font-light tracking-wider">
            Capturing the laughter, growth, and absolute brilliance of your journey.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{ 
                y: -6,
                boxShadow: "0 0 25px rgba(232, 160, 191, 0.35)"
              }}
              className={`${getColSpanClass(index)} relative group overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-300`}
            >
              {/* Outer Golden/Rose Gold Border Glow on Card Hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 rounded-2xl z-20 pointer-events-none transition-colors duration-300"></div>

              {/* Photo Image */}
              <img 
                src={photo.url} 
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deepNavy via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300 z-10"></div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  Memory #{photo.id}
                </span>
                <h3 className="font-serif text-lg md:text-xl text-white font-medium tracking-wide">
                  {photo.caption}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

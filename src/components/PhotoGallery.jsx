import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';

export default function PhotoGallery() {
  const { photos } = birthdayData;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    
    // Blast small heart confetti upon opening the premium pop-up!
    const heart = confetti.shapeFromText({ text: '❤️' });
    const pinkHeart = confetti.shapeFromText({ text: '💖' });
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      shapes: [heart, pinkHeart],
      scalar: 2
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <section className="relative min-h-screen py-24 px-4 bg-transparent flex flex-col justify-center items-center overflow-hidden">
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
              onClick={() => handlePhotoClick(photo)}
              whileHover={{ 
                y: -6,
                boxShadow: "0 0 25px rgba(232, 160, 191, 0.35)"
              }}
              className={`${getColSpanClass(index)} relative group overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-300 cursor-pointer`}
            >
              {/* Outer Golden/Rose Gold Border Glow on Card Hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 rounded-2xl z-25 pointer-events-none transition-colors duration-300"></div>

              {/* Blurred background image for elegant letterbox spacing */}
              <img 
                src={photo.url} 
                alt=""
                className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-30 scale-110 pointer-events-none z-0"
              />

              {/* Photo Image */}
              <img 
                src={photo.url} 
                alt={photo.alt}
                className="relative z-10 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02] filter brightness-95 group-hover:brightness-100"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deepNavy via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300 z-20"></div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
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

      {/* Premium Full-Screen Love Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
          >
            {/* Background decorative glows inside modal */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#e8a0bf]/15 blur-[120px]"></div>
              <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-[#ffd700]/10 blur-[120px]"></div>
            </div>

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.92, y: 15, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                transition: { type: "spring", stiffness: 120, damping: 20 }
              }}
              exit={{ scale: 0.92, y: 15, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-2xl rounded-3xl glass-panel border border-white/10 p-6 md:p-10 flex flex-col items-center shadow-2xl bg-gradient-to-b from-white/[0.03] to-transparent"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-roseGold/20 hover:border-roseGold/40 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer group"
                aria-label="Close"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Displayed Image Frame */}
              <div className="relative w-full max-h-[48vh] overflow-hidden rounded-2xl border border-white/5 shadow-inner mb-6 bg-[#030209]/40 flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.alt}
                  className="max-w-full max-h-[46vh] object-contain rounded-2xl select-none"
                />
              </div>

              {/* Love Message Section */}
              <div className="text-center flex flex-col items-center">
                
                {/* Heart Icon with Pulse */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="mb-2 text-roseGold drop-shadow-[0_0_10px_rgba(232,160,191,0.6)]"
                >
                  <Heart className="w-8 h-8 fill-roseGold text-roseGold" />
                </motion.div>

                {/* Shimmering "I LOVE YOU" */}
                <h3 className="font-serif text-4xl md:text-6xl font-bold tracking-widest text-shimmer animate-shimmer uppercase mb-1">
                  I Love You
                </h3>
                
                {/* Recipient Subtitle */}
                <p className="font-serif text-base md:text-xl text-gold/80 italic tracking-wider">
                  Gafrinnisha🫶❤️
                </p>
                
                {/* Selected Caption */}
                <p className="mt-3 font-sans text-xs md:text-sm text-gray-400 font-light tracking-wide uppercase">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

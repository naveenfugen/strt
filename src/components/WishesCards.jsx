import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function WishesCards() {
  const { wishes } = birthdayData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      }
    }
  };

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

  return (
    <section 
      id="wishes-section" 
      className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-deepNavy to-[#0b081e] flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-roseGold/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

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
          {wishes.map((wish) => {
            const IconComponent = Icons[wish.iconName] || Icons.Gift;
            return (
              <motion.div
                key={wish.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -12, 
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.25)",
                  borderColor: "rgba(255, 215, 0, 0.4)"
                }}
                className="relative glass-panel rounded-2xl p-8 border border-white/10 flex flex-col items-center text-center transition-all duration-300 group select-none"
              >
                {/* Decorative border top line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent rounded-t-2xl"></div>

                {/* Icon Container with Glow */}
                <div className="relative mb-6 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-xl bg-gold/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <IconComponent className="w-8 h-8 text-gold group-hover:text-gold-light transition-colors duration-300 relative z-10" />
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-xl md:text-2xl text-gold mb-3 font-semibold tracking-wide">
                  {wish.title}
                </h3>

                {/* Card Message */}
                <p className="font-sans text-sm md:text-base text-gray-300/90 leading-relaxed font-light">
                  {wish.message}
                </p>

                {/* Corner Decorative Dots */}
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-roseGold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

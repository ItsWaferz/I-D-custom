import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-black to-dark pb-20">
      {/* Decorative particles / shimmer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-dark rounded-full mix-blend-screen filter blur-[120px] opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-8 flex flex-col items-center text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.h1 variants={item} className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 sm:mb-4 leading-none tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#fceabb] via-[#f8b500] to-[#b38300] drop-shadow-sm">
              I&D Custom
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-base sm:text-lg md:text-2xl text-light-muted mb-10 sm:mb-8 max-w-xl mx-auto font-light">
            <span className="hidden sm:inline">Retapițare plafoane • Vopsire elemente plastic • Lumini ambientale</span>
            <span className="sm:hidden">Retapițare plafoane • Vopsire elemente plastic<br />Lumini ambientale</span>
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/calculator"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gold text-dark font-bold rounded-xl hover:bg-gold-light transition-colors duration-300 text-base sm:text-lg text-center"
            >
              Calculator Prețuri
            </Link>
            <Link
              to="/servicii"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-gold text-gold font-bold rounded-xl hover:bg-gold/10 transition-colors duration-300 text-base sm:text-lg text-center"
            >
              Vezi Servicii
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="text-gold w-8 h-8 opacity-70" />
      </motion.div>
    </section>
  );
};

export default Hero;

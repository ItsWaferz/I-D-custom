import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Acasă', path: '/' },
    { name: 'Servicii', path: '/servicii' },
    { name: 'Calculator', path: '/calculator', highlight: true },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#d4a853]'
                    : 'text-[#f5f5f5] hover:text-[#d4a853]'
                } ${link.highlight ? 'relative flex items-center' : ''}`}
              >
                {link.name}
                {link.highlight && (
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-[#d4a853]/10 text-[#d4a853] border border-[#d4a853]/30 rounded-full">
                    NOU
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#f5f5f5] hover:text-[#d4a853] focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#141414] border-b border-[#262626]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'text-[#d4a853] bg-[#0a0a0a]'
                      : 'text-[#f5f5f5] hover:text-[#d4a853] hover:bg-[#262626]/50'
                  } flex items-center justify-between`}
                >
                  {link.name}
                  {link.highlight && (
                    <span className="px-2 py-0.5 text-xs bg-[#d4a853]/10 text-[#d4a853] border border-[#d4a853]/30 rounded-full">
                      NOU
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

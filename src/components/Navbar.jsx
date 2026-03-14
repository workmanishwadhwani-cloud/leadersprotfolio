import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ setActiveAboutTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: update active nav link based on which section is in view
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'tools', 'insights'];
    const titleMap = { home: 'Home', about: 'About', services: 'Services', tools: 'Toolkit', insights: 'Insights' };

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting and closest to the top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveLink(titleMap[visible[0].target.id]);
        }
      },
      {
        rootMargin: '-80px 0px -40% 0px', // trigger when section is near top
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Toolkit', href: '#tools' },
    { title: 'Insights', href: '#insights' },
  ];

  const handleScrollTo = (e, href, title) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(title);
      setIsMenuOpen(false);
    }
  };

  const aboutCategories = [
    "My Vision",
    "Leadership Journey",
    "Impact Gallery"
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full max-w-6xl transition-all duration-500 rounded-full border border-white/10 ${isScrolled
          ? 'bg-black/60 backdrop-blur-xl py-2 px-6 shadow-2xl'
          : 'bg-white/5 backdrop-blur-md py-3 px-8'
          }`}
      >
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleScrollTo(e, '#home', 'Home')}
          >
            {/* Logo Image */}
            <motion.div
              whileHover={{ scale: 1.08, boxShadow: '0 0 0 2px rgba(212,175,55,0.7), 0 6px 24px rgba(0,0,0,0.4)' }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: '10px' }}
            >
              <Logo size={50} />
            </motion.div>

            {/* Gold vertical divider */}
            <div style={{
              width: '1.5px',
              height: '36px',
              background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)',
              opacity: 0.7,
              flexShrink: 0,
            }} />

            {/* Brand text */}
            <div className="flex flex-col leading-tight">
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#ffffff',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}>
                Dinesh Wadhwani
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                color: '#D4AF37',
                textTransform: 'uppercase',
                lineHeight: 1.4,
                marginTop: '2px',
              }}>
                Executive Coach
              </span>
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.title}
                className="relative group"
                onMouseEnter={() => setHoveredLink(link.title)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <motion.a
                  href={link.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9, color: '#d4af37' }}
                  onClick={(e) => handleScrollTo(e, link.href, link.title)}
                  className={`relative text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 block py-2 flex items-center gap-1 ${activeLink === link.title ? 'text-accent' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {link.title}
                  {link.title === 'About' && <ChevronDown size={12} className="relative top-[1px]" />}
                  {activeLink === link.title && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-px bg-accent"
                    />
                  )}
                  <span className={`absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 ${activeLink !== link.title ? 'group-hover:w-full' : ''}`} />
                </motion.a>

                {/* Dropdown for About */}
                {link.title === 'About' && (
                  <AnimatePresence>
                    {hoveredLink === 'About' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64"
                      >
                        <div className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden">
                          {aboutCategories.map((cat, idx) => (
                            <a
                              key={idx}
                              href="#about"
                              onClick={(e) => {
                                setActiveAboutTab(cat);
                                handleScrollTo(e, '#about', 'About');
                                setHoveredLink(null);
                              }}
                              className="block px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                            >
                              {cat}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <div className="h-6 w-px bg-white/10 mx-2" />
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)" }}
              whileTap={{ scale: 0.95, y: 1 }}
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact', '')}
              className="btn btn-primary text-xs px-6 py-2.5 rounded-full shadow-lg shadow-accent/20 font-black uppercase tracking-widest"
            >
              Book Now
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full mt-4 left-0 right-0 bg-black/95 backdrop-blur-2xl p-8 md:hidden rounded-3xl border border-white/10 flex flex-col gap-6 shadow-3xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <div key={link.title}>
                  <motion.a
                    href={link.href}
                    whileTap={{ scale: 0.9, x: 10 }}
                    className={`block text-2xl font-black uppercase tracking-tight transition-colors ${activeLink === link.title ? 'text-accent' : 'text-white/60 hover:text-accent'
                      }`}
                    onClick={(e) => {
                      if (link.title !== 'About') setIsMenuOpen(false);
                      handleScrollTo(e, link.href, link.title);
                    }}
                  >
                    {link.title}
                  </motion.a>

                  {/* Mobile Dropdown Sub-links */}
                  {link.title === 'About' && (
                    <div className="ml-4 mt-4 pl-4 border-l border-white/10 space-y-3">
                      {aboutCategories.map((cat, idx) => (
                        <a
                          key={idx}
                          href="#about"
                          onClick={(e) => {
                            setActiveAboutTab(cat);
                            handleScrollTo(e, '#about', 'About');
                          }}
                          className="block text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white"
                        >
                          {cat}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="btn btn-primary justify-center mt-4 py-4 text-sm font-black uppercase"
                onClick={(e) => {
                  handleScrollTo(e, '#contact', '');
                }}
              >
                Book a Consultation
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;

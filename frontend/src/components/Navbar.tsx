import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MaterialIcon } from './MaterialIcon';
import { navSlideDown } from '@/animations/variants';
import { usePortfolioStore } from '@/store/portfolioStore';

const navLinks = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

export function Navbar() {
  const { activeSection, mobileMenuOpen, toggleMobileMenu } = usePortfolioStore();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <motion.header
      variants={navSlideDown}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface-container-lowest/80 backdrop-blur-xl shadow-2xl shadow-primary/10' : 'bg-transparent'
      }`}
    >
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto font-headline tracking-tight">
        <div className="text-xl font-bold tracking-tighter text-on-surface cursor-pointer" onClick={() => scrollToSection('hero')}>
          Yamlak Negash<span className="text-primary">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`transition-colors ${
                activeSection === link.id
                  ? 'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="text-on-surface-variant hover:text-primary transition-all duration-300 flex items-center"
            aria-label="Toggle Theme"
          >
            <MaterialIcon icon={theme === 'dark' ? 'light_mode' : 'dark_mode'} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
             <button
                onClick={toggleTheme}
                className="text-on-surface-variant hover:text-primary transition-all duration-300 mr-4"
              >
                <MaterialIcon icon={theme === 'dark' ? 'light_mode' : 'dark_mode'} />
            </button>
          <button
            onClick={toggleMobileMenu}
            className="text-on-surface-variant hover:text-on-surface transition-all duration-300"
          >
            <MaterialIcon icon={mobileMenuOpen ? 'close' : 'menu'} size="28px" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/30"
          >
             <div className="flex flex-col items-center py-6 space-y-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-lg font-headline ${
                      activeSection === link.id
                        ? 'text-primary font-bold'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

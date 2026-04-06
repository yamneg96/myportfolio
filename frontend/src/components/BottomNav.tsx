import { motion } from 'framer-motion';
import { MaterialIcon } from './MaterialIcon';
import { usePortfolioStore } from '@/store/portfolioStore';

const navItems = [
  { name: 'Bio', id: 'hero', icon: 'person' },
  { name: 'Builds', id: 'projects', icon: 'layers' },
  { name: 'Exp', id: 'experience', icon: 'terminal' },
  { name: 'Contact', id: 'contact', icon: 'mail' },
];

const socialItems = [
  { icon: 'code', href: 'https://github.com/yamneg96' },
  { icon: 'work', href: 'https://linkedin.com/' },
  { icon: 'flutter_dash', href: '#' },
  { icon: 'language', href: '#' },
];

export function BottomNav() {
  const { activeSection, setActiveSection, mobileMenuOpen, toggleMobileMenu } = usePortfolioStore();

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex lg:hidden bg-background backdrop-blur-2xl border-t border-outline-variant/20 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,112,235,0.1)] px-4 pb-6 pt-3 justify-around items-center">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeSection === item.id 
              ? 'text-primary bg-primary/10 animate-pulse-subtle' 
              : 'text-on-surface-variant hover:bg-surface-variant/30'
          }`}
        >
          <MaterialIcon 
            icon={item.icon} 
            filled={activeSection === item.id} 
            size="24px"
          />
          <span className={`text-[10px] font-headline uppercase tracking-widest mt-1 ${activeSection === item.id ? 'font-bold' : ''}`}>
            {item.name}
          </span>
        </button>
      ))}

      {/* Socials Minimized */}
      <div className="h-8 w-px bg-outline-variant/30 mx-1"></div>
      
      <div className="flex gap-2">
        {socialItems.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-on-surface-variant hover:text-primary transition-colors"
          >
            <MaterialIcon icon={social.icon} size="20px" />
          </a>
        ))}
      </div>
    </nav>
  );
}

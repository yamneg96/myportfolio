import { motion } from 'framer-motion';
import { useScrollReveal } from '@/animations/useScrollReveal';
import { SectionBadge } from '@/components/SectionBadge';
import { GlassCard } from '@/components/GlassCard';
import { GradientButton } from '@/components/GradientButton';
import { MaterialIcon } from '@/components/MaterialIcon';
import { useAbout, useSkills } from '@/hooks/usePortfolioData';
import { staggerContainer, fadeInUp, scaleIn } from '@/animations/variants';
import { toast } from 'sonner';

export function AboutSection() {
  const { data: aboutData, isLoading: isAboutLoading } = useAbout();
  const { data: skillsData, isLoading: isSkillsLoading } = useSkills();

  const sectionRef = useScrollReveal<HTMLElement>({ y: 50, opacity: 0, duration: 0.8 });

  // Map backend skill categories to frontend design cards
  const skillCards = [
    { id: 'frontend', title: 'Front-End', icon: 'web', colorClass: 'text-primary', borderClass: 'hover:border-primary/30' },
    { id: 'backend', title: 'Back-End', icon: 'database', colorClass: 'text-tertiary', borderClass: 'hover:border-tertiary/30' },
    { id: 'mobile', title: 'Mobile', icon: 'smartphone', colorClass: 'text-secondary', borderClass: 'hover:border-secondary/30' },
    { id: 'ai', title: 'AI/ML', icon: 'bolt', colorClass: 'text-primary', borderClass: 'hover:border-primary/50', extraBg: 'bg-surface-container-high' },
  ];

  return (
    <section id="about" className="px-8 max-w-7xl mx-auto pt-32 mb-32" ref={sectionRef}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left: Bio */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={staggerContainer}
          className="lg:col-span-5 space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <SectionBadge>Architect of Logic</SectionBadge>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-headline font-bold tracking-tighter leading-tight text-on-background">
            Yamlak <span className="text-primary">Negash</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-on-surface-variant font-light leading-relaxed">
            {isAboutLoading ? 'Loading profile...' : aboutData?.summary || "Synthesizing rigorous full-stack development with a passion for scalable ecosystems."}
          </motion.p>
          
          <motion.div variants={scaleIn}>
             <GlassCard className="p-6 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                <h3 className="font-headline text-lg font-bold mb-2 text-on-surface">The Philosophy</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  I treat code as a curated gallery piece. Every architecture is a structural dialogue between efficiency and elegance.
                </p>
             </GlassCard>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
            {aboutData?.resumeUrl ? (
                <a href={aboutData.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <GradientButton>Download CV</GradientButton>
                </a>
            ) : (
                <GradientButton onClick={() => toast.info("Resume document is being prepared. Please check back soon!")}>Download CV</GradientButton>
            )}
            
            <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-surface-container-highest px-8 py-3 rounded-xl font-bold text-on-surface hover:bg-surface-bright transition-colors active:scale-95 duration-300"
            >
              Get In Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Right: Skills Bento Grid */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={staggerContainer}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {skillCards.map((card, index) => {
            const categoryData = skillsData?.find(s => s.category.toLowerCase() === card.id);
            const items = categoryData?.items || [];

            return (
              <motion.div key={card.id} variants={fadeInUp} className={`p-8 bg-surface-container${index === 0 ? '-low' : ''} rounded-2xl border border-outline-variant/10 transition-all group overflow-hidden relative ${card.borderClass} ${card.extraBg || ''}`}>
                {card.id === 'ai' && (
                    <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                        <MaterialIcon icon="psychology" size="120px" />
                    </div>
                )}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <MaterialIcon icon={card.icon} className={`text-3xl ${card.colorClass}`} />
                  <h4 className="font-headline font-bold tracking-tight text-on-surface">{card.title}</h4>
                </div>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {isSkillsLoading ? (
                    <span className="text-xs text-on-surface-variant">Loading...</span>
                  ) : items.length > 0 ? (
                    items.map(skill => (
                      <span key={skill._id} className="px-3 py-1 bg-surface-container-highest text-[11px] rounded-full border border-outline-variant/20 tracking-wide">
                        {skill.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-on-surface-variant">No skills listed</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

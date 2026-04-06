import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '@/components/GlassCard';
import { MaterialIcon } from '@/components/MaterialIcon';
import { useExperience } from '@/hooks/usePortfolioData';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const { data: experienceData, isLoading } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  // Format dates: "2023 - Present"
  const formatDate = (start: string, end: string | null) => {
      const getYear = (dateStr: string) => new Date(dateStr).getFullYear();
      const startYear = getYear(start);
      const endYear = end ? getYear(end) : 'Present';
      return `${startYear} — ${endYear}`;
  };

  useEffect(() => {
    if (!containerRef.current || !lineRef.current || isLoading || !experienceData?.length) return;

    // Timeline line growth
    gsap.fromTo(lineRef.current, 
        { scaleY: 0, transformOrigin: 'top center' },
        { 
            scaleY: 1, 
            ease: 'none', 
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            } 
        }
    );

    // Timeline items staggered slide in
    const items = gsap.utils.toArray<HTMLElement>('.timeline-item');
    items.forEach((item, index) => {
      const isOdd = index % 2 !== 0;
      gsap.fromTo(item,
        { opacity: 0, x: isOdd ? 50 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [isLoading, experienceData]);

  return (
    <section id="experience" className="px-8 max-w-7xl mx-auto py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-on-surface">Professional Artifacts</h2>
          <p className="text-on-surface-variant mt-2 text-lg">A chronological blueprint of my career journey.</p>
        </div>
        <div className="text-5xl md:text-6xl font-headline font-black text-outline-variant/10 select-none">
          HISTORY
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-on-surface-variant py-20">Loading experience data...</div>
      ) : !experienceData || experienceData.length === 0 ? (
        <div className="text-center text-on-surface-variant py-20">No experience records found.</div>
      ) : (
        <div ref={containerRef} className="relative space-y-12 pl-6 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute inset-0 ml-5 md:mx-auto -translate-x-px md:translate-x-0 h-full w-0.5 pointer-events-none">
             <div className="w-full h-full bg-outline-variant/10"></div>
             <div ref={lineRef} className="absolute top-0 w-full h-full bg-gradient-to-b from-primary via-tertiary to-transparent scale-y-0"></div>
          </div>

          {experienceData.map((exp, index) => {
            // Cycle through colors based on index
            const colors = [
                { text: 'text-primary', border: 'border-primary/50', bg: 'shadow-[0_0_15px_rgba(133,173,255,0.3)]', hover: 'group-hover:border-primary/40', icon: 'work' },
                { text: 'text-tertiary', border: 'border-tertiary/50', bg: '', hover: 'group-hover:border-tertiary/40', icon: 'rocket_launch' },
                { text: 'text-secondary', border: 'border-secondary/50', bg: '', hover: 'group-hover:border-secondary/40', icon: 'school' }
            ];
            const theme = colors[index % colors.length];

            return (
              <div key={exp._id} className="timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between md:odd:flex-row-reverse group">
                
                {/* Node Icon */}
                <div className={`absolute -left-10 md:static flex items-center justify-center w-10 h-10 rounded-full border ${theme.border} bg-surface-container-high z-10 shrink-0 md:order-1 transition-transform group-hover:scale-110 duration-300 ${theme.bg}`}>
                  <MaterialIcon icon={theme.icon} className={`${theme.text} text-sm`} filled />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[calc(50%-3rem)] md:px-4">
                 <GlassCard className={`p-8 ${theme.hover} transition-all duration-500`}>
                  <div className="flex items-center justify-between mb-3 border-b border-outline-variant/10 pb-3">
                    <time className={`font-headline font-bold ${theme.text}`}>
                        {formatDate(exp.startDate, exp.endDate)}
                    </time>
                    <span className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase bg-surface-container-high px-2 py-1 rounded">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-on-surface">{exp.role}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-4">
                    {exp.description}
                  </p>
                 </GlassCard>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

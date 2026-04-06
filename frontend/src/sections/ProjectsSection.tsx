import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjects } from '@/hooks/usePortfolioData';
import { MaterialIcon } from '@/components/MaterialIcon';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const { data, isLoading } = useProjects({ limit: 10, featured: true });
  const projects = data?.data || [];
  const scrollRef = useRef<HTMLDivElement>(null);

  // Optional: GSAP Horizontal scroll mapped to vertical scroll can be complex for users on trackpads.
  // We'll stick to native snap scrolling for horizontal, as designed in `code.html`, 
  // but add a fade-in for the section.
  useEffect(() => {
    if (!scrollRef.current) return;
    
    gsap.fromTo(scrollRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: scrollRef.current,
            start: 'top 80%',
          }
        }
    );
  }, []);

  return (
    <section id="projects" className="pt-32 pb-20 overflow-hidden" ref={scrollRef}>
      {/* Header */}
      <div className="px-8 max-w-7xl mx-auto mb-16">
        <div className="font-mono uppercase tracking-[0.3em] text-[10px] mb-4 text-primary">
          Curated Exhibition
        </div>
        <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter mb-6 leading-none">
          Engineering <br /> <span className="gradient-text">Functional Art.</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl text-lg">
          Yamlak Negash's portfolio. A synergy of architectural precision and high-performance engineering across the digital landscape.
        </p>
      </div>

      {/* Horizontal Scroll Area */}
      {isLoading ? (
          <div className="px-8 max-w-7xl mx-auto text-on-surface-variant h-64 flex items-center">
              Loading projects exhibition...
          </div>
      ) : projects.length === 0 ? (
          <div className="px-8 max-w-7xl mx-auto text-on-surface-variant h-64 flex items-center">
              No projects available.
          </div>
      ) : (
        <div className="relative">
          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-8 px-8 md:px-[max(2rem,calc((100vw-80rem)/2))] pb-12 pt-4">
            {projects.filter(Boolean).map((project, idx) => (
              <ProjectCard key={project?._id || idx} project={project} index={idx} />
            ))}
          </div>
          
          {/* Custom Scroll Indicators */}
          <div className="flex justify-center mt-4 space-x-3">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-8 h-1 bg-surface-container-high rounded-full"></div>
             <div className="w-8 h-1 bg-surface-container-high rounded-full"></div>
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    // Map colors to projects sequentially for aesthetic variety
    const colors = [
        { text: 'text-primary', border: 'border-primary/20' },
        { text: 'text-tertiary', border: 'border-tertiary/20' },
        { text: 'text-primary-fixed', border: 'border-primary-fixed/20' },
        { text: 'text-secondary', border: 'border-secondary/20' },
        { text: 'text-tertiary-fixed', border: 'border-tertiary-fixed/20' },
    ];
    const theme = colors[index % colors.length];

    return (
        <article className="flex-none w-[85vw] md:w-[450px] snap-center">
            <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group h-full flex flex-col bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden hover:bg-surface-container transition-colors duration-500"
            >
                {/* Image */}
                <div className="h-64 relative overflow-hidden bg-surface-container-high">
                    {project?.image?.url ? (
                        <img 
                            src={project.image.url} 
                            alt={project.title || 'Project image'} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <MaterialIcon icon="image" size="48px" className="text-outline-variant opacity-30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent opacity-80"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                    <span className={`text-[10px] font-mono ${theme.text} uppercase tracking-widest mb-2`}>
                        {project?.techStack?.[0] || 'Project'}
                    </span>
                    <h3 className="text-2xl font-headline font-bold mb-3 text-on-surface">{project?.title || 'Unknown Title'}</h3>
                    <p className="text-on-surface-variant text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                        {project?.description}
                    </p>

                    {/* Tech Stack Bubbles */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.slice(0, 3).map((tech: string, i: number) => (
                            <span key={i} className={`px-3 py-1 bg-surface-variant/40 rounded-full text-[10px] ${theme.text} border ${theme.border}`}>
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="px-3 py-1 bg-surface-variant/40 rounded-full text-[10px] text-outline-variant">
                                +{project.techStack.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between mt-auto">
                        <a 
                            href={project?.liveLink || project?.githubLink || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex items-center ${theme.text} font-bold text-sm group/link`}
                        >
                            View Project
                            <MaterialIcon icon="arrow_forward" className="ml-2 text-sm group-hover/link:translate-x-1 transition-transform" />
                        </a>
                        
                        <div className="flex space-x-3 text-on-surface-variant">
                             {project?.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:text-on-surface transition-colors">
                                    <MaterialIcon icon="code" />
                                </a>
                             )}
                             {project?.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-on-surface transition-colors">
                                    <MaterialIcon icon="open_in_new" />
                                </a>
                             )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </article>
    );
}

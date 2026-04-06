import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import { useTextReveal } from '@/animations/useTextReveal';
import { MaterialIcon } from '@/components/MaterialIcon';
import { SectionBadge } from '@/components/SectionBadge';
import { GradientButton } from '@/components/GradientButton';

export function HeroSection() {
  const nameRef = useTextReveal<HTMLHeadingElement>({ delay: 0.2 });

  return (
    <section id="hero" className="relative min-h-[calc(100vh-160px)] flex items-center justify-center overflow-hidden">
      {/* Background Elements specific to Hero */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(0,112,235,0.15),_transparent_70%)]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_100%_100%,_rgba(133,173,255,0.05),_transparent_60%)]"></div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ITLtYIm1UPUDc_eFgtHTaHIrIRfrVx_XNnnv893DRI0CNQ35s92LBq2tiscDx26nx5aWEmgDJbuXqnuZW9n4Ot0LzH4wY3el_M7dGZSO-vRWcsqqH2P7yQxssUPfOMOZP6sQyijX0aj1zRgFISuGI3du3PNB7-AYQYUxcEV_GV3s1vBbsZn5Dz5TMWDbX0mQY9hlNtL5700mdutuy8sd3qvx4qK950YGGpwZgbcAtvQ3ZrCkT1JoJrv1Zk39BP9v9fraAh9YTWg"
          alt="Abstract tech background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="absolute inset-0 bg-surface opacity-[0.85]"></div>
      </div>

      {/* Content */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col items-center text-center"
      >
        <motion.div variants={fadeInUp} className="mb-6">
          <SectionBadge>Software Architecture & AI</SectionBadge>
        </motion.div>

        <h1 
          ref={nameRef}
          className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-on-background mb-6 leading-tight whitespace-nowrap"
        >
          Yamlak Negash
        </h1>

        <motion.p variants={fadeInUp} className="font-body text-xl md:text-3xl text-primary/80 font-light mb-8 max-w-3xl leading-relaxed">
          Full-Stack Software Engineer & <span className="text-on-surface font-semibold">AI Enthusiast</span>
        </motion.p>

        <motion.div variants={fadeInUp} className="max-w-2xl mb-12">
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            Building the next generation of scalable and AI-driven solutions. Crafting seamless digital experiences through modern engineering principles and architectural excellence.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-8">
          <GradientButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Projects
          </GradientButton>

          <div 
            className="flex flex-col items-center animate-float cursor-pointer group mt-8"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase mb-2 group-hover:text-primary transition-colors">
              Learn More
            </span>
            <MaterialIcon icon="keyboard_double_arrow_down" className="text-primary text-3xl" />
          </div>
        </motion.div>
      </motion.div>

      {/* Aesthetic Accent Cards (xl only) */}
      <div className="absolute right-0 bottom-20 translate-x-1/4 hidden xl:block opacity-40 hover:opacity-100 transition-opacity duration-500">
        <div className="surface-container p-6 rounded-2xl border-l-4 border-primary shadow-2xl glass-nav">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">System Status</span>
          </div>
          <div className="font-headline text-sm text-primary">Scalable Infrastructure Optimized</div>
        </div>
      </div>
      <div className="absolute left-10 top-40 -translate-x-1/2 hidden xl:block opacity-40 hover:opacity-100 transition-opacity duration-500">
        <div className="bg-surface-container-low p-8 rounded-full border border-outline-variant/20 h-40 w-40 flex items-center justify-center">
          <MaterialIcon icon="neurology" size="48px" className="text-primary/30" />
        </div>
      </div>
    </section>
  );
}

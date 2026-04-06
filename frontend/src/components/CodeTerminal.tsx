import { motion } from 'framer-motion';
import { fadeInUp } from '@/animations/variants';

export function CodeTerminal() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-xl border border-outline-variant/10 shadow-2xl"
    >
      {/* Status LED */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/40 shadow-[0_0_10px_#85adff]" />

      {/* Window Dots */}
      <div className="flex space-x-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-error-dim/40" />
        <div className="w-3 h-3 rounded-full bg-primary-dim/40" />
        <div className="w-3 h-3 rounded-full bg-tertiary-dim/40" />
      </div>

      {/* Code Content */}
      <code className="text-xs md:text-sm font-mono leading-relaxed space-y-1 block">
        <div className="text-primary-fixed">{'const architect = {'}</div>
        <div className="pl-4 text-on-surface-variant">
          name: <span className="text-tertiary">"Yamlak Negash"</span>,
        </div>
        <div className="pl-4 text-on-surface-variant">
          focus: [<span className="text-tertiary">"FullStack"</span>,{' '}
          <span className="text-tertiary">"Mobile"</span>,{' '}
          <span className="text-tertiary">"ML"</span>],
        </div>
        <div className="pl-4 text-on-surface-variant">
          philosophy: <span className="text-tertiary">"Clean-Code-As-Art"</span>,
        </div>
        <div className="pl-4 text-on-surface-variant">
          availability: <span className="text-secondary-fixed">true</span>
        </div>
        <div className="text-primary-fixed">{'};'}</div>
        <br />
        <div className="text-on-surface-variant italic">
          {'// Initializing project delivery...'}
        </div>
        <div className="text-primary-fixed">architect.deployProjects();</div>
      </code>
    </motion.div>
  );
}

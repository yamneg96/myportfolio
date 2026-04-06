import { motion } from 'framer-motion';
import { MaterialIcon } from './MaterialIcon';

export function SideNav() {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 flex-col items-center py-10 space-y-8 bg-surface-container-lowest z-40 border-r border-outline-variant/20 hidden lg:flex">
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-primary font-black mb-4 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        YN
      </motion.div>
      <div className="flex flex-col space-y-6 flex-1 justify-center">
        <SocialLink icon="code" label="GitHub" href="#" delay={0.3} />
        <SocialLink icon="flutter_dash" label="Twitter" href="#" delay={0.4} />
        <SocialLink icon="language" label="Portfolio" href="#" delay={0.5} />
        <SocialLink icon="work" label="LinkedIn" href="#" delay={0.6} />
      </div>
       <div className="rotate-90 origin-center whitespace-nowrap font-label uppercase text-[10px] tracking-widest text-on-surface-variant mt-20 pb-20">
            Developer Channels
        </div>
    </aside>
  );
}

function SocialLink({ icon, label, href, delay }: { icon: string; label: string; href: string; delay: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="text-on-surface-variant hover:bg-surface-variant transition-all p-3 rounded-xl group relative"
    >
      <MaterialIcon icon={icon} />
      <span className="absolute left-full ml-4 px-2 py-1 bg-surface-variant text-[10px] font-label uppercase tracking-widest text-on-surface opacity-0 group-hover:opacity-100 transition-opacity rounded whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.a>
  );
}

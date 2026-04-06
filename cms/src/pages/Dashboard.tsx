import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchExperience } from '../services/api';

export default function Dashboard() {
    const { data: projRes } = useQuery({ queryKey: ['projects'], queryFn: () => fetchProjects({ limit: 100 }) });
    const { data: expRes } = useQuery({ queryKey: ['experience'], queryFn: fetchExperience });

    const projects = projRes?.data || [];
    const experiences = expRes?.data || [];
    const featuredProjects = projects.filter(p => p.featured);
    const recentFeatured = featuredProjects[0] || projects[0];
    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full">
            {/* Hero Header */}
            <header className="mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <p className="text-primary font-label text-xs tracking-[0.2em] uppercase mb-4 font-bold">Core Overview</p>
                        <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-on-surface leading-tight">
                            Elevating <span className="text-primary-dim">Code</span> into <br />
                            Digital Architecture.
                        </h2>
                    </div>
                    
                    <div className="bg-surface-container/60 backdrop-blur-xl p-6 rounded-2xl flex items-center gap-6 border border-white/5">
                        <div className="text-right">
                            <p className="text-[10px] text-on-surface-variant uppercase font-label">System Status</p>
                            <p className="font-headline font-bold text-lg text-green-400">OPTIMIZED</p>
                        </div>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-400/10">
                            <span className="material-symbols-outlined text-green-400" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Grid (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {/* Total Projects */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-1 bg-surface-container rounded-3xl p-8 transition-transform duration-300 hover:scale-[1.02] hover:bg-surface-container-high shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-9xl">folder</span>
                    </div>
                    <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-2 font-bold">Total Projects</p>
                    <h3 className="text-4xl font-headline font-bold">{projects.length < 10 && projects.length > 0 ? `0${projects.length}` : projects.length}</h3>
                    <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-medium">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        <span>Synchronized</span>
                    </div>
                </motion.div>

                {/* Featured Projects */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-1 bg-surface-container-high rounded-3xl p-8 transition-transform duration-300 hover:scale-[1.02] shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-9xl">star</span>
                    </div>
                    <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-2 font-bold">Featured</p>
                    <h3 className="text-4xl font-headline font-bold text-primary">{featuredProjects.length < 10 && featuredProjects.length > 0 ? `0${featuredProjects.length}` : featuredProjects.length}</h3>
                    <div className="mt-4 flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        <span>Public facing</span>
                    </div>
                </motion.div>

                {/* Professional Experiences */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2 bg-surface-container rounded-3xl p-8 transition-transform duration-300 hover:scale-[1.02] hover:bg-surface-container-high shadow-sm relative overflow-hidden flex justify-between items-center group cursor-pointer"
                >
                    <div>
                        <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-2 font-bold">Experiences</p>
                        <h3 className="text-4xl font-headline font-bold">{experiences.length < 10 && experiences.length > 0 ? `0${experiences.length}` : experiences.length}</h3>
                        <p className="mt-4 text-on-surface-variant text-sm max-w-[180px]">Positions held at top-tier architectural firms.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface">hub</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface">deployed_code</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface">layers</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface">architecture</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Asymmetric Section: Recent Projects & Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Project Showcase */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl font-headline font-bold">Featured Production</h4>
                        <button className="text-primary font-label text-xs uppercase font-bold hover:underline decoration-2 underline-offset-4 transition-all">
                            View All Work
                        </button>
                    </div>
                    <div className="relative group rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[2/1] shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1200" 
                            alt="Project Preview" 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-[#060e20]/60 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="flex items-center gap-3 mb-3">
                                {recentFeatured?.featured && (
                                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">Featured</span>
                                )}
                                <span className="px-3 py-1 rounded-full bg-white/10 text-on-surface text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                    {recentFeatured?.techStack?.slice(0, 2).join(' • ') || 'No tech stack'}
                                </span>
                            </div>
                            <h5 className="text-3xl font-headline font-bold mb-2 text-white">{recentFeatured?.title || 'No Project Found'}</h5>
                            <p className="text-slate-300 max-w-lg mb-6 text-sm">{recentFeatured?.description || 'Synchronize Database to view projects.'}</p>
                            
                            <div className="flex gap-4">
                                <button className="px-6 py-2 bg-gradient-to-r from-primary-dim to-primary rounded-xl font-bold text-sm text-on-primary shadow-lg shadow-primary/20">
                                    Project Details
                                </button>
                                <button className="px-6 py-2 bg-surface-variant/40 backdrop-blur-md rounded-xl font-bold text-sm border border-white/10 text-white hover:bg-surface-variant/70 transition-colors">
                                    Edit Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="lg:col-span-1">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-headline font-bold">Activity Feed</h4>
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    </div>
                    
                    <div className="bg-surface-container rounded-3xl p-6 h-[calc(100%-3rem)] flex flex-col">
                        <div className="flex-1 space-y-6">
                            {/* Item 1 */}
                            <div className="flex gap-4 group">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                        <span className="material-symbols-outlined text-xl">edit_square</span>
                                    </div>
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-outline-variant/30"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Project Updated</p>
                                    <p className="text-xs text-on-surface-variant mt-1">Modified "Quant Edge" assets and metadata.</p>
                                    <p className="text-[10px] text-primary/60 mt-2 font-bold tracking-wider">2 HOURS AGO</p>
                                </div>
                            </div>
                            
                            {/* Item 2 */}
                            <div className="flex gap-4 group">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                                        <span className="material-symbols-outlined text-xl">psychology</span>
                                    </div>
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-outline-variant/30"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Skill Verification</p>
                                    <p className="text-xs text-on-surface-variant mt-1">Added "System Architecture" to core skills.</p>
                                    <p className="text-[10px] text-tertiary/60 mt-2 font-bold tracking-wider">6 HOURS AGO</p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors flex-shrink-0">
                                    <span className="material-symbols-outlined text-xl">publish</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Live Deployment</p>
                                    <p className="text-xs text-on-surface-variant mt-1">Portfolio v2.4.1 pushed to production.</p>
                                    <p className="text-[10px] text-green-400/60 mt-2 font-bold tracking-wider">YESTERDAY</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-surface-variant/20 rounded-xl text-on-surface-variant text-xs font-bold uppercase tracking-widest hover:bg-surface-variant/50 hover:text-white transition-colors mt-6 border border-white/5">
                            Show Full History
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Tech Stack Banner */}
            <section className="mt-8 bg-surface-container-low/50 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5">
                <div className="flex flex-wrap items-center justify-between gap-8">
                    <div>
                        <h4 className="text-xl font-headline font-bold">Tech Ecosystem</h4>
                        <p className="text-sm text-on-surface-variant mt-1">Infrastructure frameworks utilized actively.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-5 py-2 bg-surface-container rounded-full hover:bg-primary/10 transition-colors cursor-pointer border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-sm font-semibold">TypeScript</span>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-2 bg-surface-container rounded-full hover:bg-primary/10 transition-colors cursor-pointer border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                            <span className="text-sm font-semibold">React Native</span>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-2 bg-surface-container rounded-full hover:bg-primary/10 transition-colors cursor-pointer border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            <span className="text-sm font-semibold">Next.js App Router</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

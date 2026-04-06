import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchProjects } from '../services/api';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description needs at least 10 characters'),
  liveUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  technologies: z.string(), // We will split this string by comma in a real scenario
  featured: z.boolean().default(false),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ManageProjects() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Fetch projects
    const { data: response, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: () => fetchProjects({ limit: 10 }),
    });

    const projects = response?.data || [];
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: { featured: false }
    });

    const onSubmit = (data: ProjectFormValues) => {
        console.log("Submitting Project:", data);
        toast.success("Project Entry Deployed!");
        setIsModalOpen(false);
        reset();
    };

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full relative">
            {/* Page Header */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <span className="text-primary font-label text-xs tracking-[0.2em] uppercase mb-4 block font-bold">Archive Management</span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter">
                        Projects <span className="text-slate-500">Inventory</span>
                    </h2>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-semibold hover:bg-surface-variant transition-colors flex items-center gap-2 border border-white/5 shadow-sm">
                        <span className="material-symbols-outlined text-lg">filter_list</span>
                        Filter
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-dim to-primary text-on-primary font-bold flex items-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Add Project
                    </button>
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="p-6 bg-surface-container-low rounded-xl border-l-[3px] border-primary border-t border-r border-b border-white/5">
                    <p className="text-xs text-on-surface-variant font-label tracking-wider mb-2 font-bold uppercase">Total Repos</p>
                    <h3 className="text-3xl font-headline font-bold">24</h3>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl border-l-[3px] border-tertiary border-t border-r border-b border-white/5">
                    <p className="text-xs text-on-surface-variant font-label tracking-wider mb-2 font-bold uppercase">Featured</p>
                    <h3 className="text-3xl font-headline font-bold">06</h3>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl border-l-[3px] border-secondary border-t border-r border-b border-white/5">
                    <p className="text-xs text-on-surface-variant font-label tracking-wider mb-2 font-bold uppercase">Live Demos</p>
                    <h3 className="text-3xl font-headline font-bold">18</h3>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl border-l-[3px] border-outline border-t border-r border-b border-white/5">
                    <p className="text-xs text-on-surface-variant font-label tracking-wider mb-2 font-bold uppercase">Drafts</p>
                    <h3 className="text-3xl font-headline font-bold">02</h3>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-surface-container-low border border-white/5 rounded-2xl overflow-x-auto shadow-2xl">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-surface-container/50 border-b border-white/5">
                            <th className="px-8 py-5 text-xs font-label text-slate-400 tracking-widest uppercase font-bold">Project Identity</th>
                            <th className="px-8 py-5 text-xs font-label text-slate-400 tracking-widest uppercase font-bold">Tech Stack</th>
                            <th className="px-8 py-5 text-xs font-label text-slate-400 tracking-widest uppercase font-bold text-center">Featured</th>
                            <th className="px-8 py-5 text-xs font-label text-slate-400 tracking-widest uppercase font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {isLoading ? (
                            <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">Loading configurations...</td></tr>
                        ) : projects.length === 0 ? (
                            <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">No projects synchronized.</td></tr>
                        ) : projects.map((project) => (
                            <tr key={project._id} className="hover:bg-surface-container transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden shrink-0">
                                            <img 
                                                src={project.image || "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=200"} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-bold text-lg text-slate-200">{project.title}</h4>
                                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{project.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.slice(0, 3).map((tech, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-surface-container-high text-[10px] text-primary font-mono uppercase rounded-md border border-primary/10">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    {project.featured ? (
                                        <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-slate-700">star</span>
                                    )}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-primary/10 hover:text-primary transition-all rounded-lg text-slate-500">
                                            <span className="material-symbols-outlined text-xl">edit_square</span>
                                        </button>
                                        <button className="p-2 hover:bg-error/10 hover:text-error transition-all rounded-lg text-slate-500">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-8 py-4 bg-surface-container/30 flex justify-between items-center text-xs font-label">
                    <p className="text-slate-500 uppercase tracking-widest">Showing {projects.length} Entries</p>
                </div>
            </div>

            {/* Modal for Add Project */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#060e20]/80 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="w-full max-w-4xl bg-surface-container shadow-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row relative max-h-[90vh]"
                        >
                            {/* Left Side: Visual */}
                            <div className="hidden md:flex md:w-1/3 bg-surface-container-high p-10 flex-col justify-between overflow-hidden relative border-r border-white/5">
                                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150"></div>
                                <div className="relative z-10">
                                    <span className="text-xs font-label tracking-widest text-primary uppercase font-bold">New Archive Entry</span>
                                    <h3 className="text-4xl font-headline font-bold tracking-tighter mt-4 leading-none text-on-surface">Architecting <br/><span className="text-primary-dim">the Future</span></h3>
                                </div>
                                <div className="relative z-10 mt-20">
                                    <div className="flex items-center gap-3 text-xs font-label text-slate-400">
                                        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center border border-white/10">
                                            <span className="material-symbols-outlined text-sm">cloud_upload</span>
                                        </div>
                                        <span>Assets optimized on deploy.</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Side: Form */}
                            <div className="w-full md:w-2/3 p-8 lg:p-10 overflow-y-auto">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-headline font-bold">Project Blueprint</h2>
                                    <button onClick={() => { setIsModalOpen(false); reset(); }} className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-label text-slate-400 tracking-widest uppercase ml-1 font-bold">Project Title</label>
                                            <Input 
                                                {...register('title')} 
                                                className="w-full bg-surface-container-low border border-white/5 rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface" 
                                                placeholder="e.g. Neon Horizon" 
                                            />
                                            {errors.title && <p className="text-error text-xs ml-1">{errors.title.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-label text-slate-400 tracking-widest uppercase ml-1 font-bold">Live URL</label>
                                            <Input 
                                                {...register('liveUrl')} 
                                                className="w-full bg-surface-container-low border border-white/5 rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface" 
                                                placeholder="https://..." 
                                            />
                                            {errors.liveUrl && <p className="text-error text-xs ml-1">{errors.liveUrl.message}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-label text-slate-400 tracking-widest uppercase ml-1 font-bold">Narrative Description</label>
                                        <textarea 
                                            {...register('description')} 
                                            className="w-full bg-surface-container-low border border-white/5 rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface resize-none" 
                                            placeholder="Describe the technical challenges..." rows={4} 
                                        />
                                        {errors.description && <p className="text-error text-xs ml-1">{errors.description.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-label text-slate-400 tracking-widest uppercase ml-1 font-bold">Technologies (comma separated)</label>
                                        <Input 
                                            {...register('technologies')} 
                                            className="w-full bg-surface-container-low border border-white/5 rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface" 
                                            placeholder="React, Node, Tailwind..." 
                                        />
                                        {errors.technologies && <p className="text-error text-xs ml-1">{errors.technologies.message}</p>}
                                    </div>

                                    <div className="flex items-center gap-6 pt-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" {...register('featured')} className="w-5 h-5 rounded bg-surface-container-low border-white/10 text-primary focus:ring-primary bg-transparent rounded-md focus:ring-offset-background" />
                                            <span className="text-xs font-label text-slate-300 tracking-widest uppercase font-bold">Featured on Hero</span>
                                        </label>
                                    </div>

                                    <div className="flex gap-4 pt-4 mt-4 border-t border-white/5">
                                        <Button 
                                            variant="outline"
                                            type="button" 
                                            onClick={() => { setIsModalOpen(false); reset(); }} 
                                            className="flex-1 py-3.5 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-variant transition-colors border border-white/5"
                                        >
                                            Discard
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            className="flex-[2] py-3.5 bg-gradient-to-r from-primary-dim to-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                                        >
                                            Deploy Project Entry
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

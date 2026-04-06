import { useQuery } from '@tanstack/react-query';
import { fetchSkills } from '../services/api';
import type { Skill } from '../types';

export default function ManageSkills() {
    const { data: response, isLoading } = useQuery({
        queryKey: ['skills'],
        queryFn: fetchSkills,
    });

    const skills: Skill[] = response?.data || [];

    // Assuming our skills API might just return a flat array or categorized arrays.
    // We'll mimic the grouping from the design: Front-End, Back-End, Core Infrastructure.
    // In a real application, standardizing this through the backend model is ideal.
    const getSkillsByCategory = (cat: string) => {
        return skills.filter(s => s.category?.toLowerCase().includes(cat.toLowerCase()));
    };

    const categories = [
        { title: "Front-End Architecture", catId: "frontend", icon: "web", colorClass: "text-primary border-primary", bgClass: "bg-primary" },
        { title: "Back-End Logic", catId: "backend", icon: "database", colorClass: "text-tertiary border-tertiary", bgClass: "bg-tertiary" },
        { title: "Core Infrastructure", catId: "tools", icon: "terminal", colorClass: "text-secondary border-secondary", bgClass: "bg-secondary" },
    ];

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full relative">
            {/* Hero Section */}
            <div className="mb-12">
                <div className="flex items-baseline justify-between mb-2">
                    <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-on-surface">
                        Skill <span className="bg-gradient-to-r from-primary-dim to-primary text-transparent bg-clip-text">Matrix</span>
                    </h2>
                    <span className="text-[10px] font-mono text-outline-variant tracking-widest uppercase bg-surface-container px-3 py-1 rounded-full border border-white/5">
                        v2.0.4 Stable
                    </span>
                </div>
                <p className="text-on-surface-variant max-w-2xl font-light text-sm md:text-lg">
                    Curate and architect your technical arsenal. Use categories to group expertise and chips to define specific competencies.
                </p>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {isLoading && <div className="col-span-12 p-8 text-center text-outline-variant">Synchronizing matrix...</div>}
                {!isLoading && categories.map((cat, i) => {
                    const mappedSkills = getSkillsByCategory(cat.catId);
                    
                    return (
                        <div key={i} className={`col-span-12 ${i === 0 ? 'lg:col-span-7' : 'lg:col-span-5'} bg-surface-container/60 backdrop-blur-xl p-8 rounded-2xl border border-white/5 relative overflow-hidden group`}>
                            {i === 0 && <div className="absolute top-0 right-0 w-32 h-32 bg-primary-dim/5 blur-3xl rounded-full -mr-16 -mt-16"></div>}
                            
                            <div className="flex justify-between items-start mb-8 z-10 relative">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`material-symbols-outlined text-sm ${cat.colorClass.split(' ')[0]}`}>{cat.icon}</span>
                                        <h3 className="font-headline text-2xl font-semibold tracking-tight">{cat.title}</h3>
                                    </div>
                                    <p className="text-sm text-outline-variant">Domain expertise grouping</p>
                                </div>
                                <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all border border-white/5">
                                    <span className="material-symbols-outlined text-sm">settings_suggest</span>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3 z-10 relative">
                                {mappedSkills.flatMap(category => category.items).map(skillItem => (
                                    <div key={skillItem._id} className="group/chip flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest px-4 py-2 rounded-full border border-white/5 transition-all cursor-default shadow-sm hover:border-error/20">
                                        <span className="text-sm font-medium">{skillItem.name}</span>
                                        <button className="opacity-50 hover:opacity-100 transition-opacity text-error pl-1 border-l border-white/5 ml-1">
                                            <span className="material-symbols-outlined text-sm pt-0.5">close</span>
                                        </button>
                                    </div>
                                ))}

                                {mappedSkills.flatMap(category => category.items).length === 0 && (
                                    <div className="text-sm text-outline-variant italic">No skills defined in this matrix layer yet.</div>
                                )}

                                <button className={`flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-outline-variant/30 text-outline-variant hover:${cat.colorClass.split(' ')[0]} transition-all group/add hover:border-current`}>
                                    <span className="material-symbols-outlined text-sm group-hover/add:rotate-90 transition-transform">add</span>
                                    <span className="text-sm font-medium">Add Skill</span>
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* Add New Category CTA */}
                <div className="col-span-12 lg:col-span-12 bg-transparent p-8 rounded-2xl border border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center group hover:border-primary/50 hover:bg-surface-container/20 transition-all min-h-[220px] cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-surface-containerflex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all border border-white/5">
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-3xl">add_circle</span>
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2">Initialize Category</h3>
                    <p className="text-sm text-outline-variant max-w-xs mb-6">Create a new domain for your skills. Architecture, Soft Skills, or Design Thinking.</p>
                </div>
            </div>

            {/* Floating Action Button (Save) */}
            <div className="fixed bottom-8 right-8 z-[100]">
                <button className="flex items-center gap-2 bg-gradient-to-r from-primary-dim to-primary px-6 py-3 rounded-full text-on-primary font-bold shadow-2xl transition-all hover:scale-105 active:scale-95">
                    <span className="material-symbols-outlined text-lg">save</span>
                    Deploy Matrix
                </button>
            </div>
        </div>
    );
}


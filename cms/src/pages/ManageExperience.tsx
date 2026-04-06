import { useQuery } from '@tanstack/react-query';
import { fetchExperience } from '../services/api';
import type { Experience } from '../types';

export default function ManageExperience() {
    const { data: response, isLoading } = useQuery({
        queryKey: ['experience'],
        queryFn: fetchExperience,
    });

    const experiences: Experience[] = response?.data || [];

    return (
        <div className="p-8 lg:p-12 max-w-5xl mx-auto w-full">
            {/* Hero Header Section */}
            <section className="mb-16 relative">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full point-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-[10px] font-headline uppercase tracking-[0.3em] text-primary mb-4 block font-bold">Professional History</span>
                        <h1 className="text-5xl md:text-6xl font-headline font-bold tracking-tighter text-on-surface leading-none">
                            Experience<span className="text-primary">.</span>
                        </h1>
                    </div>
                    <button className="group relative px-6 py-3.5 bg-gradient-to-br from-primary-dim to-primary rounded-xl overflow-hidden shadow-xl shadow-primary/20 transition-all duration-300 active:scale-95">
                        <span className="relative z-10 font-headline font-bold text-on-primary flex items-center gap-2 uppercase tracking-widest text-xs">
                            <span className="material-symbols-outlined text-sm">add</span>
                            New Record
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                </div>
            </section>

            {/* Experience Timeline Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Timeline Visualization (sidebar line) */}
                <div className="hidden lg:block lg:col-span-1 relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-outline-variant/20 to-transparent"></div>
                    <div className="sticky top-32 space-y-[12rem] pt-10">
                        {experiences.map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full mx-auto relative z-10 ${i === 0 ? 'bg-primary ring-4 ring-primary/20' : 'bg-outline-variant'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Main Experience List */}
                <div className="lg:col-span-11 space-y-12">
                    {isLoading ? (
                        <div className="text-center text-on-surface-variant p-8">Loading timelines...</div>
                    ) : experiences.length === 0 ? (
                        <div className="text-center text-on-surface-variant p-8">No experiences recorded yet.</div>
                    ) : experiences.map((exp, idx) => (
                        <div key={exp._id} className="group relative">
                            <div className="absolute -inset-4 bg-surface-container/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 border border-white/5"></div>
                            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
                                <div className="flex-shrink-0 hidden md:block">
                                    <div className={`w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center p-3 ${idx === 0 ? '' : 'opacity-60'}`}>
                                        <span className={`material-symbols-outlined text-3xl ${idx === 0 ? 'text-primary' : 'text-slate-400'}`}>
                                            {idx === 0 ? 'token' : 'terminal'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                        <h3 className={`text-2xl font-headline font-bold text-on-surface ${idx === 0 ? '' : 'opacity-80'}`}>
                                            {exp.role}
                                        </h3>
                                        <span className={`text-xs font-mono px-3 py-1 rounded-full uppercase tracking-tighter ${idx === 0 ? 'text-primary bg-primary/10' : 'text-on-surface-variant bg-surface-container'}`}>
                                            {new Date(exp.startDate).getFullYear()} &mdash; {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                                        </span>
                                    </div>
                                    <div className={`font-medium text-lg mb-4 tracking-tight ${idx === 0 ? 'text-primary-dim' : 'text-on-surface-variant'}`}>
                                        {exp.company}
                                    </div>
                                    <p className={`leading-relaxed mb-6 max-w-2xl text-sm ${idx === 0 ? 'text-on-surface-variant' : 'text-on-surface-variant/70'}`}>
                                        {exp.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 mt-2">
                                        <button className="text-xs font-headline font-bold uppercase tracking-widest text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                            Edit Entry <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </button>
                                        <button className="text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">delete</span> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

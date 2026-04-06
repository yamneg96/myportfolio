import { useQuery } from '@tanstack/react-query';
import { fetchAbout } from '../services/api';
import type { About } from '../types';

export default function ManageAbout() {
    const { data: response, isLoading } = useQuery({
        queryKey: ['about'],
        queryFn: fetchAbout,
    });

    const about: About | undefined = response?.data;

    return (
        <div className="p-8 lg:p-10 max-w-6xl mx-auto w-full">
            {/* Editorial Header Section */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary border-b-2 border-primary/30 pb-1">Profile Identity</span>
                    <h2 className="text-5xl md:text-6xl font-headline font-bold tracking-tighter text-on-surface">
                        About <span className="text-primary">Section</span>
                    </h2>
                    <p className="text-on-surface-variant max-w-xl text-lg font-light leading-relaxed">
                        Craft your professional narrative. This information will be displayed on the public-facing portfolio to define your brand and technical expertise.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-xl bg-surface-container text-on-surface font-medium hover:bg-surface-container-high transition-colors border border-white/5">
                        Discard
                    </button>
                    <button className="px-8 py-2.5 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-on-primary font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                        Save Changes
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="p-12 text-center text-outline-variant">Loading identity profile...</div>
            ) : (
                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column: Media & Branding */}
                    <div className="col-span-12 lg:col-span-4 space-y-8">
                        
                        {/* Profile Image Upload */}
                        <div className="bg-surface-container-low rounded-[2rem] p-8 relative overflow-hidden group border border-white/5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            <h3 className="text-sm font-headline font-semibold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>add_a_photo</span>
                                Identity Visual
                            </h3>
                            <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-6 bg-surface-container-highest group/img cursor-pointer border border-white/10">
                                <img 
                                    src={about?.avatar?.url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4"} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110 opacity-80 group-hover/img:opacity-100" 
                                    alt="Profile" 
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-white text-4xl mb-2">upload_file</span>
                                    <span className="text-xs text-white font-medium">Replace Image</span>
                                </div>
                            </div>
                            <p className="text-xs text-on-surface-variant text-center leading-relaxed">
                                Recommended: Square aspect ratio, min 800x800px. High contrast portraits work best.
                            </p>
                        </div>

                        {/* Social Links Ecosystem */}
                        <div className="bg-surface-container-low rounded-[2rem] p-8 border border-white/5">
                            <h3 className="text-sm font-headline font-semibold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">hub</span>
                                Social Ecosystem
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-outline-variant font-bold ml-1">GitHub URL</label>
                                    <div className="flex items-center bg-surface-container-lowest rounded-xl px-4 py-3 focus-within:ring-1 ring-primary/50 transition-all border border-white/5">
                                        <span className="material-symbols-outlined text-primary mr-3 text-lg">terminal</span>
                                        <input 
                                            type="text" 
                                            className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full p-0 outline-none" 
                                            defaultValue={about?.socialLinks?.github || ''}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-outline-variant font-bold ml-1">LinkedIn URL</label>
                                    <div className="flex items-center bg-surface-container-lowest rounded-xl px-4 py-3 focus-within:ring-1 ring-primary/50 transition-all border border-white/5">
                                        <span className="material-symbols-outlined text-primary mr-3 text-lg">link</span>
                                        <input 
                                            type="text" 
                                            className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full p-0 outline-none" 
                                            defaultValue={about?.socialLinks?.linkedin || ''}
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-outline-variant font-bold ml-1">Twitter / X</label>
                                    <div className="flex items-center bg-surface-container-lowest rounded-xl px-4 py-3 focus-within:ring-1 ring-primary/50 transition-all border border-white/5">
                                        <span className="material-symbols-outlined text-primary mr-3 text-lg">alternate_email</span>
                                        <input 
                                            type="text" 
                                            className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full p-0 outline-none" 
                                            defaultValue={about?.socialLinks?.twitter || ''}
                                            placeholder="https://twitter.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Biography & Technical Context */}
                    <div className="col-span-12 lg:col-span-8 space-y-8">
                        
                        {/* Main Bio Section */}
                        <div className="bg-surface-container-low rounded-[2rem] p-8 lg:p-10 border border-white/5">
                            <h3 className="text-sm font-headline font-semibold mb-8 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">edit_note</span>
                                Narrative Architecture
                            </h3>
                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] uppercase tracking-widest text-outline-variant font-bold ml-1">Hero Tagline</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl p-5 text-lg font-headline font-medium text-on-surface focus:ring-1 ring-primary/50 outline-none transition-all" 
                                        defaultValue={about?.title || ""}
                                        placeholder="Hero Tagline"
                                    />
                                    <p className="text-[11px] text-primary/70 ml-1">Keep it punchy. This appears directly under your name on the hero section.</p>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] uppercase tracking-widest text-outline-variant font-bold ml-1">Comprehensive Biography</label>
                                    </div>
                                    <textarea 
                                        className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl p-6 text-base font-body text-on-surface focus:ring-1 ring-primary/50 transition-all resize-none outline-none leading-relaxed min-h-[200px]" 
                                        defaultValue={about?.bio || ""}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-surface-container-low rounded-[2rem] p-8 group hover:bg-surface-container-high transition-colors border border-white/5 shadow-sm">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary/20 transition-colors">
                                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>alternate_email</span>
                                    </div>
                                </div>
                                <h4 className="text-sm font-headline font-bold mb-2">Direct Outreach (Email)</h4>
                                <input 
                                    type="email" 
                                    className="w-full bg-transparent border-none p-0 text-on-surface-variant focus:ring-0 focus:text-on-surface text-sm transition-colors outline-none" 
                                    defaultValue={about?.email || ''}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="bg-surface-container-low rounded-[2rem] p-8 group hover:bg-surface-container-high transition-colors border border-white/5 shadow-sm">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary/20 transition-colors">
                                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                                        <span className="text-[10px] text-error font-mono font-bold tracking-wider uppercase">Live Sync</span>
                                    </div>
                                </div>
                                <h4 className="text-sm font-headline font-bold mb-2">Home Base (Location)</h4>
                                <input 
                                    type="text" 
                                    className="w-full bg-transparent border-none p-0 text-on-surface-variant focus:ring-0 focus:text-on-surface text-sm transition-colors outline-none" 
                                    defaultValue={about?.location || ''}
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}


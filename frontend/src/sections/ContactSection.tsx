import { useScrollReveal } from '@/animations/useScrollReveal';
import { MaterialIcon } from '@/components/MaterialIcon';

export function ContactSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40, opacity: 0 });

  return (
    <section id="contact" className="pt-32 pb-20 px-8 max-w-7xl mx-auto" ref={sectionRef}>
      
      {/* Hero Section of Contact */}
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-label text-xs tracking-widest uppercase mb-6">
            Available for Work
          </span>
          <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-none mb-8">
            Let's build <span className="text-primary-dim italic">the future</span> together.
          </h2>
          <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed">
            Currently based in Addis Ababa. I'm open to full-time opportunities, freelance projects, and architectural collaborations.
          </p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <button className="bg-gradient-to-br from-primary-dim to-primary text-on-primary-fixed font-headline font-bold flex items-center gap-3 transition-transform active:scale-95 shadow-xl shadow-primary-dim/20 px-8 py-4 rounded-xl text-lg">
            <MaterialIcon icon="download" />
            Download Resume
          </button>
        </div>
      </div>

      {/* Bento Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Card */}
        <div className="lg:col-span-7 glass-panel rounded-[2rem] p-10 border border-outline-variant/10">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 group">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary text-on-surface py-3 px-0 placeholder:text-outline-variant transition-all font-body text-base outline-none"
                />
              </div>
              <div className="space-y-2 group">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary text-on-surface py-3 px-0 placeholder:text-outline-variant transition-all font-body text-base outline-none"
                />
              </div>
            </div>
            
            <div className="space-y-2 group">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">Message</label>
              <textarea 
                rows={4} 
                placeholder="Briefly describe your project or inquiry..."
                className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary text-on-surface py-3 px-0 placeholder:text-outline-variant transition-all resize-none font-body text-base outline-none"
              ></textarea>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                className="group flex items-center gap-4 text-primary font-headline font-bold uppercase tracking-widest text-sm hover:gap-6 transition-all"
              >
                Send Message
                <MaterialIcon icon="arrow_forward" />
              </button>
            </div>
          </form>
        </div>

        {/* Info & Map Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Location & Info Card */}
          <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10">
            <h3 className="font-headline text-xl font-bold mb-6 text-on-surface">Contact Information</h3>
            <div className="space-y-6">
              <InfoRow icon="mail" label="Email" value="yamlaknegash96@gmail.com" />
              <InfoRow icon="call" label="Phone" value="+251 902 142 767" />
              <InfoRow icon="location_on" label="Studio" value="Addis Ababa, Ethiopia" />
            </div>
          </div>

          {/* Map Section */}
          <div className="relative overflow-hidden rounded-[2rem] h-full min-h-[300px] border border-outline-variant/10 group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7vC8sRZTtBR0QM4DPHSpbLfoCoGBZSCbVCFfMma_hXIVyYw_bD5o7Ch0Ka-bGx1ZLjDGWIZbM0TWoey0eD0hNoHpX2keDXsfbRWCVK1DQEff_Bd3mwoVMXyu97SCBUjRmB2bY_T_wik6f6vUPrhMdq6T7fO3ZoNxDEXHLEsF9V3POAA67NZytFqfsW3yRGosGm2pGEwLKYl7MdC9MYvEOdP9BseoMMahFW7wmGAETxfmeV7wa7DqHyaF0HRhU9KIqDQIsPa9TJV4" 
              alt="Addis Ababa" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
            
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl flex items-center justify-between">
              <div>
                <p className="font-headline font-bold text-on-surface">Addis Ababa</p>
                <p className="text-xs text-on-surface-variant">Ethiopia, East Africa</p>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-primary text-on-primary-fixed rounded-full hover:scale-110 transition-transform flex items-center justify-center transform"
              >
                <MaterialIcon icon="open_in_new" size="20px" filled />
              </a>
            </div>
          </div>
          
        </div>
      </div>

    </section>
  );
}

function InfoRow({ icon, label, value }: { icon: string, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-3 bg-surface-container-highest rounded-lg">
                <MaterialIcon icon={icon} className="text-primary" />
            </div>
            <div>
                <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{label}</p>
                <p className="text-on-surface font-medium">{value}</p>
            </div>
        </div>
    );
}

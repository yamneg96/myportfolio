import type { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { SideNav } from '@/components/SideNav';
import { Footer } from '@/components/Footer';
import { useLenis } from '@/animations/useLenis';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  // Initialize smooth scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary/30 selection:text-primary overflow-x-hidden pt-32 relative">
      <Navbar />
      <SideNav />

        {/* Global Background Elements */}
        {/* We keep the global gradients minimal, sections can define their own */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-tertiary/5 blur-[100px] rounded-full"></div>
        </div>

      <main className="lg:ml-20 flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

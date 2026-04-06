import { Toaster } from 'sonner';
import { MainLayout } from '@/layouts/MainLayout';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { NeonTerminalSection } from '@/sections/NeonTerminalSection';
import { ContactSection } from '@/sections/ContactSection';

function App() {
  return (
    <MainLayout>
      <Toaster position="bottom-right" richColors />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <NeonTerminalSection />
      <ContactSection />
    </MainLayout>
  );
}

export default App;

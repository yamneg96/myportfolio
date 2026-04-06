import { CodeTerminal } from '@/components/CodeTerminal';
import { MaterialIcon } from '@/components/MaterialIcon';

export function NeonTerminalSection() {
  return (
    <section className="mt-32 px-8 max-w-7xl mx-auto mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 tracking-tight">
            The <span className="text-primary">Neon Terminal</span>
          </h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed text-lg">
            Beyond the interface, every project is anchored in a robust technical stack designed for longevity and performance. My architectural approach ensures scalability from Day 1.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <MaterialIcon icon="architecture" className="text-primary" />
              </div>
              <span className="text-sm md:text-base font-headline font-medium text-on-surface">System Scalability & Microservices</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <MaterialIcon icon="security" className="text-primary" />
              </div>
              <span className="text-sm md:text-base font-headline font-medium text-on-surface">Enterprise-grade Security Protocols</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <MaterialIcon icon="speed" className="text-primary" />
              </div>
              <span className="text-sm md:text-base font-headline font-medium text-on-surface">Optimization & Latency Reduction</span>
            </div>
          </div>
        </div>
        
        <div className="w-full">
            <CodeTerminal />
        </div>
      </div>
    </section>
  );
}

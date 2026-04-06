import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';
import { ThemeToggle } from '../theme-toggle';

export default function TopNav() {
    const toggleSidebar = useUIStore((state) => state.toggleSidebar);
    const logout = useAuthStore((state) => state.logout);

    return (
        <header className="flex justify-between items-center px-4 md:px-8 sticky top-0 z-40 h-16 w-full bg-background/40 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="relative w-full max-w-md hidden sm:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                    <input 
                        type="text" 
                        placeholder="Search resources..." 
                        className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/30 placeholder:text-on-surface-variant/40 outline-none text-on-surface"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 md:gap-4 text-slate-400">
                    <button className="p-2 hover:text-primary transition-colors opacity-80 hover:opacity-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                    <ThemeToggle />
                </div>
                
                <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                
                <div className="flex items-center gap-3">
                    <button onClick={logout} className="hidden sm:block text-slate-400 font-medium hover:text-primary transition-colors text-sm cursor-pointer border-none bg-transparent">
                        Logout
                    </button>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-surface-container-high border border-primary/20 overflow-hidden flex-shrink-0">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" alt="User" />
                    </div>
                </div>
            </div>
        </header>
    );
}

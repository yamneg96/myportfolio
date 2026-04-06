import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function Sidebar() {
    const location = useLocation();
    const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
    const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
    const logout = useAuthStore((state) => state.logout);

    const navItems = [
        { name: 'Dashboard', path: '/', icon: 'dashboard' },
        { name: 'Projects', path: '/projects', icon: 'folder_special' },
        { name: 'Experience', path: '/experience', icon: 'work_history' },
        { name: 'Skills', path: '/skills', icon: 'psychology' },
        { name: 'About', path: '/about', icon: 'person' },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed left-0 top-0 h-full flex flex-col w-64 border-r border-white/5 bg-surface-container/95 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] z-50 transition-transform duration-300",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-on-primary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>architecture</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tighter text-primary font-headline">Neon Architect</h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-medium">Portfolio CMS</p>
                        </div>
                    </div>
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group font-headline tracking-tight",
                                        isActive 
                                            ? "text-primary bg-primary/10 border-r-2 border-primary scale-[1.02] font-medium" 
                                            : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                                    )}
                                >
                                    <span 
                                        className={cn("material-symbols-outlined text-[20px]", isActive ? "text-primary" : "")} 
                                        style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}
                                    >
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="mt-auto p-6 border-t border-white/5">
                    <div className="bg-surface-container-low p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <img alt="User" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" className="w-8 h-8 rounded-full border border-primary/30" />
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-on-surface truncate">Yamlak N.</p>
                                <p className="text-[10px] text-on-surface-variant truncate uppercase">Admin</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="w-full py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/5">
                                <span className="material-symbols-outlined text-sm">settings</span>
                                Manage Account
                            </button>
                            <button onClick={logout} className="w-full py-2 bg-error/10 hover:bg-error/20 text-error text-xs rounded-lg transition-colors flex items-center justify-center gap-2 border border-error/10 shadow-sm cursor-pointer">
                                <span className="material-symbols-outlined text-sm pt-[1px]">logout</span>
                                End Session
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

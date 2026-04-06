import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useEffect } from 'react';
import { useUIStore } from '../../store/useUIStore';

export default function CMSLayout() {
    const theme = useUIStore((state) => state.theme);

    // Apply dark mode class strictly. The CMS design depends heavily on dark mode defaults
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container flex">
            <Sidebar />
            
            <div className="flex flex-col flex-1 lg:ml-64 w-full overflow-x-hidden">
                <TopNav />
                
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

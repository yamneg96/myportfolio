import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 hover:bg-surface-container-high rounded-lg text-slate-400 hover:text-primary transition-colors opacity-80 hover:opacity-100 flex items-center justify-center border border-transparent hover:border-white/5"
    >
        {theme === 'dark' ? (
          <span className="material-symbols-outlined text-[20px]">light_mode</span>
        ) : (
          <span className="material-symbols-outlined text-[20px]">dark_mode</span>
        )}
    </button>
  );
}

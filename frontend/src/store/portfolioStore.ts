import { create } from 'zustand';

interface PortfolioState {
  activeSection: string;
  mobileMenuOpen: boolean;
  setActiveSection: (section: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 'hero',
  mobileMenuOpen: false,
  setActiveSection: (section) => set({ activeSection: section }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}));

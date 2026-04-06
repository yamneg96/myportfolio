export function Footer() {
  return (
    <footer className="w-full py-12 mt-20 border-t border-outline-variant/30 bg-surface-container-lowest font-body text-sm text-on-surface-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-6 md:space-y-0 lg:pl-28">
        <div className="order-2 md:order-1 text-center md:text-left">
          © {new Date().getFullYear()} Yamlak N. Engineered with precision.
        </div>
        <div className="flex space-x-8 order-1 md:order-2">
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

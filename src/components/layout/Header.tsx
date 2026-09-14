'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { navigation } from '@/data/navigation';
import { company } from '@/config/company';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { QuickQuoteModal } from '@/components/ui/QuickQuoteModal';
import { iosSpringGentle } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { ContactChoiceButton } from '@/components/ui/ContactChoiceButton';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  FileCheck, 
  Vault, 
  Lock, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'precious-metals-trading': Scale,
  'mining-advisory': FileCheck,
  'export-facilitation': ShieldCheck,
  'transaction-security': Lock,
  'secure-storage': Vault,
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'manipulation';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'manipulation';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.08)] py-2.5 sm:py-3'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3 sm:py-4'
        }`}
      >
        <nav className="container flex items-center justify-between" aria-label="Main Navigation">
          {/* Brand Logo */}
          <Link href="/" className="group py-1" aria-label={`${company.name} Homepage`} onClick={handleLinkClick}>
            <BrandLogo variant="light" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.children && pathname.startsWith(item.href));

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'text-blue-700 bg-blue-50/90 shadow-xs'
                          : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                      aria-expanded={activeDropdown === item.href}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.href ? 'rotate-180 text-blue-600' : 'text-slate-400'
                      }`} />
                    </button>

                    {/* Mega Menu Dropdown with iOS Spring */}
                    <AnimatePresence>
                      {activeDropdown === item.href && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                          transition={reduceMotion ? undefined : iosSpringGentle}
                          className="absolute top-full left-0 mt-2 w-[420px] card-3d bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18),0_4px_12px_rgba(15,23,42,0.06)] p-4 z-50 origin-top"
                        >
                          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 px-3 py-1.5 mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>Core Mineral Capabilities</span>
                          </div>
                          <div className="space-y-1">
                            {item.children.map((child) => {
                              const IconComponent = serviceIcons[child.href.split('/').pop() || ''] || BookOpen;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={handleLinkClick}
                                  className="group/item flex items-start gap-3 p-3 rounded-2xl hover:bg-blue-50/80 active:scale-[0.98] transition-all"
                                >
                                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors flex-shrink-0 mt-0.5 shadow-xs">
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-slate-950 group-hover/item:text-blue-700 transition-colors">
                                      {child.label}
                                    </div>
                                    <div className="text-xs text-slate-500 leading-snug">
                                      Regulated mineral sourcing & trade execution
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-100 px-3 flex items-center justify-between text-xs">
                            <span className="text-slate-500">Institutional Governance</span>
                            <Link 
                              href="/why-us" 
                              onClick={handleLinkClick}
                              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                            >
                              View Verification Matrix <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/90 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="btn-3d-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-800 bg-white hover:bg-blue-50/80 border border-blue-200/90 rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Quick Quote</span>
            </button>

            <ContactChoiceButton label="Contact Us" variant="primary" />
          </div>

          {/* Mobile Hamburger Toggle (Min 44x44 Touch Target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-slate-800 hover:text-blue-700 active:scale-95 border border-blue-200 transition-all shadow-xs cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer with Fluid Spring and Backdrop */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 top-[60px] sm:top-[68px] bg-slate-950/50 backdrop-blur-sm z-40"
                aria-hidden="true"
              />

              {/* Mobile Drawer Content */}
              <motion.div 
                id="mobile-drawer"
                initial={reduceMotion ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={reduceMotion ? undefined : iosSpringGentle}
                className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[68px] max-h-[calc(100dvh-60px)] sm:max-h-[calc(100dvh-68px)] bg-white/98 backdrop-blur-2xl border-t border-slate-200 z-50 p-5 sm:p-6 overflow-y-auto pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl"
              >
                <div className="space-y-4 max-w-lg mx-auto">
                  {navigation.map((item) => (
                    <div key={item.href} className="border-b border-slate-100 pb-3">
                      {item.children ? (
                        <div>
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="w-full flex items-center justify-between text-left py-1 text-sm font-bold uppercase tracking-wider text-blue-700 cursor-pointer"
                            aria-expanded={mobileServicesOpen}
                          >
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                              {item.label}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileServicesOpen && (
                            <div className="space-y-1.5 pt-2 pl-2 animate-in fade-in slide-in-from-top-2 duration-200">
                              {item.children.map((child) => {
                                const IconComponent = serviceIcons[child.href.split('/').pop() || ''] || BookOpen;
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={handleLinkClick}
                                    className="flex items-center gap-3 p-2.5 rounded-xl text-sm text-slate-800 hover:text-blue-700 hover:bg-blue-50 font-medium active:scale-[0.98] transition-all"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                                      <IconComponent className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{child.label}</span>
                                  </Link>
                                );
                              })}
                              <Link
                                href="/services"
                                onClick={handleLinkClick}
                                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 pl-3 pt-1"
                              >
                                <span>Explore all capabilities</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className={`block text-base font-semibold py-2 px-1 rounded-xl transition-colors active:scale-[0.98] ${
                            pathname === item.href ? 'text-blue-700 bg-blue-50/90 font-bold' : 'text-slate-800 hover:text-blue-600'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Mobile Quick Action Strip */}
                  <div className="pt-3 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setQuoteModalOpen(true);
                      }}
                      className="btn-3d-primary w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Calculate Lot Value & Quote</span>
                    </button>

                    <ContactChoiceButton label="Contact Our Team" variant="secondary" fullWidth />

                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <a
                        href={`https://wa.me/${company.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold active:scale-[0.97] transition-all shadow-xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${company.phone}`}
                        className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-bold active:scale-[0.97] transition-all shadow-xs"
                      >
                        <span>Call Kampala Office</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Global Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}



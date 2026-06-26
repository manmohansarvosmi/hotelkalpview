import { useState, useEffect } from 'react';
import { Shield, BookOpen, Calendar, Menu, X, Landmark, UserCheck } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onSetView: (view: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenMyBookings: () => void;
  onOpenBookingModalWithDefaults: () => void;
  activeBookingsCount: number;
}

export default function Navbar({
  currentView,
  onSetView,
  onNavigateToSection,
  onOpenMyBookings,
  onOpenBookingModalWithDefaults,
  activeBookingsCount,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', view: 'Home' },
    { label: 'Tariff', view: 'Tariff' },
    { label: 'Reserve Now', view: 'Booking' },
    { label: 'Amenities', id: 'services-section' },
    { label: 'Gallery', id: 'gallery-section' },
    { label: 'Guide', id: 'guide-section' },
  ];

  const handleLinkClick = (item: any) => {
    if (item.view) {
      onSetView(item.view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.id) {
      if (currentView !== 'Home') {
        onSetView('Home');
        setTimeout(() => onNavigateToSection(item.id), 100);
      } else {
        onNavigateToSection(item.id);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 text-slate-800 shadow-md backdrop-blur-md py-3 border-b border-brand-100'
          : 'bg-slate-900/40 text-white backdrop-blur-[2px] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo Brand Emblem */}
          <button
            id="brand-logo"
            onClick={() => {
              onSetView('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3 cursor-pointer group text-left"
          >
            {/* Elegant SVG Tree Logo matching the user's uploaded logo exactly */}
            <div className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center p-1 shadow-sm border border-brand-200 transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-brand-600 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outlined Circle matching logo text */}
                <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2.5" />
                
                {/* Detailed Tree branches & rich leaves block */}
                <path d="M48,82 L52,82 L52,50 C54,48 57,44 58,40 C62,41 65,39 67,36 L68,34 C63,33 60,34 56,37 C54,34 56,29 59,25 C55,27 52,32 52,36 C49,32 50,26 53,21 L51,21 C48,27 48,31 49,36 C45,33 42,32 37,34 C41,37 45,37 47,41 C41,40 37,42 34,45 C38,47 42,46 45,44 L48,50 Z" />
                <path d="M50,82 C43,82 36,83 31,84 C38,82 43,80 47,78 C47,75 48,74 48,72 L52,72 C52,75 53,76 53,78 C57,80 62,82 69,84 C64,83 57,82 50,82 Z" />
                
                {/* Floating organic round leaves representing Kalpview (Banyan/Kalpavriksha) */}
                <circle cx="50" cy="18" r="4.5" />
                <circle cx="36" cy="24" r="4" />
                <circle cx="64" cy="24" r="4" />
                <circle cx="28" cy="34" r="4" />
                <circle cx="72" cy="34" r="4" />
                <circle cx="42" cy="28" r="4.5" />
                <circle cx="58" cy="28" r="4.5" />
                <circle cx="29" cy="46" r="3.5" />
                <circle cx="71" cy="46" r="3.5" />
                <circle cx="38" cy="44" r="4" />
                <circle cx="62" cy="44" r="4" />
                <circle cx="50" cy="35" r="5" />
                <circle cx="48" cy="52" r="3" />
                <circle cx="52" cy="52" r="3" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className={`font-serif font-bold text-lg sm:text-xl tracking-tight transition-colors ${
                  isScrolled ? 'text-brand-900' : 'text-white'
                }`}>
                  HOTEL KALPVIEW
                </span>
              </div>
              <p className={`text-[9px] font-mono tracking-[0.2em] font-medium transition-colors leading-none m-0 ${
                isScrolled ? 'text-brand-600' : 'text-brand-100'
              }`}>
                HOME AWAY FROM HOME
              </p>
            </div>
          </button>

          {/* Large Screen Menu */}
          <div className="hidden md:flex items-center space-x-7">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item)}
                className={`text-sm font-medium tracking-wide transition-colors cursor-pointer hover:text-brand-500 py-1 border-b border-transparent hover:border-brand-500/30 ${
                  isScrolled ? 'text-slate-600' : 'text-slate-100 hover:text-white'
                } ${ (item.view === currentView) ? 'border-brand-500 text-brand-600' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Command Center */}
            <button
              id="nav-admin-button"
              onClick={() => onSetView('Admin')}
              className={`flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                isScrolled
                  ? 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                  : 'text-white bg-white/10 hover:bg-white/20'
              }`}
            >
              <Shield className="w-4 h-4 text-brand-500" />
              <span>Admin</span>
            </button>

            {/* Manage/My Bookings Dashboard Button */}
            <button
              id="nav-bookings-button"
              onClick={onOpenMyBookings}
              className={`flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-lg transition-all relative ${
                isScrolled
                  ? 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                  : 'text-white bg-white/10 hover:bg-white/20'
              }`}
            >
              <UserCheck className="w-4 h-4 text-brand-500" />
              <span>My Stays</span>
              {activeBookingsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white shadow-md animate-bounce">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Quick booking scroll trigger */}
            <button
              id="nav-book-now"
              onClick={onOpenBookingModalWithDefaults}
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Check Availability
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-bookings-indicator"
              onClick={onOpenMyBookings}
              className={`p-2 rounded-lg relative ${
                isScrolled ? 'text-slate-700' : 'text-white'
              }`}
            >
              <UserCheck className="w-5 h-5" />
              {activeBookingsCount > 0 && (
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-brand-600 border border-white"></span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-white border-b border-brand-100 shadow-xl transition-all duration-300">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-slate-700 hover:bg-brand-50 hover:text-brand-700 text-base font-medium transition-colors ${
                  item.view === currentView ? 'bg-brand-50 text-brand-700' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <hr className="border-slate-100 my-2" />
            
            <div className="px-2 space-y-3">
              <button
                id="mobile-nav-admin"
                onClick={() => {
                  onSetView('Admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-200"
              >
                <Shield className="w-4 h-4 text-brand-300" />
                <span>Admin Panel</span>
              </button>

              <div className="grid grid-cols-2 gap-3 pb-2">
                <button
                  id="mobile-nav-stays"
                  onClick={() => {
                    onOpenMyBookings();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-slate-200 rounded-lg text-slate-700 font-medium text-sm bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-brand-600" />
                  <span>My Stays</span>
                  {activeBookingsCount > 0 && (
                    <span className="ml-1 bg-brand-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {activeBookingsCount}
                    </span>
                  )}
                </button>
                
                <button
                  id="mobile-nav-book"
                  onClick={() => {
                    onOpenBookingModalWithDefaults();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-3 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-semibold text-sm shadow-sm transition-colors text-center"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchAndRooms from './components/SearchAndRooms';
import ServiceDescriptions from './components/ServiceDescriptions';
import PhotoGallery from './components/PhotoGallery';
import GwaliorGuide from './components/GwaliorGuide';
import BookingDashboard from './components/BookingDashboard';
import RoomBookingModal from './components/RoomBookingModal';
import TariffPage from './components/TariffPage';
import BookingPage from './components/BookingPage';
import AdminRoomManager from './components/AdminRoomManager';
import { Room, Booking } from './types';
import { HOTEL_ROOMS } from './constants';
import { Landmark, Shield, CheckCircle2, ChevronRight, MessageSquare, Heart, Award, ArrowUp, Zap } from 'lucide-react';

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedRoomToBook, setSelectedRoomToBook] = useState<Room | null>(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [selectedTierFilter, setSelectedTierFilter] = useState('All');
  const [currentView, setCurrentView] = useState('Home');
  
  // Track parameters searched in the hero search widget to pass down to the booking modal as pre-fills!
  const [searchCheckIn, setSearchCheckIn] = useState('');
  const [searchCheckOut, setSearchCheckOut] = useState('');
  const [searchGuests, setSearchGuests] = useState(2);

  // Success Notification banner states after confirming stay
  const [showSuccessNotification, setShowSuccessNotification] = useState<Booking | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('kalpview_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearch = (checkIn: string, checkOut: string, guests: number, category: string) => {
    setSearchCheckIn(checkIn);
    setSearchCheckOut(checkOut);
    setSearchGuests(guests);
    setSelectedTierFilter(category);
  };

  const handleOpenBookingModalWithDefaults = () => {
    // Pick the suite or deluxe as a default
    const defaultRoom = HOTEL_ROOMS.find((r) => r.id === '1') || HOTEL_ROOMS[0];
    setSelectedRoomToBook(defaultRoom);
  };

  const handleAddBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('kalpview_bookings', JSON.stringify(updated));
    setSelectedRoomToBook(null);
    
    // Sync to DB
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking),
    }).catch(err => console.error('DB Sync Error:', err));

    // Show success ticket banner
    setShowSuccessNotification(newBooking);
    
    // Auto-dismiss or let guest read
    setTimeout(() => {
      setShowSuccessNotification(null);
    }, 6500);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b
    );
    setBookings(updated);
    localStorage.setItem('kalpview_bookings', JSON.stringify(updated));
  };

  const activeBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-brand-100 selection:text-brand-900">
      
      {/* Full-width interactive feedback toast on successful booking creation */}
      {showSuccessNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-emerald-950 text-white border border-emerald-500/25 p-5 rounded-2xl shadow-2xl flex items-start space-x-3.5 animate-bounce-short">
          <div className="bg-emerald-550 p-2 rounded-full text-emerald-100 shrink-0 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <h5 className="font-bold text-sm text-emerald-100">Stay Secured Successfully!</h5>
              <span className="font-mono text-[9px] text-emerald-400 font-bold bg-white/10 px-1.5 py-0.5 rounded leading-none">
                #{showSuccessNotification.id}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-normal mt-1">
              Your reservation for <strong className="text-white">{showSuccessNotification.roomName}</strong> is logged. You can view, print, or edit this voucher anytime in the <strong>My Stays</strong> console.
            </p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => {
                  setIsMyBookingsOpen(true);
                  setShowSuccessNotification(null);
                }}
                className="bg-white text-emerald-950 px-3 py-1.5 rounded-lg text-[11px] font-bold shadow hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Open My Voucher
              </button>
              <button
                onClick={() => setShowSuccessNotification(null)}
                className="text-[11px] text-slate-400 font-semibold hover:text-white transition-colors cursor-pointer"
              >
                Dismiss View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin mode top strip */}
      {currentView === 'Admin' && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-slate-900 text-white text-xs font-bold px-6 py-2 flex items-center justify-between">
          <span className="text-brand-300 font-mono uppercase tracking-widest">🔒 Admin Mode — Room Manager</span>
          <button onClick={() => setCurrentView('Home')} className="text-slate-400 hover:text-white transition flex items-center gap-1.5">← Back to Site</button>
        </div>
      )}

      {/* Main Unified Header Navigation */}
      <Navbar
        currentView={currentView}
        onSetView={setCurrentView}
        onNavigateToSection={handleNavigateToSection}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenBookingModalWithDefaults={() => {
          setCurrentView('Booking');
          handleOpenBookingModalWithDefaults();
        }}
        activeBookingsCount={activeBookingsCount}
      />

      <main className="flex-1">
        
        {currentView === 'Home' && (
          <>
            <Hero
              onSearch={(in_d, out_d, g, c) => {
                handleHeroSearch(in_d, out_d, g, c);
                setCurrentView('Booking');
              }}
              onNavigateToRooms={() => setCurrentView('Booking')}
            />

            <ServiceDescriptions />
            <PhotoGallery />
            <GwaliorGuide />
          </>
        )}

        {currentView === 'Tariff' && <TariffPage onSelectRoomToBook={setSelectedRoomToBook} />}

        {currentView === 'Booking' && (
          <BookingPage
            onSelectRoomToBook={setSelectedRoomToBook}
            selectedTierFilter={selectedTierFilter}
            setSelectedTierFilter={setSelectedTierFilter}
          />
        )}

        {currentView === 'Admin' && <AdminRoomManager />}

      </main>

      {/* Structured Multi-Column Corporate/Homely Footer */}
      <footer id="site-footer" className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo Brand Tag */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 border border-brand-300">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-brand-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M48,82 L52,82 L52,50 C54,48 57,44 58,40 C62,41 65,39 67,36 L68,34 C63,33 60,34 56,37 C54,34 56,29 59,25 C55,27 52,32 52,36 C49,32 50,26 53,21 L51,21 C48,27 48,31 49,36 C45,33 42,32 37,34 C41,37 45,37 47,41 C41,40 37,42 34,45 C38,47 42,46 45,44 L48,50 Z" />
                  <path d="M50,82 C43,82 36,83 31,84 C38,82 43,80 47,78 C47,75 48,74 48,72 L52,72 C52,75 53,76 53,78 C57,80 62,82 69,84 C64,83 57,82 50,82 Z" />
                  <circle cx="50" cy="18" r="4.5" /><circle cx="36" cy="24" r="4" /><circle cx="64" cy="24" r="4" />
                </svg>
              </div>
              <div>
                <span className="font-serif font-bold text-lg tracking-tight text-white block">HOTEL KALPVIEW</span>
                <span className="text-[8px] font-mono tracking-[0.2em] text-brand-300 uppercase leading-none">Home Away From Home</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-normal font-light">
              We look forward to hosting you for an unforgettable séjour in historical Gwalior, Madhya Pradesh. Enjoy panoramic views, rich green gardens, and traditional Bundelkhand comfort.
            </p>

            <div className="flex items-center space-x-3 text-slate-400 select-none">
              <Shield className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
              <span className="text-[10px] sm:text-xs">Safe Checkout & Direct Pay-at-Hotel</span>
            </div>
          </div>

          {/* Quick links list */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <span className="text-brand-300 font-mono uppercase text-[10px] font-bold block mb-4">Navigations</span>
            <button onClick={() => handleNavigateToSection('rooms-section')} className="block text-slate-400 hover:text-white transition-colors cursor-pointer text-left">Rooms & Tiers</button>
            <button onClick={() => handleNavigateToSection('services-section')} className="block text-slate-400 hover:text-white transition-colors cursor-pointer text-left">Services Catalog</button>
            <button onClick={() => handleNavigateToSection('gallery-section')} className="block text-slate-400 hover:text-white transition-colors cursor-pointer text-left">Visual Gallery</button>
            <button onClick={() => handleNavigateToSection('guide-section')} className="block text-slate-400 hover:text-white transition-colors cursor-pointer text-left">Directions Map</button>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs text-slate-400">
            <span className="text-brand-300 font-mono uppercase text-[10px] font-bold block mb-4">Contacts Desk</span>
            <p><strong>Mobile Support:</strong> +91 91114 27412</p>
            <p><strong>Front Desk:</strong> open 24 Hours, 7 days</p>
            <p><strong>General Support:</strong> reservations@hotelkalpview.com</p>
            <p><strong>Corporate Base:</strong> Nadi Gate, Near Fort hill stairs, Gwalior (M.P.) India</p>
          </div>

          {/* Brand highlights, trust badges */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-brand-300 font-mono uppercase text-[10px] font-bold block">Exclusive Member</span>
            
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60 flex items-start space-x-3">
              <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-slate-200">Gwalior Tourism Circle</h5>
                <p className="text-[11px] text-slate-400 leading-normal font-light">Rated 4.8/5 on Maps and MakeMyTrip listings based on pristine cleanliness and premium pure veg cuisine standard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Separator line & copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p
            onDoubleClick={() => setCurrentView('Admin')}
            title=""
            className="cursor-default select-none"
          >
            © {new Date().getFullYear()} Hotel Kalpview Booking Platform. All rights reserved.
          </p>
          <p className="flex items-center space-x-1">
            <span>Made with Indian Heritage Hospitality</span>
            <Heart className="w-3 h-3 text-rose-500 shrink-0 fill-rose-500" />
            <span>&bull; Home Away From Home</span>
          </p>
        </div>
      </footer>

      {/* Modular Room Booking Form Modal */}
      {selectedRoomToBook && (
        <RoomBookingModal
          room={selectedRoomToBook}
          isOpen={!!selectedRoomToBook}
          onClose={() => setSelectedRoomToBook(null)}
          onBookingSuccess={handleAddBooking}
          initialCheckIn={searchCheckIn}
          initialCheckOut={searchCheckOut}
          initialGuestsCount={searchGuests}
        />
      )}

      {/* User Booking / Voucher Management Dashboard Desk */}
      <BookingDashboard
        bookings={bookings}
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onCancelBooking={handleCancelBooking}
      />

    </div>
  );
}


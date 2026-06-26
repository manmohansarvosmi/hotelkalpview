import { Calendar, Users, MapPin, Sparkles, Award, Star } from 'lucide-react';
import React, { useState, FormEvent } from 'react';

import heroImg1 from '../assets/images/image1.jpg';

interface HeroProps {
  onSearch: (checkIn: string, checkOut: string, guests: number, tier: string) => void;
  onNavigateToRooms: () => void;
}

export default function Hero({ onSearch, onNavigateToRooms }: HeroProps) {
  // Setup default dates: Today and Tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDateValue = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(formatDateValue(today));
  const [checkOut, setCheckOut] = useState(formatDateValue(tomorrow));
  const [guests, setGuests] = useState(2);
  const [tier, setTier] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(checkIn, checkOut, guests, tier);
    
    // Notify Telegram about availability check
    import('../services/telegramService').then(({ notifyAvailabilityCheck }) => {
      notifyAvailabilityCheck({ checkIn, checkOut, guests, tier });
    });

    onNavigateToRooms();
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-16 px-4 overflow-hidden"
    >
      {/* Hero background: single hotel photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg1}
          alt="Hotel Kalpview Gwalior"
          className="w-full h-full object-cover object-center select-none"
          draggable={false}
        />
        {/* Subtle gradient overlay — lighter so image stays vivid */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-950/40 z-10" />
      </div>

      {/* Decorative Brand Accent - Subtle Tree Leaf floating icons or ambient lights */}
      <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[30%] right-[15%] w-40 h-40 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Area */}
      <div className="relative z-20 max-w-5xl mx-auto text-center px-2 mt-8 sm:mt-12 flex flex-col items-center">
        {/* Subtle Welcome Badge */}
        <div
          id="hero-badge"
          className="inline-flex items-center space-x-2 bg-brand-900/80 border border-brand-500/40 text-brand-100 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md animate-fade-in-down"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-300" />
          <span>The Pearl of Hospitality in Gwalior</span>
        </div>

        {/* Elegant Display Heading */}
        <h1
          id="hero-title"
          className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight max-w-4xl"
        >
          Where Royal Heritage Meets <br className="hidden sm:inline" />
          <span className="text-brand-300">Heartfelt Comfort</span>
        </h1>

        {/* Persuasive Catchy Tagline */}
        <p
          id="hero-tagline"
          className="mt-6 text-base sm:text-lg text-slate-200 max-w-2xl font-light leading-relaxed"
        >
          Savor stunning views of the majestic <strong className="text-white font-medium">Gwalior Fort</strong>. Unwind in boutique rooms shaped by warm hospitality and refined pure veg dining.
        </p>

        {/* Interactive Booking Search Widget: Drive Conversions Immediately */}
        <div className="mt-10 w-full max-w-4xl">
          <form
            id="quick-booking-form"
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100 text-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5"
          >
            {/* Check-In Date */}
            <div className="flex flex-col text-left px-1">
              <label htmlFor="check-in" className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase flex items-center space-x-1 mb-1">
                <Calendar className="w-3 h-3 text-brand-500" />
                <span>Check In</span>
              </label>
              <input
                id="check-in"
                type="date"
                min={formatDateValue(today)}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  // Auto-advance check-out date if check-in updates past it
                  if (new Date(e.target.value) >= new Date(checkOut)) {
                    const nextDay = new Date(e.target.value);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setCheckOut(formatDateValue(nextDay));
                  }
                }}
                className="w-full bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                required
              />
            </div>

            {/* Check-Out Date */}
            <div className="flex flex-col text-left px-1">
              <label htmlFor="check-out" className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase flex items-center space-x-1 mb-1">
                <Calendar className="w-3 h-3 text-brand-500" />
                <span>Check Out</span>
              </label>
              <input
                id="check-out"
                type="date"
                min={checkIn}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                required
              />
            </div>

            {/* Guests Counter */}
            <div className="flex flex-col text-left px-1">
              <label htmlFor="guests" className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase flex items-center space-x-1 mb-1">
                <Users className="w-3.5 h-3.5 text-brand-500" />
                <span>Adult Guests</span>
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-brand-100 outline-none transition-all cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Type Tier Selection */}
            <div className="flex flex-col text-left px-1">
              <label htmlFor="tier" className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase flex items-center space-x-1 mb-1">
                <Award className="w-3.5 h-3.5 text-brand-500" />
                <span>Room Style</span>
              </label>
              <select
                id="tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-brand-100 outline-none transition-all cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Royal Executive">Royal Executive</option>
                <option value="Executive">Executive Comfort</option>
                <option value="Semi Executive">Semi Executive</option>
              </select>
            </div>

            {/* Conversion CTA Button */}
            <div className="flex items-end px-1 mt-2 lg:mt-0">
              <button
                id="search-and-book-btn"
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold rounded-xl py-3 text-sm h-11 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Find Room</span>
                <span>&rarr;</span>
              </button>
            </div>
          </form>
        </div>

        {/* Clean, Non-Cluttered Credibility Signals below booking form (Pure Trust Icons Only) */}
        <div
          id="credibility-badges"
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl text-sm"
        >
          <div className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-white/5 py-1.5 px-3 rounded-full border border-white/5 backdrop-blur-sm">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-medium">4.8 rated (280+ reviews)</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-white/5 py-1.5 px-3 rounded-full border border-white/5 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-brand-300" />
            <span className="font-medium">1.8km to Gwalior Fort</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-white/5 py-1.5 px-3 rounded-full border border-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-brand-300" />
            <span className="font-medium">Free Station Pick-up</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-white/5 py-1.5 px-3 rounded-full border border-white/5 backdrop-blur-sm">
            <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="font-medium">Pure Veg Kitchen</span>
          </div>
        </div>
      </div>



      {/* Custom bounce scrolling down indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden sm:block">
        <button
          onClick={onNavigateToRooms}
          className="text-white/60 hover:text-white flex flex-col items-center space-y-1 cursor-pointer transition-colors"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest leading-none">Scroll To Rooms</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}

import React from 'react';
import SearchAndRooms from './SearchAndRooms';
import { Room } from '../types';
import { Sparkles, Calendar } from 'lucide-react';

interface BookingPageProps {
  onSelectRoomToBook: (room: Room) => void;
  selectedTierFilter: string;
  setSelectedTierFilter: (tier: string) => void;
}

export default function BookingPage({
  onSelectRoomToBook,
  selectedTierFilter,
  setSelectedTierFilter
}: BookingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-brand-600 font-mono text-sm uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Real-time Availability</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Reserve Your Stay
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Browse our curated selection of luxury rooms and heritage suites. Use the filters below to find the perfect accommodation for your Gwalior visit.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Support Line</p>
              <p className="font-bold text-slate-900">+91 91114 27412</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-1">
            <SearchAndRooms
              onSelectRoomToBook={onSelectRoomToBook}
              selectedTierFilter={selectedTierFilter}
              setSelectedTierFilter={setSelectedTierFilter}
            />
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Best Price Guarantee', desc: 'Book directly with us for the lowest rates and exclusive offers.' },
            { title: 'Pay at Hotel', desc: 'Secure your booking now and pay conveniently during check-in.' },
            { title: 'Free Cancellation', desc: 'Flexibility to change your plans up to 24 hours before arrival.' }
          ].map((feature) => (
            <div key={feature.title} className="bg-slate-100/50 p-6 rounded-2xl border border-white">
              <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-slate-600 leading-normal">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

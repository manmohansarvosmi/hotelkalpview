import { useState, useMemo } from 'react';
import { Star, Users, ArrowRight, Sparkles, SlidersHorizontal, Search, BedDouble, Expand, Eye } from 'lucide-react';
import { Room } from '../types';
import { HOTEL_ROOMS } from '../constants';

interface SearchAndRoomsProps {
  onSelectRoomToBook: (room: Room) => void;
  selectedTierFilter: string;
  setSelectedTierFilter: (tier: string) => void;
}

export default function SearchAndRooms({
  onSelectRoomToBook,
  selectedTierFilter,
  setSelectedTierFilter,
}: SearchAndRoomsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPriceLimit, setMaxPriceLimit] = useState(5500);

  // Dynamic Tiers List for filtering buttons
  const tiers = [
    { label: 'All Styles', value: 'All' },
    { label: 'Royal Suites', value: 'Suite' },
    { label: 'Heritage Deluxe', value: 'Deluxe' },
    { label: 'Family Executive', value: 'Executive' },
    { label: 'Standard Cozy', value: 'Standard' },
  ];

  // Client-Side Room Filtering Logic
  const filteredRooms = useMemo(() => {
    return HOTEL_ROOMS.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.amenities.some((am) => am.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTier = selectedTierFilter === 'All' || room.tier === selectedTierFilter;
      const matchesPrice = room.pricePerNight <= maxPriceLimit;

      return matchesSearch && matchesTier && matchesPrice;
    });
  }, [searchQuery, selectedTierFilter, maxPriceLimit]);

  return (
    <section id="rooms-section" className="py-20 bg-slate-50 border-t border-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Elegant Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-brand-600 block mb-3">
            ACCOMMODATION EXPERIENCES
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-800 tracking-tight leading-snug">
            Choose Your Private Gwalior Sanctuary
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed font-light">
            Each space at Hotel Kalpview combines high-ceilinged traditional hospitality with luxury bedding, modern bath suites, and breathtaking fort vistas. Perfect for travelers seeking authentic peace.
          </p>
        </div>

        {/* Interactive Filter Control Deck */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm mb-10 flex flex-col space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 order-2 lg:order-1">
              {tiers.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSelectedTierFilter(t.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedTierFilter === t.value
                      ? 'bg-brand-600 text-white shadow-sm hover:bg-brand-700'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Live Text Search input field */}
            <div className="relative order-1 lg:order-2 w-full lg:max-w-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 border border-slate-200 focus:border-brand-500 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-brand-50 transition-all placeholder:text-slate-400"
                placeholder="Search views, beds, Wi-Fi..."
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Pricing slider and quick tags */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-slate-500 text-xs sm:text-sm">
              <SlidersHorizontal className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="font-medium text-slate-600 whitespace-nowrap">Filter Match Max Price:</span>
              <input
                type="range"
                min="1900"
                max="5500"
                step="100"
                value={maxPriceLimit}
                onChange={(e) => setMaxPriceLimit(Number(e.target.value))}
                className="w-32 sm:w-44 accent-brand-600 cursor-pointer"
              />
              <span className="font-mono font-bold text-brand-800 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded">
                ₹{maxPriceLimit}
              </span>
            </div>

            <div className="text-slate-400 text-xs font-medium self-end">
              Found <span className="text-brand-700 font-bold font-mono">{filteredRooms.length}</span> luxury rooms matching criteria
            </div>
          </div>
        </div>

        {/* Dynamic Rooms List Structure */}
        {filteredRooms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-700">No matching rooms found</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Try adjusting your price slider or choosing a different style category. You can also search for popular terms like "Breakfast" or "Fort".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTierFilter('All');
                setMaxPriceLimit(5500);
              }}
              className="mt-4 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              Reset Search Configuration
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-slate-200/50 hover:border-brand-500/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Room Image with overlay tags and labels */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                  {/* Room Tier label */}
                  <div className="absolute top-4 left-4 flex space-x-1.5">
                    <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg uppercase tracking-wide shadow-sm font-mono">
                      {room.tier}
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-sm flex items-center space-x-1 backdrop-blur-sm">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{room.rating}</span>
                    </span>
                  </div>

                  {/* View tagline display bottom left */}
                  <div className="absolute bottom-4 left-4 text-white z-10 flex items-center space-x-1.5">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5 text-brand-300" />
                      <span>{room.view}</span>
                    </span>
                  </div>
                </div>

                {/* Card details structure layout */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-2 gap-2">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-800 group-hover:text-brand-700 transition-colors leading-tight">
                        {room.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed mb-4">
                      {room.description}
                    </p>

                    {/* Specifications Row */}
                    <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-3 mb-4 text-xs font-semibold text-slate-600">
                      <div className="flex items-center space-x-1 justify-center border-r border-slate-100">
                        <Expand className="w-4 h-4 text-slate-400" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center space-x-1 justify-center border-r border-slate-100">
                        <BedDouble className="w-4 h-4 text-slate-400" />
                        <span>{room.bedType}</span>
                      </div>
                      <div className="flex items-center space-x-1 justify-center">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>Max {room.maxGuests} Guests</span>
                      </div>
                    </div>

                    {/* Custom Amenities tags */}
                    <div className="mb-6 flex flex-wrap gap-1">
                      {room.amenities.slice(0, 5).map((am) => (
                        <span
                          key={am}
                          className="bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md"
                        >
                          {am}
                        </span>
                      ))}
                      {room.amenities.length > 5 && (
                        <span className="text-[10px] font-semibold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-md">
                          +{room.amenities.length - 5} More
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price Row & conversion CTA button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5 leading-none">
                        Starting from
                      </p>
                      <div className="flex items-baseline">
                        <span className="font-serif font-black text-2xl text-brand-900 leading-none">
                          ₹{room.pricePerNight}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 ml-1">/ Night</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectRoomToBook(room)}
                      className="bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-sm hover:shadow-md cursor-pointer transition-all hover:translate-x-0.5"
                    >
                      <span>Reserve Room</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

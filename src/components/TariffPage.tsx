import React from 'react';
import { IndianRupee, Info, Check, Coffee, Utensils, Hotel, Star, ShieldCheck, Users, BedDouble, Expand, Zap, ArrowRight } from 'lucide-react';
import { Room } from '../types';
import { HOTEL_ROOMS } from '../constants';

interface TariffPageProps {
  onSelectRoomToBook: (room: Room) => void;
}

export default function TariffPage({ onSelectRoomToBook }: TariffPageProps) {
  const [occupancy, setOccupancy] = React.useState<'single' | 'double'>('double');

  // Mapping our predefined rooms to the tariff display structure
  const roomData = HOTEL_ROOMS.map(room => {
    // Determine base rates from user's image data
    let baseS = room.pricePerNight; // EP Single
    let baseD = baseS + 200; // Default D is +200 in image for EP
    
    if (room.tier === 'Executive') {
      baseS = 1600;
      baseD = 1800;
    } else if (room.tier === 'Semi Executive') {
      baseS = 1200;
      baseD = 1400;
    } else if (room.tier === 'Royal Executive') {
      baseS = 2000;
      baseD = 2200;
    }

    return {
      ...room,
      packages: [
        {
          name: 'EP (European Plan)',
          description: 'Room Only',
          singlePrice: baseS,
          doublePrice: baseD,
          includes: ['Free High-speed Wi-Fi', 'Complimentary Drinking Water', '24/7 Room Service Access'],
          icon: <Hotel className="w-4 h-4" />,
          color: 'emerald'
        },
        {
          name: 'CP (Continental Plan)',
          description: 'Room + Breakfast',
          singlePrice: baseS + 200, // Matching image: 2000->2200 for Royal S
          doublePrice: baseD + 400, // Matching image: 2200->2600 for Royal D
          includes: ['Everything in EP', 'Gwalior Special Buffet Breakfast', 'Early Check-in (Subject to availability)'],
          icon: <Coffee className="w-4 h-4" />,
          color: 'orange',
          popular: true
        },
        {
          name: 'MAP (Modified American Plan)',
          description: 'Room + Breakfast + Dinner',
          singlePrice: baseS + 500, // Matching image: 2000->2500 for Royal S
          doublePrice: baseD + 1000, // Matching image: 2200->3200 for Royal D
          includes: ['Everything in CP', 'Delicious Pure Veg Dinner', 'Station Pick-up (One way)'],
          icon: <Utensils className="w-4 h-4" />,
          color: 'blue'
        }
      ]
    };
  });

  return (
    <div className="min-h-screen bg-[#f2f2f2] pt-32 pb-24 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav className="flex mb-4" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-1 text-xs text-slate-400">
                  <li><span className="hover:text-brand-600 cursor-pointer">Hotel Kalpview</span></li>
                  <li><span className="mx-1">&gt;</span></li>
                  <li className="text-slate-600 font-bold">Room Tariff & Plans</li>
                </ol>
              </nav>
              <h1 className="text-4xl font-serif font-black text-slate-900 tracking-tight">Best Value Room Rates</h1>
              <p className="text-slate-500 mt-2 font-medium flex items-center space-x-2">
                <span>Direct Booking Transparency</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-emerald-600 font-bold">Lowest Price Guarantee</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-4 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex p-1 bg-slate-100 rounded-xl">
                 <button 
                  onClick={() => setOccupancy('single')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${occupancy === 'single' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400'}`}
                 >
                   Single
                 </button>
                 <button 
                  onClick={() => setOccupancy('double')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${occupancy === 'double' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400'}`}
                 >
                   Double
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Room Sections */}
        <div className="space-y-12">
          {roomData.map((room) => (
            <div key={room.id} className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden transition-all hover:shadow-xl">
              
              {/* Room Info Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-8 bg-gradient-to-r from-slate-50 to-white">
                <div className="md:w-1/3 relative h-56 rounded-2xl overflow-hidden shadow-inner group">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                      {room.tier}
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg shadow-md flex items-center gap-1 backdrop-blur-sm">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{room.rating}</span>
                    </span>
                  </div>
                </div>

                <div className="md:w-2/3 flex flex-col justify-center">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">{room.name}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-2xl">{room.description}</p>
                  
                  <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-600">
                    <div className="flex items-center gap-2">
                      <Expand className="w-4 h-4 text-slate-400" />
                      <span>{room.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-slate-400" />
                      <span>{room.bedType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>Max {room.maxGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                      <Zap className="w-3 h-3 fill-current" />
                      <span>Free Wi-Fi Included</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Grid (MakeMyTrip Style) */}
              <div className="p-6 md:p-8 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
                {room.packages.map((pkg) => (
                  <div key={pkg.name} className={`relative flex flex-col border ${pkg.popular ? 'border-brand-500 ring-1 ring-brand-500/20 shadow-brand-500/5' : 'border-slate-200'} rounded-2xl p-5 hover:border-brand-400 transition-colors bg-white`}>
                    
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse-slow">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-xl bg-${pkg.color}-50 text-${pkg.color}-600`}>
                        {pkg.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{pkg.description}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mb-4">{pkg.name}</h3>
                    
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {pkg.includes.map((incl, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[11px] text-slate-500 leading-tight font-medium">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{incl}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-5 border-t border-slate-50">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-1">
                            {occupancy === 'single' ? 'Single Occ. Rate' : 'Double Occ. Rate'}
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-slate-900 flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              {(occupancy === 'single' ? pkg.singlePrice : pkg.doublePrice).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">+ GST</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-emerald-600 font-black animate-pulse">Save 15% Today!</p>
                      </div>

                      <button 
                        onClick={() => onSelectRoomToBook({ 
                          ...room, 
                          pricePerNight: (occupancy === 'single' ? pkg.singlePrice : pkg.doublePrice) 
                        })}
                        className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group ${
                          pkg.popular 
                            ? 'bg-brand-600 text-white shadow-md hover:bg-brand-700 shadow-brand-600/20' 
                            : 'bg-slate-900 text-white hover:bg-black shadow-sm'
                        }`}
                      >
                        <span>Select & Book</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 border-dashed text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Planning a Group or Corporate Visit?</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-lg mx-auto font-medium">Enjoy special preferential rates for bulk bookings of 5+ rooms and extended stays over 1 week.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <a href="tel:+919111427412" className="bg-slate-100 text-slate-700 font-bold px-6 py-3 rounded-xl text-xs border border-slate-200 hover:bg-slate-200 transition-colors">
                 Call Reservations: +91 91114 27412
               </a>
               <span className="text-slate-300 hidden sm:inline">|</span>
               <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-brand-600 font-bold text-xs hover:underline cursor-pointer">
                 Explore Availability Online
               </button>
            </div>
        </div>

        {/* Terms and Fine Print */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start gap-8 px-4">
          <div className="max-w-md">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">The Fine Print</h4>
            <div className="grid grid-cols-1 gap-4 text-[11px] text-slate-500 font-medium">
               <p>&bull; Check-in 12:00 PM | Check-out 11:00 AM</p>
               <p>&bull; GST extra as per govt notifications (12% for rates over ₹1000)</p>
               <p>&bull; PAN card/Aadhar mandatory at the time of check-in</p>
            </div>
          </div>
          <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50 max-w-sm">
             <div className="flex items-center gap-3 mb-2 text-emerald-800 font-bold text-sm">
               <ShieldCheck className="w-5 h-5 text-emerald-600" />
               <h5>Safe Stay Commitment</h5>
             </div>
             <p className="text-[11px] text-slate-600 leading-relaxed italic">Our rooms are sanitized after every checkout. We use hospital-grade disinfectants for your complete peace of mind.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

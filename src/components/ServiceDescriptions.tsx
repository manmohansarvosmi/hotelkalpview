import { useState, useMemo } from 'react';
import { HOTEL_SERVICES } from '../constants';
import { Utensils, Compass, Wifi, Trees, ShieldAlert, Award, Coffee, Activity, ChevronRight, MoonStar } from 'lucide-react';

export default function ServiceDescriptions() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dining' | 'experience' | 'amenity'>('all');

  const categories = [
    { label: 'All Services', value: 'all' as const },
    { label: 'Rooftop Dining', value: 'dining' as const },
    { label: 'Royal Experiences', value: 'experience' as const },
    { label: 'Homely Amenities', value: 'amenity' as const },
  ];

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return HOTEL_SERVICES;
    return HOTEL_SERVICES.filter((srv) => srv.category === activeCategory);
  }, [activeCategory]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'srv-1':
        return <Utensils className="w-5 h-5 text-brand-600" />;
      case 'srv-2':
        return <Compass className="w-5 h-5 text-brand-600" />;
      case 'srv-3':
        return <MoonStar className="w-5 h-5 text-brand-600" />;
      case 'srv-4':
        return <Coffee className="w-5 h-5 text-brand-600" />;
      case 'srv-5':
        return <Wifi className="w-5 h-5 text-brand-600" />;
      case 'srv-6':
        return <Trees className="w-5 h-5 text-brand-600" />;
      default:
        return <Award className="w-5 h-5 text-brand-600" />;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Double Column Service Intro block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-brand-600 block mb-3">
              ROYAL HOSPITALITY SERVED
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
              Elevated Services Tailored to Feel Like Home
            </h2>
            <p className="text-slate-500 mt-4 leading-relaxed font-light">
              At Hotel Kalpview, our core hospitality mantra is "Home Away From Home". We deliver bespoke attention to detail, traditional Indian courtesy, and modern security structures to satisfy leisure and professional guests alike.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeCategory === cat.value
                      ? 'bg-brand-50 border border-brand-300 text-brand-800 font-bold'
                      : 'border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Highlight Cards */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Overlay visual quote */}
            <div className="relative z-10">
              <span className="uppercase text-[9px] font-mono tracking-widest text-brand-300 font-bold block mb-2">
                Chef's Signature Gourmet
              </span>
              <h3 className="font-serif font-semibold text-xl leading-snug mb-3">
                Experience "Kalpview Canopy" Pure Veg Rooftop Restaurant
              </h3>
              <p className="text-xs text-brand-100 font-light leading-relaxed">
                Watch Gwalior Fort's blue carvings glow in gold at sundown while enjoying our hand-milled wheat rotis, fresh forest paneer, and direct chef-crafted Bundelkhand spice delicacies.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-brand-800">
              <div>
                <span className="text-[10px] uppercase font-mono text-brand-300 font-medium">Kitchen Style</span>
                <p className="text-xs font-bold text-white mt-0.5">100% Pure Vegetarian</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-brand-300 font-medium">Rooftop View</span>
                <p className="text-xs font-bold text-white mt-0.5">Majestic Gwalior Fort</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white hover:bg-brand-50/10 rounded-3xl border border-slate-100 hover:border-brand-200 shadow-sm hover:shadow-xl p-0 flex flex-col overflow-hidden transition-all duration-500 group hover:-translate-y-1"
            >
              {service.image && (
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className={`w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-brand-600 group-hover:rotate-[360deg]`}>
                    <div className="group-hover:text-white transition-colors">
                      {getServiceIcon(service.id)}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-brand-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-xs text-brand-600 font-bold tracking-wide uppercase select-none">
                  <span>Included Service</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Curated Trust Panel */}
        <div className="mt-16 bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-brand-600 font-serif font-black text-xl select-none">
              K
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Need specific custom coordination?</h4>
              <p className="text-xs text-slate-400 font-light mt-0.5">We cater to family reunions, religious groups, and wedding stays with tailor-made menus.</p>
            </div>
          </div>
          <a
            href="tel:+919876543210"
            className="w-full md:w-auto text-center px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Call Desk: +91 (Gwalior-Kalpview)
          </a>
        </div>
      </div>
    </section>
  );
}

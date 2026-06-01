import { GWALIOR_ATTRACTIONS } from '../constants';
import { Landmark, Compass, Clock, MapPin, Eye, ExternalLink } from 'lucide-react';

export default function GwaliorGuide() {
  return (
    <section id="guide-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-brand-600 block mb-3">
            EXPLORE THE FORT CITY
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-800 tracking-tight leading-snug animate-fade-in">
            Stay in the Heart of Ancient Legend
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed font-light">
            Hotel Kalpview is situated directly facing the rugged Gwalior Fort ridge, surrounded by archaeological treasures. Discover legendary spots located only minutes from your doorstep.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GWALIOR_ATTRACTIONS.map((attr) => (
            <div
              key={attr.id}
              className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-brand-500/20 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Photo Frame */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={attr.image}
                    alt={attr.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104 select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  
                  {/* Distance label top-right */}
                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 font-mono font-bold text-[10px] px-2 py-1 rounded-md shadow-sm flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-brand-600" />
                    <span>{attr.distance}</span>
                  </span>

                  {/* Scenic Tag bottom-left */}
                  <span className="absolute bottom-3 left-3 bg-brand-900/85 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    {attr.tag}
                  </span>
                </div>

                {/* Text Data */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand-700 transition-colors leading-tight mb-2">
                    {attr.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {attr.description}
                  </p>
                </div>
              </div>

              {/* Card CTA Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-[10px] font-bold text-slate-600">
                <span className="text-brand-700">Guide Recommended</span>
                <span className="bg-white px-2 py-1 rounded border border-slate-200 text-[10px] font-medium font-mono select-none">
                  Entry Free/Ticketed
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Location Map representation with the exact coordinates provided by the user */}
        <div id="locator-widget" className="mt-16 bg-brand-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-brand-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left coordinate panel */}
            <div className="lg:col-span-6 space-y-4">
              <span className="bg-brand-500/20 text-brand-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-brand-500/30 uppercase tracking-widest inline-block">
                Station & Landmark Hub
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl tracking-tight leading-tight">
                Our Physical Location & Directions
              </h3>
              <p className="text-xs sm:text-sm text-brand-100 font-light leading-relaxed">
                Hotel Kalpview is situated at <strong>26.2005° N, 78.1500° E</strong>, Gwalior (Madhya Pradesh), India. Only 1.8km to Gwalior Fort stairs and 1.5km to Gwalior Railway Junction.
              </p>

              {/* Bullet Info */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
                  <p className="text-slate-300"><strong>Address:</strong> Nadi Gate, Near Gwalior Fort Hillside, Gwalior 474002</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
                  <p className="text-slate-300"><strong>Front Desk Call Support:</strong> Open 24/7 for guest check-ins</p>
                </div>
              </div>

              {/* Real Google Maps outward redirect */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/place/Hotel+Kalpview/@26.2005302,78.1474854,17z/data=!3m1!4b1!4m9!3m8!1s0x3976c5d18e24fcb9:0x2d414420d8c44372!5m2!4m1!1i2!8m2!3d26.2005254!4d78.1500657!16s%2Fg%2F11xp71d2wt?entry=ttu"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-650 hover:bg-brand-600 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shadow-sm border border-brand-500/30 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-brand-300" />
                </a>
              </div>
            </div>

            {/* Right Map Canvas Visual Drawing */}
            <div className="lg:col-span-6 bg-slate-900 border border-brand-800 rounded-2xl p-4 sm:p-5 h-80 flex flex-col justify-between relative shadow-inner overflow-hidden select-none">
              
              {/* Detailed Visual Map Drawing */}
              <div className="absolute inset-0 bg-slate-950 opacity-40" />
              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                
                {/* Header coordinates */}
                <div className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md px-3 py-1.5 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-400">
                  <span>GPS Track: @26.2005° N, 78.1500° E</span>
                  <span className="text-emerald-400 font-bold">&#9679; LIVE RADAR</span>
                </div>

                {/* SVG Visual Map Art */}
                <div className="flex-1 w-full flex items-center justify-center relative">
                  
                  {/* Decorative curved roads representing Gwalior hills */}
                  <svg className="absolute inset-0 w-full h-full text-slate-800 stroke-current opacity-65 fill-none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,150 Q 80,100 180,160 T 400,100" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 120,0 L 120,300" strokeWidth="4" strokeDasharray="5,5" />
                    <path d="M 50,60 Q 200,200 350,230" strokeWidth="3" />
                  </svg>

                  {/* Central Landmark pins */}
                  <div className="absolute top-[40%] left-[30%] flex flex-col items-center animate-pulse">
                    <div className="bg-brand-600 text-white p-1.5 rounded-full ring-4 ring-brand-900/35 shadow-md">
                      <Landmark className="w-4 h-4 text-brand-100" />
                    </div>
                    <span className="text-[9px] font-mono bg-slate-900/90 text-brand-300 px-2 py-0.5 rounded border border-brand-800 mt-1 font-bold">
                      Hotel Kalpview
                    </span>
                  </div>

                  <div className="absolute top-[18%] left-[70%] flex flex-col items-center opacity-75">
                    <div className="bg-slate-800 text-slate-300 p-1.5 rounded-full ring-2 ring-slate-700/50 shadow">
                      <Landmark className="w-3 h-3 text-slate-400" />
                    </div>
                    <span className="text-[8px] font-mono bg-slate-900/90 text-slate-400 px-1.5 py-0.2 rounded border border-slate-800 mt-1">
                      Gwalior Fort hill
                    </span>
                  </div>

                  <div className="absolute top-[75%] left-[55%] flex flex-col items-center opacity-75">
                    <div className="bg-slate-800 text-slate-300 p-1.5 rounded-full ring-2 ring-slate-700/50 shadow">
                      <Compass className="w-3 h-3 text-slate-400" />
                    </div>
                    <span className="text-[8px] font-mono bg-slate-900/90 text-slate-400 px-1.5 py-0.2 rounded border border-slate-800 mt-1">
                      Gwalior Rly Station
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/90 backdrop-blur border border-slate-800 p-2.5 rounded-lg text-[10px] text-slate-200">
                  <p className="font-semibold text-emerald-400">Convenience Alert:</p>
                  <p className="text-slate-400 text-[10px] sm:text-[11px] font-light">Free station pickup is coordinated via physical AC shuttle cars inside 10 minutes. Click the call button or check it when completing booking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

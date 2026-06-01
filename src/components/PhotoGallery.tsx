import { useState } from 'react';
import { Eye, Image as ImageIcon, Layers, PlayCircle, Star } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'rooms' | 'dining' | 'scenic' | 'all';
  src: string;
  alt: string;
  title: string;
  tag: string;
}

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState<'all' | 'rooms' | 'dining' | 'scenic'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      category: 'scenic',
      src: '/src/assets/images/hero_cover_1780309427412.png',
      alt: 'Hotel Kalpview garden facade with Gwalior Fort in background',
      title: 'Majestic Facade & Gardens',
      tag: 'Main Courtyard'
    },
    {
      id: 'gal-2',
      category: 'rooms',
      src: '/src/assets/images/deluxe_room_1780309447360.png',
      alt: 'Deluxe Suite with cozy linens and forest green theme',
      title: 'Royal Fort View Suite Interior',
      tag: 'Suites'
    },
    {
      id: 'gal-3',
      category: 'dining',
      src: '/src/assets/images/rooftop_dining_1780309465417.png',
      alt: 'Rooftop canopy dining under the lit Gwalior Fort',
      title: 'Kalpview Canopy Dining Deck',
      tag: 'Pure Veg Restaurant'
    },
    {
      id: 'gal-4',
      category: 'rooms',
      src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
      alt: 'Executive Family Interconnected Room layouts',
      title: 'Executive Dual Queen Suite',
      tag: 'Family Rooms'
    },
    {
      id: 'gal-5',
      category: 'dining',
      src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
      alt: 'Traditional cuisine served in direct hospitality sets',
      title: 'Gourmet North & South Platters',
      tag: 'Authentic Menus'
    },
    {
      id: 'gal-6',
      category: 'scenic',
      src: 'https://images.unsplash.com/photo-1626294520247-497de26cd37e?auto=format&fit=crop&q=80&w=800',
      alt: 'Imposing walls of historical Gwalior Fort',
      title: 'Gwalior Fort At Twilight',
      tag: '1.8 km Scenic View'
    }
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const tabs = [
    { label: 'All Sights', value: 'all' as const },
    { label: 'Luxury Rooms', value: 'rooms' as const },
    { label: 'Rooftop Dining', value: 'dining' as const },
    { label: 'Scenic Fort Sights', value: 'scenic' as const },
  ];

  return (
    <section id="gallery-section" className="py-20 bg-slate-50 border-t border-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-brand-600 block mb-3">
            VISUAL PORTFOLIO
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-800 tracking-tight leading-snug">
            Immerse in the Kalpview Experience
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed font-light">
            Take a visual tour around our suites, botanical tree gardens, and the glowing canopy where travelers relax in the legendary landscape of Gwalior.
          </p>

          {/* Filtering tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8 border-b border-slate-200 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.value
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="bg-white rounded-2xl border border-slate-200/50 hover:border-brand-500/20 shadow-sm hover:shadow-lg overflow-hidden group cursor-pointer relative"
            >
              {/* Image Frame */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104 select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />
                
                {/* Floating look-up zoom icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-md">
                  <Eye className="w-5 h-5 text-brand-700" />
                </div>

                {/* Left Tag label */}
                <span className="absolute bottom-4 left-4 bg-brand-900/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg tracking-wide uppercase font-mono">
                  {item.tag}
                </span>
              </div>

              {/* Text footer inside image card */}
              <div className="p-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-brand-700 transition-colors leading-tight">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* High-quality Lightbox Modal */}
        {selectedPhoto && (
          <div
            id="lightbox-backdrop"
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl max-h-[85vh] w-full overflow-hidden rounded-2xl shadow-2xl bg-slate-900 border border-slate-800 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 hover:scale-105 transition-transform cursor-pointer z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex-1 w-full flex items-center justify-center overflow-hidden bg-black min-h-[300px]">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="max-w-full max-h-[65vh] object-contain select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 bg-white text-slate-800 border-t border-slate-100">
                <span className="bg-brand-100 text-brand-800 text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                  {selectedPhoto.tag}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 mt-1.5">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
                  {selectedPhoto.alt}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

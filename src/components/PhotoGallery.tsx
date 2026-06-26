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
      src: '/src/assets/images/img1.jpeg',
      alt: 'Kalpview banquet hall decorated with flower wall, hanging florals and balloon decor',
      title: 'Celebration Banquet Hall',
      tag: 'Events & Weddings'
    },
    {
      id: 'gal-2',
      category: 'dining',
      src: '/src/assets/images/img2.jpeg',
      alt: 'Kalpview air-conditioned restaurant with orange walls, buffet counter and Gwalior artwork',
      title: 'Kalpview Pure Veg Restaurant',
      tag: 'Restaurant'
    },
    {
      id: 'gal-3',
      category: 'scenic',
      src: '/src/assets/images/img3.jpeg',
      alt: 'Elegantly set function hall with gold satin chairs and white tablecloths for a banquet',
      title: 'Decorated Banquet Function Hall',
      tag: 'Banquet Hall'
    },
    {
      id: 'gal-4',
      category: 'dining',
      src: '/src/assets/images/img4.jpeg',
      alt: 'Hotel Kalpview ground floor dining area with reception desk and staircase in background',
      title: 'Ground Floor Dining & Lobby View',
      tag: 'Dining Area'
    },
    {
      id: 'gal-5',
      category: 'scenic',
      src: '/src/assets/images/img5.jpeg',
      alt: 'Hotel Kalpview internal corridor with modern black granite elevator',
      title: 'Elevator & Hotel Corridor',
      tag: 'Hotel Interiors'
    },
    {
      id: 'gal-6',
      category: 'scenic',
      src: '/src/assets/images/img6.jpeg',
      alt: 'Open-air corridor with lattice jali windows and guest room doors',
      title: 'Open-Air Floor Walkway',
      tag: 'Common Areas'
    },
    {
      id: 'gal-7',
      category: 'scenic',
      src: '/src/assets/images/img7.jpeg',
      alt: 'Hotel Kalpview reception and lobby with orange wall, LED TV and Gwalior heritage photos',
      title: 'Hotel Reception & Lobby',
      tag: 'Main Entrance'
    },
    {
      id: 'gal-8',
      category: 'rooms',
      src: '/src/assets/images/img8.jpeg',
      alt: 'Neat hotel room with king-size bed, red and black cushions, AC and flat-screen TV',
      title: 'Executive King Bed Room',
      tag: 'Room Interiors'
    },
    {
      id: 'gal-9',
      category: 'scenic',
      src: '/src/assets/images/img9.jpeg',
      alt: 'Conference and meeting room with rows of leather chairs, projector screen and water service',
      title: 'Conference & Meeting Hall',
      tag: 'Conference Room'
    },
    {
      id: 'gal-10',
      category: 'dining',
      src: '/src/assets/images/img10.jpeg',
      alt: 'Spacious main restaurant hall with chandelier, purple LED ceiling lights and lush plants',
      title: 'Main Dining Hall – Kalpview Restaurant',
      tag: 'Pure Veg Dining'
    },
    {
      id: 'gal-11',
      category: 'scenic',
      src: '/src/assets/images/img11.jpeg',
      alt: 'Hotel Kalpview long corridor with warm yellow walls, red carpet and room doors',
      title: 'Guest Floor Corridor',
      tag: 'Hotel Corridors'
    },
    {
      id: 'gal-12',
      category: 'scenic',
      src: '/src/assets/images/img12.jpeg',
      alt: 'Hotel lounge and waiting area with sofa seating, mosaic wall art and arched wooden entrance door',
      title: 'Hotel Lounge & Waiting Area',
      tag: 'Lounge'
    },
    {
      id: 'gal-13',
      category: 'scenic',
      src: '/src/assets/images/img13.jpeg',
      alt: 'Wide-angle view of Kalpview banquet hall with flower wall stage, hanging florals and balloon decor',
      title: 'Grand Banquet Hall – Full View',
      tag: 'Events & Celebrations'
    },
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

import { Room, Attraction, Service, Review } from './types';

export const HOTEL_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Kalpview Royal Executive Suite',
    description: 'Our crown jewel. This expansive suite offers an unobstructed 180-degree view of the majestic Gwalior Fort. Furnished with premium hand-worked teak furniture, a private seating parlor, and curated luxury amenities.',
    size: '480 sq ft',
    view: 'Panoramic Gwalior Fort View',
    maxGuests: 3,
    pricePerNight: 2000,
    image: '/src/assets/images/img8.jpeg',
    amenities: ['Fort Facing Balcony', 'Complimentary Breakfast', 'High-Speed Wi-Fi', 'Smart TV with Streaming', 'Premium Tea Station', 'In-Room Safe', 'Air Conditioning', 'Bathrobes & Jetted Tub'],
    bedType: 'Ultra King Bed',
    tier: 'Royal Executive',
    rating: 4.9,
    ratingCount: 38,
    availableCount: 3
  },
  {
    id: '2',
    name: 'Executive Comfort Room',
    description: 'Elegant comfort featuring a harmonious blend of traditional Gwalior hospitality and modern luxuries. Includes soft plush beds, warm ambient lighting, and views of our lush garden courtyard.',
    size: '350 sq ft',
    view: 'Lush Garden Courtyard View',
    maxGuests: 2,
    pricePerNight: 1600,
    image: '/src/assets/images/img8.jpeg',
    amenities: ['Garden View', 'Complimentary Breakfast', 'High-Speed Wi-Fi', 'LED TV', 'Mini Fridge', 'Tea/Coffee Maker', 'Premium Toiletries', 'Air Conditioning'],
    bedType: 'Luxury King Bed',
    tier: 'Executive',
    rating: 4.7,
    ratingCount: 54,
    availableCount: 5
  },
  {
    id: '3',
    name: 'Semi Executive Heritage Room',
    description: 'A delightful and compact sanctuary, perfect for business travelers or couples. Featuring comfortable bedding, clean modern decor, and a quiet city-facing view to unwind beautifully.',
    size: '260 sq ft',
    view: 'Quiet Gwalior City View',
    maxGuests: 2,
    pricePerNight: 1200,
    image: '/src/assets/images/img8.jpeg',
    amenities: ['Complimentary Wi-Fi', 'Pure Veg Dining Discounts', 'LED TV', 'Coffee Maker', 'Plush Bedding', 'Air Conditioning', 'Daily Newspaper'],
    bedType: 'Royal Double Bed',
    tier: 'Semi Executive',
    rating: 4.5,
    ratingCount: 42,
    availableCount: 6
  }
];

export const GWALIOR_ATTRACTIONS: Attraction[] = [
  {
    id: 'attr-1',
    name: 'Gwalior Fort',
    distance: '3.5 km from Hotel',
    description: 'Often referred to as "the pearl amongst fortresses in India", this imposing hill fort has majestic blue tiled walls, stunning palaces, and deep historic significance dating back over 1000 years.',
    image: '/src/assets/images/gwalior_fort.jpg',
    tag: 'Must Visit'
  },
  {
    id: 'attr-2',
    name: 'Jai Vilas Palace',
    distance: '2.7 km from Hotel',
    description: 'A grand nineteenth-century palace boasting stunning Italianate and Tuscan architectural styles. Home to the legendary Scindia dynasty museum and two of the largest chandeliers in the world.',
    image: '/src/assets/images/jai_vilas_palace.jpg',
    tag: 'Historical'
  },
  {
    id: 'attr-3',
    name: 'Siddhachal Jain Sculptures',
    distance: '4.0 km from Hotel',
    description: 'Magnificent rock-cut colossal statues of Jain Tirthankaras carved into the cliffs of Gwalior Fort hill, displaying majestic craftsmanship dating back to the 15th century.',
    image: '/src/assets/images/siddhachal_sculptures.jpg',
    tag: 'Spiritual'
  },
  {
    id: 'attr-4',
    name: 'Sun Temple (Surya Mandir)',
    distance: '7.0 km from Hotel',
    description: 'Inspired by the famous Konark Sun Temple, this modern red sandstone and white marble marvel is dedicated to the Sun God, surrounded by tranquil gardens.',
    image: '/src/assets/images/surya_mandir.jpg',
    tag: 'Tranquil'
  }
];

export const HOTEL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Scenic Rooftop Dining',
    description: 'Indulge in pure veg culinary masterpieces at "Kalpview Canopy" overlooking the lit-up ramparts of Gwalior Fort at night.',
    image: '/src/assets/images/img10.jpeg',
    category: 'dining'
  },
  {
    id: 'srv-2',
    title: 'Complementary Station Pick-Up',
    description: 'To welcome you home, we provide clean, AC shuttle pickup services from the Gwalior Railway Junction with prior intimation.',
    category: 'experience'
  },
  {
    id: 'srv-3',
    title: 'Heritage Fort Tour Guides',
    description: 'Arrange private, expert-guided historical walks around Gwalior Fort, ancient step-wells, and legendary music sites like Tansen’s Tomb.',
    category: 'experience'
  },
  {
    id: 'srv-4',
    title: 'Pure Vegetarian Culinary Kitchen',
    description: 'An elite multi-cuisine restaurant serving authentic regional Bundelkhand delicacies alongside standard North & South Indian menus.',
    image: '/src/assets/images/img2.jpeg',
    category: 'dining'
  },
  {
    id: 'srv-5',
    title: 'Seamless In-Room Work Setup',
    description: 'Perfect for business travelers. High-speed 150 Mbps Wi-Fi, responsive tea stations, and ergonomically configured workspaces.',
    category: 'amenity'
  },
  {
    id: 'srv-6',
    title: 'Verdant Garden Oasis',
    description: 'Sip legendary masala tea under the rich shade of our heritage Banyan tree model that inspires our brand’s identity logo.',
    category: 'accommodation'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    rating: 5,
    date: '2026-05-12',
    comment: 'The fort view from our suite balcony was breathtaking, especially post-sunset when the fort lit up in gold. Staff treated us like royalty. Pure veg food at the rooftop was standard-setting!',
    roomType: 'Royal Fort View Suite'
  },
  {
    id: 'rev-2',
    author: 'Meera Deshmukh',
    rating: 5,
    date: '2026-04-28',
    comment: 'Extremely clean rooms with a warm Gwalior hospitality feel. Truly a home away from home as their tree logo says. Very close to the fort entrance, which saved us a lot of travel time.',
    roomType: 'Heritage Deluxe Room'
  },
  {
    id: 'rev-3',
    author: 'Rajesh Kaushik',
    rating: 4,
    date: '2026-05-05',
    comment: 'Travelled with my family of four. The Executive interconnected room solved all coordinate challenges. Best feature was the station pickup service which was fully punctual.',
    roomType: 'Executive Family Room'
  }
];

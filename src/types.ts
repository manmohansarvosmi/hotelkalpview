export interface Room {
  id: string;
  name: string;
  description: string;
  size: string; // e.g. "350 sq ft"
  view: string; // e.g. "Gwalior Fort View", "Garden View", etc.
  maxGuests: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  bedType: string;
  tier: 'Suite' | 'Deluxe' | 'Executive' | 'Standard';
  rating: number;
  ratingCount: number;
  availableCount: number;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkIn: string; // ISO date YYYY-MM-DD
  checkOut: string; // ISO date YYYY-MM-DD
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestsCount: number;
  totalAmount: number;
  status: 'Confirmed' | 'Cancelled';
  addOns: string[];
  bookingDate: string; // ISO date
  specialRequests?: string;
  daysDuration: number;
}

export interface Attraction {
  id: string;
  name: string;
  distance: string;
  description: string;
  image: string;
  tag: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'accommodation' | 'dining' | 'experience' | 'amenity';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  roomType: string;
}

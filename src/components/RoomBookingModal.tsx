import React, { useState, useEffect } from 'react';
import { X, Calendar, ShieldCheck, Mail, Phone, User, CheckCircle2, FileText, Info } from 'lucide-react';
import { Room, Booking } from '../types';

interface RoomBookingModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuestsCount?: number;
}

export default function RoomBookingModal({
  room,
  isOpen,
  onClose,
  onBookingSuccess,
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuestsCount = 2,
}: RoomBookingModalProps) {
  // Dates default setting
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialCheckIn || todayStr);
  const [checkOut, setCheckOut] = useState(initialCheckOut || tomorrowStr);
  const [guestsCount, setGuestsCount] = useState(initialGuestsCount);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Package Extras
  const [addOnBreakfast, setAddOnBreakfast] = useState(false);
  const [addOnTour, setAddOnTour] = useState(false);
  const [addOnPickUp, setAddOnPickUp] = useState(false);

  useEffect(() => {
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuestsCount) setGuestsCount(initialGuestsCount);
  }, [initialCheckIn, initialCheckOut, initialGuestsCount, isOpen]);

  if (!isOpen) return null;

  // Day Calculator
  const getDaysCount = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays <= 0 ? 1 : diffDays;
  };

  const nights = getDaysCount();

  // Price Calculation Structure
  const roomCostTotal = room.pricePerNight * nights;
  
  const breakfastPrice = 350; // Per head per night
  const tourPrice = 1200; // Flat fee
  const pickupPrice = 0; // Complimentary free of charge
  
  const breakfastTotal = addOnBreakfast ? breakfastPrice * guestsCount * nights : 0;
  const tourTotal = addOnTour ? tourPrice : 0;
  
  const subtotal = roomCostTotal + breakfastTotal + tourTotal;
  const taxGst = Math.round(subtotal * 0.12); // 12% Indian Luxury Hotel Tax
  const totalAmount = subtotal + taxGst;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedAddOns: string[] = [];
    if (addOnBreakfast) selectedAddOns.push(`Premium Breakfast Buffet (₹${breakfastPrice}/person/day)`);
    if (addOnTour) selectedAddOns.push(`Private Gwalior Fort & Heritage Guided Walk (₹${tourPrice} flat)`);
    if (addOnPickUp) selectedAddOns.push('Complimentary AC Station pickup shuttle (Free)');

    const uniqueId = 'BKG-' + Math.floor(100000 + Math.random() * 900000);

    const bookingPayload: Booking = {
      id: uniqueId,
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      checkIn,
      checkOut,
      guestName,
      guestEmail,
      guestPhone,
      guestsCount,
      totalAmount,
      status: 'Confirmed',
      addOns: selectedAddOns,
      bookingDate: new Date().toISOString(),
      specialRequests: specialRequests.trim() || undefined,
      daysDuration: nights,
    };

    // Send notification to Telegram
    import('../services/telegramService').then(({ notifyNewBooking }) => {
      notifyNewBooking(bookingPayload);
    });

    onBookingSuccess(bookingPayload);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in animate-duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between border-b border-brand-850">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-brand-300 font-semibold">Instant Reservation Desk</span>
            <h3 className="font-serif font-bold text-xl leading-tight">Book Your Stay with Hotel Kalpview</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Side: Booking Entry Form */}
          <form onSubmit={handleFormSubmit} className="md:col-span-7 p-6 border-r border-slate-100 flex flex-col space-y-4">
            
            {/* Contact Information Sector */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-brand-500" />
                <span>1. Primary Guest Details</span>
              </h4>
              <div className="space-y-3.5">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-medium text-slate-500 mb-1">Full Name *</label>
                  <div className="relative">
                    <input
                      id="modal-name"
                      type="text"
                      className="w-full bg-slate-50 text-slate-800 border border-slate-200 focus:border-brand-500 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-50 transition-all font-medium"
                      placeholder="e.g. Manmohan Shrivas"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-medium text-slate-500 mb-1">Email Address *</label>
                    <div className="relative">
                      <input
                        id="modal-email"
                        type="email"
                        className="w-full bg-slate-50 text-slate-800 border border-slate-200 focus:border-brand-500 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-50 transition-all font-medium"
                        placeholder="yourname@gmail.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        required
                      />
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-medium text-slate-500 mb-1">Mobile Number *</label>
                    <div className="relative">
                      <input
                        id="modal-phone"
                        type="tel"
                        className="w-full bg-slate-50 text-slate-800 border border-slate-200 focus:border-brand-500 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-50 transition-all font-medium"
                        placeholder="+91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        required
                      />
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Dates Verification Sector */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-500" />
                <span>2. Modify Dates & Guests</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="modal-check-in" className="block text-xs font-medium text-slate-500 mb-1">Check In</label>
                  <input
                    id="modal-check-in"
                    type="date"
                    min={todayStr}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (new Date(e.target.value) >= new Date(checkOut)) {
                        const nextDay = new Date(e.target.value);
                        nextDay.setDate(nextDay.getDate() + 1);
                        setCheckOut(nextDay.toISOString().split('T')[0]);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none text-slate-700"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="modal-check-out" className="block text-xs font-medium text-slate-500 mb-1">Check Out</label>
                  <input
                    id="modal-check-out"
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none text-slate-700"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="modal-guests" className="block text-xs font-medium text-slate-500 mb-1">Guests</label>
                  <select
                    id="modal-guests"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none text-slate-700 cursor-pointer"
                  >
                    {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exclusive local Hospitality Add-ons designed for Gwalior custom packages */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                <span>3. Highly Recommended Add-ons (Optional)</span>
              </h4>
              <div className="space-y-2">
                {/* Station Pickup */}
                <label className="flex items-start space-x-3 p-2.5 border border-emerald-100 rounded-xl bg-brand-50/40 hover:bg-brand-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={addOnPickUp}
                    onChange={(e) => setAddOnPickUp(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 accent-brand-600 h-4 w-4"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-800">AC Gwalior Station Pickup</span>
                      <span className="bg-brand-100 text-brand-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">Free</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">Comfortable pickup from the station inside a pristine air-conditioned sedan. Prior booking required.</p>
                  </div>
                </label>

                {/* Breakfast Buffet */}
                <label className="flex items-start space-x-3 p-2.5 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={addOnBreakfast}
                    onChange={(e) => setAddOnBreakfast(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 accent-brand-600 h-4 w-4"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-800">"Kalpview Canopy" Buffet Breakfast</span>
                      <span className="text-[10px] text-brand-700 font-semibold font-mono">₹{breakfastPrice}/day/person</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">Our famous rooftop pure veg breakfast buffet featuring hand-rolled items, fresh juices, and fruits with fort views.</p>
                  </div>
                </label>

                {/* Gwalior Fort guided trip */}
                <label className="flex items-start space-x-3 p-2.5 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={addOnTour}
                    onChange={(e) => setAddOnTour(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 accent-brand-600 h-4 w-4"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-800">Private Gwalior Fort Guided Tour & Cabs</span>
                      <span className="text-[10px] text-brand-700 font-semibold font-mono">₹{tourPrice} flat</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">Accompanied by a certified historical narrator including cab travel to and inside the massive fort campus.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label htmlFor="modal-requests" className="block text-xs font-medium text-slate-500 mb-1">Special Requests or Dietary Prefs</label>
              <textarea
                id="modal-requests"
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-brand-50 transition-all text-slate-700"
                placeholder="e.g. Jain food preferences, early check-in, high floor..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 text-slate-400 select-none pb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <p className="text-[11px] leading-tight">By completing booking you agree to 100% refund on cancellations requested 24h prior.</p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg py-2.5 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-confirm-booking"
                className="flex-[2] bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-lg py-2.5 text-xs font-semibold shadow-md transition-colors cursor-pointer text-center"
              >
                Confirm Stay ({nights} {nights === 1 ? 'Night' : 'Nights'})
              </button>
            </div>
          </form>

          {/* Right Side: Stay Summary & Real-time Live Price Invoice */}
          <div className="md:col-span-5 bg-slate-50 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Booking Slip Summary</span>
              </h4>

              {/* Room Card Mini */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm flex space-x-3">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-20 h-16 object-cover rounded-lg bg-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <span className="bg-brand-100 text-brand-800 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase font-mono tracking-tight leading-none">
                    {room.tier}
                  </span>
                  <h5 className="font-serif font-bold text-slate-800 text-sm mt-1 truncate">{room.name}</h5>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{room.view}</p>
                </div>
              </div>

              {/* Detailed Invoice Breakdown */}
              <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm space-y-2.5">
                <div className="flex justify-between items-baseline text-xs text-slate-500">
                  <span>Base Rate ({nights} nts × ₹{room.pricePerNight})</span>
                  <span className="font-mono text-slate-700 font-medium">₹{roomCostTotal.toLocaleString('en-IN')}</span>
                </div>

                {addOnBreakfast && (
                  <div className="flex justify-between items-baseline text-xs text-slate-500">
                    <span>BF Buffet ({guestsCount} gs × {nights} dys)</span>
                    <span className="font-mono text-slate-700 font-medium">₹{breakfastTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {addOnTour && (
                  <div className="flex justify-between items-baseline text-xs text-slate-500">
                    <span>Guided Heritage Tour (Flat Fee)</span>
                    <span className="font-mono text-slate-700 font-medium">₹{tourTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {addOnPickUp && (
                  <div className="flex justify-between items-baseline text-xs text-slate-500">
                    <span>Station Pickup Shuttle</span>
                    <span className="font-mono text-emerald-600 font-semibold uppercase text-[10px]">Free</span>
                  </div>
                )}

                <hr className="border-slate-100" />

                <div className="flex justify-between items-baseline text-xs text-slate-600">
                  <span>Net Taxable Base Amount</span>
                  <span className="font-mono text-slate-700 font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-baseline text-xs text-slate-500">
                  <span>CGST + SGST Luxury Tax (12%)</span>
                  <span className="font-mono text-slate-700 font-medium">₹{taxGst.toLocaleString('en-IN')}</span>
                </div>

                <hr className="border-slate-150" />

                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-800 uppercase">Estimated Payable:</span>
                  <span className="font-mono text-base font-bold text-brand-800">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Booking Info Box */}
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-3.5 flex items-start space-x-2.5">
                <Info className="w-4.5 h-4.5 text-brand-500 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-600 leading-normal">
                  <p className="font-bold text-slate-700 mb-0.5">Flexible Cancellation</p>
                  Enjoy peace of mind. Free changes up to 24 hours prior to travel. Pay in full or partial amount during physical check-in.
                </div>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-6 p-3 bg-white/50 border border-slate-100 rounded-xl text-center select-none">
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                ⭐ Rated 4.9/5 stars for Booking Security in Gwalior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

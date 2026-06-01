import { useState } from 'react';
import { Booking } from '../types';
import { Calendar, Trash2, Printer, CheckCircle2, XCircle, Moon, Users, Compass, AlertCircle, RefreshCw } from 'lucide-react';

interface BookingDashboardProps {
  bookings: Booking[];
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking: (id: string) => void;
}

export default function BookingDashboard({
  bookings,
  isOpen,
  onClose,
  onCancelBooking,
}: BookingDashboardProps) {
  const [filter, setFilter] = useState<'All' | 'Confirmed' | 'Cancelled'>('All');
  const [selectedReceipt, setSelectedReceipt] = useState<Booking | null>(null);

  if (!isOpen) return null;

  // Filter stays
  const filteredBookings = bookings.filter(
    (b) => filter === 'All' || b.status === filter
  );

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoStr;
    }
  };

  const calculateDaysLeft = (checkInStr: string) => {
    try {
      const today = new Date();
      today.setHours(0,0,0,0);
      const start = new Date(checkInStr);
      start.setHours(0,0,0,0);
      const diffTime = start.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return 0;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Dashboard Header */}
        <div className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between border-b border-brand-850">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-brand-300 font-semibold">User Stays Console</span>
            <h3 className="font-serif font-bold text-xl leading-tight">My Bookings Desk</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Console Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          {selectedReceipt ? (
            /* Digital PDF styled Voucher/Receipt Screen */
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
              
              {/* Back CTA */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 select-none">
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="text-xs text-brand-600 font-bold hover:underline cursor-pointer flex items-center space-x-1"
                >
                  <span>&larr; Back to Booking List</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-brand-50 hover:bg-brand-100 text-brand-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-brand-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>

              {/* Invoice Layout */}
              <div className="space-y-4 print-section">
                
                {/* Header Badge */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-brand-900">HOTEL KALPVIEW</h4>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-brand-600">Home Away From Home</p>
                    <p className="text-[11px] text-slate-400 mt-1">Nadi Gate, Near Gwalior Fort Hill, MP 474002</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Paid & Confirmed
                    </span>
                    <p className="font-mono text-slate-500 text-xs mt-2">Voucher #: {selectedReceipt.id}</p>
                    <p className="text-[10px] text-slate-400">Date: {formatDate(selectedReceipt.bookingDate)}</p>
                  </div>
                </div>

                <hr className="border-slate-200" />

                {/* Main Client/Stay Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium uppercase text-[10px]">Guest Information</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedReceipt.guestName}</p>
                    <p className="text-slate-500">{selectedReceipt.guestEmail}</p>
                    <p className="text-slate-500">Phone: {selectedReceipt.guestPhone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium uppercase text-[10px]">Stay Summary</span>
                    <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedReceipt.roomName}</p>
                    <p className="text-slate-500">
                      Check-in: <strong>{formatDate(selectedReceipt.checkIn)}</strong>
                    </p>
                    <p className="text-slate-500">
                      Check-out: <strong>{formatDate(selectedReceipt.checkOut)}</strong>
                    </p>
                    <p className="text-slate-500 font-medium">
                      Duration: {selectedReceipt.daysDuration} {selectedReceipt.daysDuration === 1 ? 'Night' : 'Nights'} | Guests: {selectedReceipt.guestsCount} adults
                    </p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Custom Package Addons list */}
                {selectedReceipt.addOns.length > 0 && (
                  <div>
                    <span className="text-slate-400 font-medium uppercase text-[10px]">Activated Package Inclusions</span>
                    <ul className="list-disc pl-4 text-slate-600 text-xs mt-1.5 space-y-1">
                      {selectedReceipt.addOns.map((add, index) => (
                        <li key={index}>{add}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Total Receipts */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-right">
                  <span className="text-xs text-slate-400 uppercase font-medium">Grand Total Value Paid</span>
                  <h3 className="font-mono text-xl sm:text-2xl font-black text-brand-900 mt-1">
                    ₹{selectedReceipt.totalAmount.toLocaleString('en-IN')}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">Price inclusive of 12% Luxury Hotel GST. Paid via Local Pay-at-Stay Option.</p>
                </div>

                {/* Print Sign Footer */}
                <div className="text-center pt-4 text-[10px] text-slate-400 space-y-1">
                  <p>Thank you for choosing Hotel Kalpview as your home away from home.</p>
                  <p className="font-mono">Contact Desk Support: +91 (Kalpview Support) or email customercare@hotelkalpview.com</p>
                </div>
              </div>
            </div>
          ) : (
            /* General list items stay view */
            <>
              {/* Top Filters Block */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/55 shadow-sm">
                <div className="flex space-x-1">
                  {(['All', 'Confirmed', 'Cancelled'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFilter(opt)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        filter === opt
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {opt} Stays
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  Persisted stays index count: <strong className="text-slate-700 font-mono">{bookings.length}</strong>
                </div>
              </div>

              {/* Bookings List Structure */}
              {filteredBookings.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">No bookings to show</h4>
                    <p className="text-slate-400 text-xs mt-1Leading-relaxed font-light">
                      If you booked a room, it will reside safely in your browser’s localStorage. Click check availability to build a brand new Gwalior stay!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Explore Rooms List
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((b) => {
                    const daysLeft = calculateDaysLeft(b.checkIn);
                    
                    return (
                      <div
                        key={b.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
                      >
                        {/* Summary Details Left */}
                        <div className="flex items-start space-x-4">
                          <img
                            src={b.roomImage}
                            alt={b.roomName}
                            className="w-20 h-16 object-cover rounded-xl bg-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            {/* status badges */}
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="font-mono text-[10px] font-bold text-slate-400">#{b.id}</span>
                              {b.status === 'Confirmed' ? (
                                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 uppercase">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                                  <span>Active Confirmed</span>
                                </span>
                              ) : (
                                <span className="bg-rose-50 text-rose-800 border border-rose-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                                  Cancelled
                                </span>
                              )}

                              {b.status === 'Confirmed' && daysLeft > 0 && (
                                <span className="bg-sky-50 text-sky-800 border border-sky-200 text-[9px] font-bold px-2 py-0.5 rounded-full">
                                  Arriving in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                                </span>
                              )}
                            </div>

                            <h4 className="font-serif font-bold text-base text-slate-800 mt-1.5 group-hover:text-brand-700 transition-colors">
                              {b.roomName}
                            </h4>

                            <div className="flex flex-wrap items-center text-slate-500 text-xs mt-1 gap-x-4 gap-y-1">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>Check-in: {formatDate(b.checkIn)}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Moon className="w-3.5 h-3.5 text-slate-400" />
                                <span>{b.daysDuration} {b.daysDuration === 1 ? 'Night' : 'Nights'}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                <span>{b.guestsCount} Guests</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Invoice CTA & Cancel Right */}
                        <div className="w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex items-center justify-between md:justify-end gap-3.5">
                          <div className="text-left md:text-right">
                            <span className="text-[10px] text-slate-400 uppercase font-medium">Estimated Payable</span>
                            <p className="font-mono text-base font-bold text-brand-900 leading-none mt-0.5">
                              ₹{b.totalAmount.toLocaleString('en-IN')}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* View voucher */}
                            <button
                              onClick={() => setSelectedReceipt(b)}
                              className="bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200/60 p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1"
                            >
                              <Printer className="w-4 h-4" />
                              <span className="hidden sm:inline">Voucher</span>
                            </button>

                            {/* cancel stays trigger */}
                            {b.status === 'Confirmed' && (
                              <button
                                onClick={() => {
                                  if (confirm('Are you absolutely sure you want to cancel your Hotel Kalpview reservation? Cancellation is fully free of cost.')) {
                                    onCancelBooking(b.id);
                                  }
                                }}
                                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Cancel</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Support Help Center footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <p className="flex items-center space-x-1 font-medium">
            <AlertCircle className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Trouble locating a booking? We authorize bookings strictly in local storage.</span>
          </p>
          <button
            onClick={() => {
              if (confirm('Reset your entire reservation records cache? This is irreversible.')) {
                localStorage.removeItem('kalpview_bookings');
                window.location.reload();
              }
            }}
            className="text-slate-400 hover:text-rose-600 cursor-pointer text-[10px] hover:underline"
          >
            Reset Offline Stays Registry
          </button>
        </div>
      </div>
    </div>
  );
}

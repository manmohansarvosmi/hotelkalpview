import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus, Pencil, Trash2, Save, X, CheckCircle2, AlertCircle,
  Hotel, IndianRupee, Star, Users, BedDouble, Expand, Image,
  RefreshCw, Wifi, Eye, ChevronDown, ChevronUp, Shield, Loader,
  Calendar, BookOpen, Clock, Phone, Mail, User
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ─────────────────── TYPES ───────────────────────────────────────────────────
interface AdminRoom {
  id?: string;
  name: string;
  description: string;
  tier: 'Royal Executive' | 'Executive' | 'Semi Executive';
  size: string;
  viewType: string;
  maxGuests: number;
  bedType: string;
  priceEpSingle: number;
  priceEpDouble: number;
  priceCpSingle: number;
  priceCpDouble: number;
  priceMapSingle: number;
  priceMapDouble: number;
  image: string;
  amenities: string[];
  rating: number;
  ratingCount: number;
  availableCount: number;
  isActive?: boolean;
}

interface AdminBooking {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestsCount: number;
  totalAmount: number;
  status: string;
  addOns: string[];
  bookingDate: string;
  specialRequests?: string;
  daysDuration: number;
  createdAt: string;
}

const EMPTY_ROOM: AdminRoom = {
  name: '',
  description: '',
  tier: 'Executive',
  size: '',
  viewType: '',
  maxGuests: 2,
  bedType: '',
  priceEpSingle: 0,
  priceEpDouble: 0,
  priceCpSingle: 0,
  priceCpDouble: 0,
  priceMapSingle: 0,
  priceMapDouble: 0,
  image: '',
  amenities: [],
  rating: 4.5,
  ratingCount: 0,
  availableCount: 1,
};

// ─────────────────── TOAST ───────────────────────────────────────────────────
function Toast({ msg, type, onDone }: { msg: string; type: 'success' | 'error'; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold animate-fade-in-up ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {msg}
    </div>
  );
}

// ─────────────────── PRICE FIELD ─────────────────────────────────────────────
function PriceField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
        <input
          type="number"
          min={0}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
        />
      </div>
    </div>
  );
}

// ─────────────────── ROOM FORM ────────────────────────────────────────────────
function RoomForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: AdminRoom;
  onSave: (r: AdminRoom) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<AdminRoom>({ ...initial });
  const [amenityInput, setAmenityInput] = useState('');
  const [expandedPricing, setExpandedPricing] = useState(true);

  const set = (key: keyof AdminRoom, val: any) => setForm(f => ({ ...f, [key]: val }));

  const addAmenity = () => {
    const a = amenityInput.trim();
    if (a && !form.amenities.includes(a)) {
      set('amenities', [...form.amenities, a]);
      setAmenityInput('');
    }
  };
  const removeAmenity = (i: number) => set('amenities', form.amenities.filter((_, idx) => idx !== i));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-5 flex items-center justify-between">
          <div>
            <p className="text-brand-300 text-[10px] font-mono uppercase tracking-widest">Admin Panel</p>
            <h2 className="text-white font-serif font-bold text-xl">
              {initial.id ? 'Edit Room' : 'Add New Room'}
            </h2>
          </div>
          <button onClick={onCancel} className="text-white/60 hover:text-white transition p-2 rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Hotel className="w-4 h-4 text-brand-500" /> Room Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Room Name *</label>
                <input
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="e.g. Kalpview Royal Executive Suite"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 transition"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  rows={3}
                  placeholder="Brief description of the room..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:ring-2 focus:ring-brand-500 transition resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Category</label>
                <select
                  value={form.tier}
                  onChange={e => set('tier', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 transition cursor-pointer"
                >
                  <option value="Royal Executive">Royal Executive</option>
                  <option value="Executive">Executive</option>
                  <option value="Semi Executive">Semi Executive</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Bed Type</label>
                <input
                  value={form.bedType}
                  onChange={e => set('bedType', e.target.value)}
                  placeholder="e.g. King Bed"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Room Size</label>
                <input
                  value={form.size}
                  onChange={e => set('size', e.target.value)}
                  placeholder="e.g. 320 sq ft"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Max Guests</label>
                <input
                  type="number" min={1} max={8}
                  value={form.maxGuests}
                  onChange={e => set('maxGuests', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Room View</label>
                <input
                  value={form.viewType}
                  onChange={e => set('viewType', e.target.value)}
                  placeholder="e.g. Gwalior Fort View"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Available Rooms</label>
                <input
                  type="number" min={0}
                  value={form.availableCount}
                  onChange={e => set('availableCount', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>
          </section>

          {/* Image URL */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Image className="w-4 h-4 text-brand-500" /> Room Image
            </h3>
            <div className="flex gap-4 items-start">
              <input
                value={form.image}
                onChange={e => set('image', e.target.value)}
                placeholder="Paste image URL (Unsplash, Google Drive, etc.)"
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
              {form.image && (
                <img src={form.image} alt="preview" className="w-20 h-16 object-cover rounded-xl border border-slate-200 shrink-0" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </section>

          {/* Pricing */}
          <section>
            <button
              type="button"
              onClick={() => setExpandedPricing(p => !p)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-brand-500" /> Pricing (All Plans)
              </h3>
              {expandedPricing ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {expandedPricing && (
              <div className="space-y-4">
                {/* EP */}
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-3">EP — Room Only</p>
                  <div className="grid grid-cols-2 gap-4">
                    <PriceField label="Single Occupancy" value={form.priceEpSingle} onChange={v => set('priceEpSingle', v)} />
                    <PriceField label="Double Occupancy" value={form.priceEpDouble} onChange={v => set('priceEpDouble', v)} />
                  </div>
                </div>
                {/* CP */}
                <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                  <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-3">CP — Room + Breakfast</p>
                  <div className="grid grid-cols-2 gap-4">
                    <PriceField label="Single Occupancy" value={form.priceCpSingle} onChange={v => set('priceCpSingle', v)} />
                    <PriceField label="Double Occupancy" value={form.priceCpDouble} onChange={v => set('priceCpDouble', v)} />
                  </div>
                </div>
                {/* MAP */}
                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                  <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-3">MAP — Breakfast + Dinner</p>
                  <div className="grid grid-cols-2 gap-4">
                    <PriceField label="Single Occupancy" value={form.priceMapSingle} onChange={v => set('priceMapSingle', v)} />
                    <PriceField label="Double Occupancy" value={form.priceMapDouble} onChange={v => set('priceMapDouble', v)} />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Amenities */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-brand-500" /> Amenities
            </h3>
            <div className="flex gap-2 mb-3">
              <input
                value={amenityInput}
                onChange={e => setAmenityInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                placeholder="Type amenity and press Enter..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
              <button type="button" onClick={addAmenity} className="px-4 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.amenities.map((a, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  {a}
                  <button type="button" onClick={() => removeAmenity(i)} className="text-slate-400 hover:text-red-500 transition">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {form.amenities.length === 0 && (
                <p className="text-xs text-slate-400 italic">No amenities added yet</p>
              )}
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave(form)}
              disabled={saving || !form.name}
              className="flex-[2] py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl text-sm font-black uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
            >
              {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Room'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── ROOM CARD ────────────────────────────────────────────────
function RoomCard({ room, onEdit, onDelete }: { room: AdminRoom; onEdit: () => void; onDelete: () => Promise<void> }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {room.image ? (
          <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Hotel className="w-12 h-12" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-brand-600 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">{room.tier}</span>
          {!room.isActive && (
            <span className="bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">Inactive</span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-serif font-bold text-slate-900 text-base leading-snug mb-1 group-hover:text-brand-700 transition">{room.name}</h3>
        <p className="text-xs text-slate-400 font-medium mb-4 line-clamp-2">{room.description || 'No description'}</p>

        <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-slate-500 mb-4 border-t border-b border-slate-50 py-3">
          <div className="flex items-center gap-1"><Users className="w-3 h-3"/>{room.maxGuests} Guests</div>
          <div className="flex items-center gap-1"><BedDouble className="w-3 h-3"/>{room.bedType || '—'}</div>
          <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500"/>{room.rating}</div>
        </div>

        {/* EP Prices */}
        <div className="bg-slate-50 rounded-xl p-3 mb-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">EP (Room Only)</p>
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Single: <span className="text-brand-700">₹{room.priceEpSingle.toLocaleString('en-IN')}</span></span>
            <span>Double: <span className="text-brand-700">₹{room.priceEpDouble.toLocaleString('en-IN')}</span></span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold text-xs rounded-xl transition"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => onDelete()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs rounded-xl transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── DB CONFIG MODAL ─────────────────────────────────────────
function DBConfigModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-brand-600" />
          <h2 className="font-serif font-bold text-xl text-slate-900">Database Setup</h2>
        </div>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Update your MySQL credentials in the <code className="bg-slate-100 px-2 py-0.5 rounded text-brand-700 text-xs font-mono">.env</code> file in the project root, then restart the backend server.
        </p>
        <div className="bg-slate-900 text-emerald-300 rounded-xl p-4 text-xs font-mono space-y-1 mb-6">
          <p>MYSQL_HOST=localhost</p>
          <p>MYSQL_PORT=3306</p>
          <p>MYSQL_USER=<span className="text-amber-300">your_user</span></p>
          <p>MYSQL_PASSWORD=<span className="text-amber-300">your_password</span></p>
          <p>MYSQL_DATABASE=<span className="text-amber-300">hotelkalpview</span></p>
          <p className="pt-2 text-white/40"># Then run:</p>
          <p className="text-sky-300">node server.js</p>
        </div>
        <button onClick={onClose} className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition">Got it, Close</button>
      </div>
    </div>
  );
}

// ─────────────────── ADMIN PANEL (MAIN) ──────────────────────────────────────
export default function AdminRoomManager() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'bookings'>('rooms');
  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editRoom, setEditRoom] = useState<AdminRoom | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [filterTier, setFilterTier] = useState('All');
  const [bookingSearch, setBookingSearch] = useState('');

  const notify = (msg: string, type: 'success' | 'error' = 'success') => setToast({ msg, type });

  // ── Health check
  const checkConnection = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/health`);
      const data = await res.json();
      setConnected(data.status === 'ok');
    } catch {
      setConnected(false);
    }
  }, []);

  // ── Fetch rooms
  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/rooms`);
      const data = await res.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch {
      setRooms([]);
      notify('Could not load rooms. Is the backend server running?', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch bookings
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setBookings([]);
      notify('Could not load bookings.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkConnection();
    if (activeTab === 'rooms') fetchRooms();
    if (activeTab === 'bookings') fetchBookings();
  }, [activeTab]);

  // ── Save (create or update)
  const handleSave = async (room: AdminRoom) => {
    setSaving(true);
    try {
      const url = room.id ? `${API_URL}/api/rooms/${room.id}` : `${API_URL}/api/rooms`;
      const method = room.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(room),
      });
      if (!res.ok) throw new Error('Server error');
      notify(room.id ? 'Room updated successfully!' : 'Room added successfully!');
      setShowForm(false);
      setEditRoom(null);
      fetchRooms();
    } catch {
      notify('Failed to save. Check server connection.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Remove this room? It will be marked inactive in the database.')) return;
    try {
      await fetch(`${API_URL}/api/rooms/${id}`, { method: 'DELETE' });
      notify('Room removed successfully.');
      fetchRooms();
    } catch {
      notify('Failed to remove room.', 'error');
    }
  };

  const filteredRooms = rooms.filter(r => filterTier === 'All' || r.tier === filterTier);
  const tiers = ['All', 'Royal Executive', 'Executive', 'Semi Executive'];

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
      {showConfig && <DBConfigModal onClose={() => setShowConfig(false)} />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-brand-600 text-xs font-mono uppercase tracking-widest mb-1">Admin Dashboard</p>
            <h1 className="text-4xl font-serif font-black text-slate-900">Room Manager</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Add, edit, and manage rooms. All changes sync to MySQL.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* DB status pill */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold cursor-pointer ${connected === true ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : connected === false ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
              onClick={() => { if (connected === false) setShowConfig(true); else checkConnection(); }}
            >
              <span className={`w-2 h-2 rounded-full ${connected === true ? 'bg-emerald-500 animate-pulse' : connected === false ? 'bg-red-500' : 'bg-slate-400'}`}></span>
              {connected === true ? 'MySQL Connected' : connected === false ? 'Not Connected — Click' : 'Checking…'}
            </div>

            <button
              onClick={fetchRooms}
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-brand-600 hover:border-brand-300 transition shadow-sm"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setEditRoom(null); setShowForm(true); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-black text-sm rounded-xl shadow-md uppercase tracking-wide transition"
            >
              <Plus className="w-4 h-4" /> Add Room
            </button>
          </div>
        </div>

        {/* Setup info banner if not connected */}
        {connected === false && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 text-sm mb-1">Backend server not running</p>
              <p className="text-amber-700 text-xs leading-relaxed">
                Fill in your MySQL credentials in the <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">.env</code> file, then run <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">node server.js</code> in another terminal.
                <button onClick={() => setShowConfig(true)} className="ml-2 underline font-bold">View Setup Guide</button>
              </p>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-6 py-4 flex items-center gap-2 text-sm font-bold transition-all border-b-2 ${activeTab === 'rooms' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <Hotel className="w-4 h-4" /> Manage Inventory
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-4 flex items-center gap-2 text-sm font-bold transition-all border-b-2 ${activeTab === 'bookings' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <BookOpen className="w-4 h-4" /> Guest Bookings
          </button>
        </div>

        {activeTab === 'rooms' ? (
          <>
            {/* Tier Filter */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {tiers.map(t => (
                <button
                  key={t}
                  onClick={() => setFilterTier(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition ${filterTier === t ? 'bg-brand-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {t}
                </button>
              ))}
              <span className="ml-auto text-xs text-slate-400 font-bold self-center">
                {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Room Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-32 text-slate-400">
                <Loader className="w-8 h-8 animate-spin mr-3" />
                <span className="font-bold">Loading data from database…</span>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-16 text-center">
                <Hotel className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="font-bold text-slate-700 text-lg mb-2">No rooms found</h3>
                <p className="text-slate-400 text-sm mb-6">Click "Add Room" to create your first room entry.</p>
                <button
                  onClick={() => { setEditRoom(null); setShowForm(true); }}
                  className="px-6 py-3 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition"
                >
                  <Plus className="w-4 h-4 inline mr-2" />Add First Room
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRooms.map(room => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onEdit={() => { setEditRoom(room); setShowForm(true); }}
                    onDelete={() => handleDelete(room.id!)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Bookings List View */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
              <div className="relative flex-1 w-full">
                <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Guest Name, Phone or ID..."
                  value={bookingSearch}
                  onChange={e => setBookingSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
              <div className="text-xs font-bold text-slate-400 px-2 whitespace-nowrap">
                {bookings.length} Total Bookings
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-32 text-slate-400">
                <Loader className="w-8 h-8 animate-spin mr-3" />
                <span className="font-bold">Loading bookings…</span>
              </div>
            ) : bookings.filter(b => 
                b.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) || 
                b.guestPhone.includes(bookingSearch) ||
                b.id.includes(bookingSearch)
              ).length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
                <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="font-bold text-slate-700 text-lg mb-2">No bookings yet</h3>
                <p className="text-slate-400 text-sm">Once guests start booking from the site, you'll see them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {bookings
                  .filter(b => 
                    b.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) || 
                    b.guestPhone.includes(bookingSearch) ||
                    b.id.includes(bookingSearch)
                  )
                  .map(booking => (
                  <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Guest Section */}
                    <div className="md:w-1/3 lg:w-1/4 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-0.5">Guest Details</p>
                          <h4 className="font-bold text-slate-900 leading-tight">{booking.guestName}</h4>
                          <span className="text-[9px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md mt-1 inline-block">#{booking.id}</span>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-brand-500" /> {booking.guestPhone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-brand-500" /> {booking.guestEmail}
                        </div>
                      </div>
                    </div>

                    {/* Stay Section */}
                    <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Room Reserved</p>
                          <p className="text-sm font-bold text-slate-800">{booking.roomName}</p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1"><Hotel className="w-3 h-3"/>{booking.guestsCount} Guests</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check-In</p>
                          <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-500" /> {booking.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check-Out</p>
                          <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-rose-500" /> {booking.checkOut}</p>
                        </div>
                      </div>
                      
                      {booking.specialRequests && (
                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                          <p className="text-[9px] font-black uppercase tracking-widest text-amber-700 mb-1">Special Requests</p>
                          <p className="text-xs text-amber-900 italic line-clamp-1">"{booking.specialRequests}"</p>
                        </div>
                      )}
                    </div>

                    {/* Financial Section */}
                    <div className="md:w-1/4 lg:w-1/5 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Booking Info</p>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">Duration:</span>
                          <span className="font-bold text-slate-700">{booking.daysDuration} Night(s)</span>
                        </div>
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="text-slate-500">Created:</span>
                          <span className="font-bold text-slate-700">{new Date(booking.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="bg-brand-50 rounded-xl p-3 border border-brand-100">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand-700">Total</span>
                          <span className="text-base font-black text-brand-800">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Room Form Modal */}
      {showForm && (
        <RoomForm
          initial={editRoom || EMPTY_ROOM}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditRoom(null); }}
          saving={saving}
        />
      )}
    </div>
  );
}

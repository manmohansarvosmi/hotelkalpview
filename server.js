import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 4000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// ─── MySQL Connection Pool ────────────────────────────────────────────────────
let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host:     process.env.MYSQL_HOST     || 'localhost',
      port:     parseInt(process.env.MYSQL_PORT || '3306'),
      user:     process.env.MYSQL_USER     || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'hotelkalpview',
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

// ─── Auto-create table if not exists ─────────────────────────────────────────
// ─── Auto-create tables if not exists ─────────────────────────────────────────
async function initDB() {
  const db = await getPool();
  
  // Rooms Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS rooms (
      id          VARCHAR(36)  PRIMARY KEY,
      name        VARCHAR(255) NOT NULL,
      description TEXT,
      tier        VARCHAR(100) NOT NULL,
      size        VARCHAR(50),
      view_type   VARCHAR(255),
      max_guests  INT DEFAULT 2,
      bed_type    VARCHAR(100),
      price_ep_single  INT DEFAULT 0,
      price_ep_double  INT DEFAULT 0,
      price_cp_single  INT DEFAULT 0,
      price_cp_double  INT DEFAULT 0,
      price_map_single INT DEFAULT 0,
      price_map_double INT DEFAULT 0,
      image       TEXT,
      amenities   TEXT,
      rating      DECIMAL(3,1) DEFAULT 4.5,
      rating_count INT DEFAULT 0,
      available_count INT DEFAULT 1,
      is_active   TINYINT(1) DEFAULT 1,
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Bookings Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id               VARCHAR(36) PRIMARY KEY,
      room_id          VARCHAR(36) NOT NULL,
      room_name        VARCHAR(255),
      check_in         VARCHAR(20),
      check_out        VARCHAR(20),
      guest_name       VARCHAR(255),
      guest_email      VARCHAR(255),
      guest_phone      VARCHAR(20),
      guests_count     INT,
      total_amount     INT,
      status           VARCHAR(50) DEFAULT 'Confirmed',
      add_ons          TEXT,
      booking_date     VARCHAR(50),
      special_requests TEXT,
      days_duration    INT,
      created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('✅ DB: Tables ready');
}

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const db = await getPool();
    await db.execute('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ─── ROOMS ENDPOINTS ───
app.get('/api/rooms', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.execute('SELECT * FROM rooms ORDER BY created_at DESC');
    const rooms = rows.map(mapRowToRoom);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    const db = await getPool();
    const room = req.body;
    const id = 'room-' + Date.now();
    await db.execute(`
      INSERT INTO rooms (id, name, description, tier, size, view_type, max_guests, bed_type,
        price_ep_single, price_ep_double, price_cp_single, price_cp_double,
        price_map_single, price_map_double, image, amenities, rating, rating_count, available_count)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `, [
      id, room.name, room.description, room.tier, room.size, room.viewType,
      room.maxGuests || 2, room.bedType,
      room.priceEpSingle || 0, room.priceEpDouble || 0,
      room.priceCpSingle || 0, room.priceCpDouble || 0,
      room.priceMapSingle || 0, room.priceMapDouble || 0,
      room.image || '', JSON.stringify(room.amenities || []),
      room.rating || 4.5, room.ratingCount || 0, room.availableCount || 1
    ]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/rooms/:id', async (req, res) => {
  try {
    const db = await getPool();
    const room = req.body;
    await db.execute(`
      UPDATE rooms SET
        name=?, description=?, tier=?, size=?, view_type=?, max_guests=?, bed_type=?,
        price_ep_single=?, price_ep_double=?, price_cp_single=?, price_cp_double=?,
        price_map_single=?, price_map_double=?, image=?, amenities=?,
        rating=?, rating_count=?, available_count=?, is_active=?
      WHERE id=?
    `, [
      room.name, room.description, room.tier, room.size, room.viewType,
      room.maxGuests || 2, room.bedType,
      room.priceEpSingle || 0, room.priceEpDouble || 0,
      room.priceCpSingle || 0, room.priceCpDouble || 0,
      room.priceMapSingle || 0, room.priceMapDouble || 0,
      room.image || '', JSON.stringify(room.amenities || []),
      room.rating || 4.5, room.ratingCount || 0, room.availableCount || 1,
      room.isActive !== false ? 1 : 0,
      req.params.id
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/rooms/:id', async (req, res) => {
  try {
    const db = await getPool();
    await db.execute('UPDATE rooms SET is_active = 0 WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── BOOKINGS ENDPOINTS ───
app.get('/api/bookings', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.execute('SELECT * FROM bookings ORDER BY created_at DESC');
    const bookings = rows.map(mapRowToBooking);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const db = await getPool();
    const b = req.body;
    await db.execute(`
      INSERT INTO bookings (id, room_id, room_name, check_in, check_out, guest_name, 
        guest_email, guest_phone, guests_count, total_amount, status, add_ons, 
        booking_date, special_requests, days_duration)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `, [
      b.id, b.roomId, b.roomName, b.checkIn, b.checkOut, b.guestName,
      b.guestEmail, b.guestPhone, b.guestsCount, b.totalAmount, b.status || 'Confirmed',
      JSON.stringify(b.addOns || []), b.bookingDate, b.specialRequests, b.daysDuration
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function mapRowToRoom(row) {
  let amenities = [];
  try { amenities = JSON.parse(row.amenities || '[]'); } catch {}
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    tier: row.tier,
    size: row.size,
    viewType: row.view_type,
    maxGuests: row.max_guests,
    bedType: row.bed_type,
    priceEpSingle: row.price_ep_single,
    priceEpDouble: row.price_ep_double,
    priceCpSingle: row.price_cp_single,
    priceCpDouble: row.price_cp_double,
    priceMapSingle: row.price_map_single,
    priceMapDouble: row.price_map_double,
    image: row.image,
    amenities,
    rating: parseFloat(row.rating),
    ratingCount: row.rating_count,
    availableCount: row.available_count,
    isActive: row.is_active === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapRowToBooking(row) {
  let addOns = [];
  try { addOns = JSON.parse(row.add_ons || '[]'); } catch {}
  return {
    id: row.id,
    roomId: row.room_id,
    roomName: row.room_name,
    checkIn: row.check_in,
    checkOut: row.check_out,
    guestName: row.guest_name,
    guestEmail: row.guest_email,
    guestPhone: row.guest_phone,
    guestsCount: row.guests_count,
    totalAmount: row.total_amount,
    status: row.status,
    addOns,
    bookingDate: row.booking_date,
    specialRequests: row.special_requests,
    daysDuration: row.days_duration,
    createdAt: row.created_at
  };
}

// ─── Start ────────────────────────────────────────────────────────────────────
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Hotel Kalpview API running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ DB Init Failed:', err.message);
  process.exit(1);
});

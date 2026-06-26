/**
 * Telegram Bot API Service for Hotel Notifications
 */

// Replace these placeholders with your actual Bot Token and Chat ID
// To get a Bot Token, message @BotFather on Telegram.
// To get your Chat ID, message @userinfobot or use a bot like @GetIDsBot.
const TELEGRAM_BOT_TOKEN = '8840786670:AAG5ZGQeLMZAh5cuytxqsTwcxn0f5SxWy_Y';
const TELEGRAM_CHAT_ID = '43247035';

export const sendTelegramMessage = async (message: string) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error:', errorData);
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
};

export const notifyNewBooking = (booking: any) => {
  const message = `
<b>🏨 New Booking Received!</b>
━━━━━━━━━━━━━━━━━━
<b>Booking ID:</b> #${booking.id}
<b>Guest Name:</b> ${booking.guestName}
<b>Phone:</b> ${booking.guestPhone}
<b>Email:</b> ${booking.guestEmail}

<b>Room:</b> ${booking.roomName}
<b>Check-in:</b> ${booking.checkIn}
<b>Check-out:</b> ${booking.checkOut}
<b>Guests:</b> ${booking.guestsCount}
<b>Duration:</b> ${booking.daysDuration} Night(s)

<b>Total Amount:</b> ₹${booking.totalAmount.toLocaleString('en-IN')}
<b>Add-ons:</b> ${booking.addOns.length > 0 ? '\n - ' + booking.addOns.join('\n - ') : 'None'}
<b>Special Requests:</b> ${booking.specialRequests || 'None'}

<b>Date:</b> ${new Date(booking.bookingDate).toLocaleString()}
━━━━━━━━━━━━━━━━━━
`;
  return sendTelegramMessage(message);
};

export const notifyAvailabilityCheck = (search: { checkIn: string; checkOut: string; guests: number; tier: string }) => {
  const message = `
<b>🔍 Availability Search</b>
━━━━━━━━━━━━━━━━━━
<b>Check-in:</b> ${search.checkIn}
<b>Check-out:</b> ${search.checkOut}
<b>Guests:</b> ${search.guests}
<b>Category:</b> ${search.tier}

<i>Someone is looking at rooms right now!</i>
━━━━━━━━━━━━━━━━━━
`;
  return sendTelegramMessage(message);
};

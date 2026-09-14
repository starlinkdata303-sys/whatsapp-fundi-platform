const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fundiId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundi', required: true },
  advertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advert' },
  serviceType: { type: String, required: true }, // plumbing, electrical, welding, masonry, mechanics, phone repairs, painting
  description: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    city: String
  },
  customerPhone: { type: String, required: true }, // Customer's WhatsApp number
  customerWhatsapp: { type: String, required: true }, // Format: +country_code + number (e.g., +27102795669)
  fundiPhone: { type: String }, // Fundi's WhatsApp number
  fundiWhatsapp: { type: String }, // Fundi's WhatsApp (e.g., +27102795669)
  scheduledDate: { type: Date, required: true },
  estimatedDuration: Number, // in minutes
  estimatedPrice: Number,
  finalPrice: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  paymentStatus: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' },
  paymentMethod: String, // 'mobile_money', 'card', 'cash', 'bank_transfer'
  images: [String], // Before and after photos
  notes: String,
  whatsappMessageId: String, // Link to WhatsApp conversation
  whatsappChatLink: String, // Direct WhatsApp chat link
  reminderSent: { type: Boolean, default: false },
  reminderSentDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completedAt: Date
});

// Index for faster WhatsApp queries
bookingSchema.index({ customerWhatsapp: 1 });
bookingSchema.index({ fundiWhatsapp: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ scheduledDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);

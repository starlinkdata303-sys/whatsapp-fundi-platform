const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
  fundiId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundi', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  serviceType: { type: String, required: true }, // plumbing, electrical, welding, etc.
  images: [String], // Portfolio images
  videoUrl: String, // WhatsApp-friendly video
  priceRange: {
    min: Number,
    max: Number
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    city: String,
    country: String
  },
  tags: [String], // For better search
  whatsappShareLink: String, // Direct WhatsApp share link
  whatsappCatalogId: String, // WhatsApp Catalog for products/services
  status: { type: String, enum: ['active', 'paused', 'archived'], default: 'active' },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  whatsappShares: { type: Number, default: 0 },
  inquiries: { type: Number, default: 0 },
  isPromoted: { type: Boolean, default: false },
  promotionEndDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => new Date(+new Date() + 30*24*60*60*1000) } // 30 days
});

module.exports = mongoose.model('Advert', advertSchema);

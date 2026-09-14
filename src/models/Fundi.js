const mongoose = require('mongoose');

const fundiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  businessDescription: String,
  specializations: [String], // ['plumbing', 'electrical', 'welding', 'masonry', 'mechanics', 'phone repairs', 'painting']
  certifications: [String],
  yearsOfExperience: Number,
  idNumber: { type: String, required: true, unique: true },
  idPhotoUrl: String,
  businessLicense: String,
  businessLicenseUrl: String,
  bankAccount: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    swiftCode: String
  },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  verificationDate: Date,
  verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  profileCompletion: { type: Number, default: 0 },
  serviceRadius: Number, // in km
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    city: String,
    country: String
  },
  availability: {
    monday: { start: String, end: String, available: Boolean },
    tuesday: { start: String, end: String, available: Boolean },
    wednesday: { start: String, end: String, available: Boolean },
    thursday: { start: String, end: String, available: Boolean },
    friday: { start: String, end: String, available: Boolean },
    saturday: { start: String, end: String, available: Boolean },
    sunday: { start: String, end: String, available: Boolean }
  },
  completedJobs: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  whatsappBusinessPhoneId: String,
  whatsappStatus: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'inactive' },
  whatsappQRCode: String, // For WhatsApp Business verification
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fundi', fundiSchema);

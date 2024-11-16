const mongoose = require('mongoose');

const customerRequestSchema = new mongoose.Schema({
    customerName: { type: String, required: true }, // Name of the customer
    email: { type: String, required: true }, // Added field for customer's email
    phone: { type: String, required: true }, // Customer's phone number
    address: {
        flatNumber: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
    },
    preferredDriverGender: { 
        type: String, 
        enum: ['Male', 'Female', 'Any'], 
        required: true 
    }, // Preferred driver gender
    pickupLocation: { type: String, required: true }, // Customer's pickup location
    destination: { type: String }, // Optional destination field
    driverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Driver' 
    }, // Reference to the assigned driver
    driverDetails: { 
        // Embedded driver details to avoid frequent joins
        name: { type: String },
        phone: { type: String },
        chargesPerNight: { type: Number },
    },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'completed', 'cancelled'], 
        default: 'pending' 
    }, // Status of the request
    requestTime: { type: Date, default: Date.now }, // Time when the request was made
    completionTime: { type: Date }, // Time when the request was completed
    notes: { type: String }, // Additional notes (optional)
});

module.exports = mongoose.model('CustomerRequest', customerRequestSchema);
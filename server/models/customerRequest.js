const mongoose = require('mongoose');

const customerRequestSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
        flatNumber: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
    },
    preferredDriverGender: { type: String, enum: ['Male', 'Female', 'Any'], required: true },
    pickupLocation: { type: String, required: true },
    destination: { type: String },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    status: { type: String, default: 'pending' }, // options: 'pending', 'accepted', 'completed'
    requestTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CustomerRequest', customerRequestSchema);
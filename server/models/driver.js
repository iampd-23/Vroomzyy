const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: Number, required: true },
    photo: { type: String, required: true }, // URL or path to driver photo
    licensePhoto: { type: String, required: true }, // URL or path to license photo
    chargesPerNight: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    age: { type: Number, required: true },
    availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Driver', driverSchema);
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Driver = require('../models/driver');
const CustomerRequest = require('../models/customerRequest'); // Import the CustomerRequest model

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Register a new driver
router.post('/register', upload.fields([{ name: 'photo' }, { name: 'licensePhoto' }]), async (req, res) => {
    const { name, phone, experience, chargesPerNight, gender, age } = req.body;
    const photo = req.files['photo'] ? req.files['photo'][0].path : null;
    const licensePhoto = req.files['licensePhoto'] ? req.files['licensePhoto'][0].path : null;

    try {
        const driver = await Driver.create({
            name,
            phone,
            experience: Number(experience),
            photo,
            licensePhoto,
            chargesPerNight: Number(chargesPerNight),
            gender,
            age: Number(age),
            availability: true,
        });
        res.status(201).json({ message: 'Driver registered successfully', driver });
    } catch (error) {
        console.error('Error registering driver:', error);
        res.status(500).json({ error: 'Failed to register driver' });
    }
});

// Customer request for an emergency driver
router.post('/request', async (req, res) => {
    const { customerName, phone, address, preferredDriverGender, pickupLocation, destination } = req.body;

    try {
        const request = await CustomerRequest.create({
            customerName,
            phone,
            address,
            preferredDriverGender,
            pickupLocation,
            destination,
        });
        res.status(201).json({ message: 'Request created successfully', request });
    } catch (error) {
        console.error('Error creating driver request:', error);
        res.status(500).json({ error: 'Failed to create driver request' });
    }
});

module.exports = router;
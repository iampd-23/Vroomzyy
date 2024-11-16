const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const Driver = require("../models/driver");
const CustomerRequest = require("../models/customerRequest");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ----------------- DRIVER REGISTRATION ROUTE -----------------
router.post("/register", upload.fields([{ name: "photo" }, { name: "licensePhoto" }]), async (req, res) => {
  console.log("Driver Registration Request Received:", req.body);

  const { name, phone, experience, chargesPerNight, gender, age } = req.body;

  // Check if required fields are provided
  if (!name || !phone || !experience || !chargesPerNight || !gender || !age) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Get file paths for uploaded files
  const photo = req.files["photo"] ? req.files["photo"][0].path : null;
  const licensePhoto = req.files["licensePhoto"] ? req.files["licensePhoto"][0].path : null;

  try {
    // Create a new driver in the database
    const driver = await Driver.create({
      name,
      phone,
      experience: Number(experience),
      chargesPerNight: Number(chargesPerNight),
      gender,
      age: Number(age),
      photo,
      licensePhoto,
      availability: true, // Default to available
    });

    console.log("Driver Registered Successfully:", driver);
    res.status(201).json({ message: "Driver registered successfully", driver });
  } catch (error) {
    console.error("Error registering driver:", error);
    res.status(500).json({ error: "Failed to register driver" });
  }
});

// ----------------- EMERGENCY DRIVER REQUEST ROUTE -----------------
router.post("/request", async (req, res) => {
  console.log("Request received:", req.body);

  const {
    customerName,
    email,
    phone,
    address,
    preferredDriverGender,
    pickupLocation,
    destination,
  } = req.body;

  try {
    if (
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !pickupLocation ||
      !preferredDriverGender
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const drivers = await Driver.find({
      gender:
        preferredDriverGender === "Any"
          ? { $in: ["Male", "Female"] }
          : preferredDriverGender,
      // availability: true,
    });

    console.log("Available Drivers:", drivers);

    if (drivers.length === 0) {
      return res
        .status(404)
        .json({ error: "No available drivers match the preferred gender" });
    }

    const assignedDriver = drivers[Math.floor(Math.random() * drivers.length)];
    assignedDriver.availability = false;
    await assignedDriver.save();

    const request = await CustomerRequest.create({
      customerName,
      email,
      phone,
      address,
      preferredDriverGender,
      pickupLocation,
      destination,
      driverId: assignedDriver._id,
      status: "accepted",
    });

    console.log("Customer Request Created:", request);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Emergency Driver Assigned",
      text: `Hello ${customerName},\n\nYour emergency driver has been assigned. Here are the details:\n\nDriver Name: ${assignedDriver.name}\nPhone: ${assignedDriver.phone}\nExperience: ${assignedDriver.experience} years\nCharges Per Night: ${assignedDriver.chargesPerNight}\n\nThank you for using Vroomzyy.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res
          .status(500)
          .json({ error: "Driver assigned, but failed to send email." });
      }
      console.log("Email sent successfully:", info.response);
      res
        .status(201)
        .json({ message: "Driver assigned and email sent successfully.", request });
    });
  } catch (error) {
    console.error("Error processing driver request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
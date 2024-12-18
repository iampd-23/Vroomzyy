const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    seatCount: {
      type: Number,
      required: true,
    },
    doorsCount: {
      type: Number,
      required: true,
    },
    fuelCount: {
      type: Number,
      required: true,
    },
    luggageCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default: [],
    },
    listingPhotoPaths: [{ type: String }],

    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    highlight: {
      type: String,
      required: true
    },
    
    // Adding new fields
    ownerName: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    vehicleImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;

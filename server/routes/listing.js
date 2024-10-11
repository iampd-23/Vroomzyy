const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/listing");
const User = require("../models/user");

/* Multer Configuration for File Uploads */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "listingPhotos") {
      cb(null, "public/listingPhotos/"); // Store listing photos in 'listingPhotos' folder
    } else if (file.fieldname === "vehicleImage") {
      cb(null, "public/ownerRCPhotos/"); // Store vehicle RC in 'ownerRCPhotos' folder
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique file name to avoid conflicts
  },
});

/* Initialize multer with the combined storage configuration */
const upload = multer({ storage: storage });

/* CREATE LISTING */
router.post(
  "/create",
  upload.fields([
    { name: "listingPhotos", maxCount: 10 }, // Up to 10 listing photos
    { name: "vehicleImage", maxCount: 1 }, // Single vehicle RC image
  ]),
  async (req, res) => {
    try {
      const {
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        seatCount,
        doorsCount,
        fuelCount,
        luggageCount,
        amenities,
        ownerName,
        vehicleNumber,
        price,
      } = req.body;

      // Multer saves files in req.files, so we need to access the uploaded files
      const listingPhotos = req.files['listingPhotos'];
      const vehicleImage = req.files['vehicleImage'] && req.files['vehicleImage'][0]; // Get the first vehicle image

      // If no files are uploaded, return an error
      if (!listingPhotos || !vehicleImage) {
        return res.status(400).send("Listing photos and vehicle image are required.");
      }

      // Extract the file paths for the listing photos and vehicle image
      const listingPhotoPaths = listingPhotos.map((file) => file.path);
      const vehicleImagePath = vehicleImage.path;

      // Create the new listing object
      const newListing = new Listing({
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        seatCount,
        doorsCount,
        fuelCount,
        luggageCount,
        amenities,
        listingPhotoPaths, // Save listing photo paths
        ownerName, // Save owner's name
        vehicleNumber, // Save vehicle number
        vehicleImage: vehicleImagePath, // Save vehicle RC image path
        price,
      });

      // Save the listing to the database
      await newListing.save();

      // Respond with the newly created listing
      res.status(200).json(newListing);
    } catch (err) {
      res.status(500).json({ message: "Failed to create listing", error: err.message });
      console.log(err);
    }
  }
);

/* GET LISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [{ category: { $regex: search, $options: "i" } }, { title: { $regex: search, $options: "i" } }],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.log(err);
  }
});

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (err) {
    res.status(404).json({ message: "Listing cannot be found!", error: err.message });
  }
});

module.exports = router;
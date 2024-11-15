const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/user")
const Listing = require("../models/listing")

/* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params
    const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
    res.status(202).json(trips)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find trips!", error: err.message })
  }
})

router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    // Check if `user` or `listing` is null
    if (!user || !listing) {
      return res.status(404).json({ message: "User or listing not found" });
    }

    // Find the listing in the user's wishlist
    const favoriteListing = user.wishList.find(
      (item) => item && item._id && item._id.toString() === listingId
    );

    if (favoriteListing) {
      // Remove the listing from the wishlist if it exists
      user.wishList = user.wishList.filter(
        (item) => item && item._id && item._id.toString() !== listingId
      );
      await user.save();
      res
        .status(200)
        .json({ message: "Listing is removed from wish list", wishList: user.wishList });
    } else {
      // Add the listing to the wishlist
      user.wishList.push(listing);
      await user.save();
      res
        .status(200)
        .json({ message: "Listing is added to wish list", wishList: user.wishList });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// /* GET PROPERTY LIST */
// router.get("/:userId/properties", async (req, res) => {
//   try {
//     const { userId } = req.params
//     const properties = await Listing.find({ creator: userId }).populate("creator")
//     res.status(202).json(properties)
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({ message: "Can not find properties!", error: err.message })
//   }
// })

// /* GET RESERVATION LIST */
// router.get("/:userId/reservations", async (req, res) => {
//   try {
//     const { userId } = req.params
//     const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId")
//     res.status(202).json(reservations)
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({ message: "Can not find reservations!", error: err.message })
//   }
// })


module.exports = router
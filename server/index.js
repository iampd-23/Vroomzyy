const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const router = express.Router(); // Initialize the router

const app = express();

const authRoute = require('../server/routes/auth.js');
const listingRoute = require('../server/routes/listing.js');
const validateRoute = require('../server/routes/validate.js'); 
const bookingRoute = require('../server/routes/booking.js');
const userRoute = require('../server/routes/user.js')
const emergencyDriverRoutes = require('./routes/emergencyDriver');

// Middleware Setup
app.use(cors()); // Invoke cors as a function
app.use(express.json()); // Invoke express.json() as a function
app.use(express.static('public')); // Serve static files from public directory

// Route use
app.use("/auth", authRoute);
app.use("/vehicles", listingRoute);
app.use("/api", validateRoute);
app.use("/bookings",bookingRoute);
app.use("/users",userRoute);


app.use('/api/emergencyDriver', emergencyDriverRoutes);

// Mongoose Setup
const port = 2305;
mongoose.connect(process.env.MONGO_URL, {
  dbName: "Vroom-Zyy",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(port, () => {
    console.log("Server Port is connected on " + port);
  });
})
.catch((err) => {
  console.log(err + " did not connect!");
});



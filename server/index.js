const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const authRoutes = require('../server/routes/auth.js')
const listingRoutes = require('../server/routes/listing.js')


// Middleware Setup
app.use(cors()); // Invoke cors as a function
app.use(express.json()); // Invoke express.json() as a function
app.use(express.static('public')); // Serve static files from public directory

// Route use
app.use("/auth",authRoutes)
app.use("/vehicles",listingRoutes)


// Mongoose Setup
const port = 2305;
mongoose.connect(process.env.MONGO_URL, {
  dbName:"Vroom-Zyy",
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

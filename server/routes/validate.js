const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

let vehicleNumbersDataset = new Set();

fs.createReadStream(
  path.join(__dirname, "../AI ML/vehicle_numbers_dataset.csv")
)
  .pipe(csv())
  .on("data", (row) => {
    const vehicleNumber = Object.values(row)[0].trim().toUpperCase();
    vehicleNumbersDataset.add(vehicleNumber);
  })
  .on("end", () => {
    console.log("Vehicle numbers dataset loaded successfully.");
  });

const handleExtractedNumber = (text) => {
  const vehicleNumberPattern = /[A-Z]{2}[\s\-]?\d{2}[\s\-]?[A-Z0-9]{1,2}[\s\-]?\d{4}/;
  let extractedNumber = text.match(vehicleNumberPattern);

  if (extractedNumber) {
    extractedNumber = extractedNumber[0].toUpperCase()
      .replace(/\s/g, "")
      .replace("O", "0");

    return extractedNumber;
  }
  return null;
};

router.post("/upload-rc", upload.single("vehicleImage"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const { data: { text } } = await Tesseract.recognize(imagePath, "eng");
    console.log("Extracted Text:", text);

    const extractedNumber = handleExtractedNumber(text);
    // console.log("Extracted Number:", extractedNumber);
    // console.log("Exists in Dataset:", vehicleNumbersDataset.has(extractedNumber));

    fs.unlinkSync(imagePath);

    if (extractedNumber && vehicleNumbersDataset.has(extractedNumber)) {
      return res.json({
        status: "green",
        message: `Good to Go: ${extractedNumber} is Valid`,
      });
    } else if (extractedNumber) {
      return res.json({
        status: "red",
        message: `${extractedNumber} is Invalid`,
      });
    } else {
      return res.json({
        status: "red",
        message: "No valid vehicle number detected",
      });
    }
  } catch (error) {
    console.error("Error during OCR or validation:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
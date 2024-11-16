import React, { useState } from "react";
import axios from "axios";
import "../styles/EmergencyDriverRequest.scss";

function EmergencyDriverRequest() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: {
      flatNumber: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
    },
    preferredDriverGender: "Any",
    pickupLocation: "",
    destination: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state for API requests

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["flatNumber", "area", "city", "state", "pincode"].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setSuccess(false);
    setError(false);

    try {
      console.log("Submitting form data:", formData); // Debug log for submitted data
      const response = await axios.post(
        "http://localhost:2305/api/emergencyDriver/request",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("API Response:", response.data); // Log the response
      setSuccess(true);
      setError(false);
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        address: {
          flatNumber: "",
          area: "",
          city: "",
          state: "",
          pincode: "",
        },
        preferredDriverGender: "Any",
        pickupLocation: "",
        destination: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.response || error); // Detailed error logging
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="emergency-driver-request">
      <h1>Request Emergency Driver</h1>

      {/* Success and Error Messages */}
      {success && (
        <p className="success-message">
          Driver requested successfully! You will receive an email shortly.
        </p>
      )}
      {error && (
        <p className="error-message">
          Failed to request a driver. Please check your input and try again.
        </p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="emergency-driver-request_form">
        <input
          name="customerName"
          placeholder="Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          name="flatNumber"
          placeholder="Flat Number"
          value={formData.address.flatNumber}
          onChange={handleChange}
          required
        />
        <input
          name="area"
          placeholder="Area"
          value={formData.address.area}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          placeholder="State"
          value={formData.address.state}
          onChange={handleChange}
          required
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.address.pincode}
          onChange={handleChange}
          required
        />
        <select
          name="preferredDriverGender"
          value={formData.preferredDriverGender}
          onChange={handleChange}
        >
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
        />
        <input
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Requesting Driver..." : "Request Driver"}
        </button>
      </form>
    </div>
  );
}

export default EmergencyDriverRequest;
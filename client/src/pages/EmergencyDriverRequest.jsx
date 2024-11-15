import React, { useState } from "react";
import axios from "axios";
import "../styles/EmergencyDriverRequest.scss";

function EmergencyDriverRequest() {
  const [formData, setFormData] = useState({
    customerName: "",
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

  const [success, setSuccess] = useState(false); // New state for success message
  const [error, setError] = useState(false); // New state for error message

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
    try {
      await axios.post("http://localhost:2305/api/emergencyDriver/request", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess(true); // Show success message
      setError(false); // Hide error message
      setFormData({
        customerName: "",
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
      }); // Clear form fields
    } catch (error) {
      setError(true); // Show error message if the request fails
      setSuccess(false); // Hide success message
    }
  };

  return (
    <div className="emergency-driver-request">
      <h1>Request Emergency Driver</h1>

      {/* Success and error messages */}
      {success && <p className="success-message">Driver requested successfully! Soon you will get your driver details</p>}
      {error && <p className="error-message">Failed to request driver. Please try again.</p>}

      <form onSubmit={handleSubmit} className="emergency-driver-request_form">
        <div className="emergency-driver-request_field">
          <label htmlFor="customerName">Name</label>
          <input name="customerName" id="customerName" placeholder="Name" onChange={handleChange} required />
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="phone">Phone</label>
          <input name="phone" id="phone" placeholder="Phone" onChange={handleChange} required />
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="flatNumber">Flat Number</label>
          <input name="flatNumber" id="flatNumber" placeholder="Flat Number" onChange={handleChange} required />
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="area">Area</label>
          <input name="area" id="area" placeholder="Area" onChange={handleChange} required />
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="city">City</label>
          <input name="city" id="city" placeholder="City" onChange={handleChange} required />
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="state">State</label>
          <input name="state" id="state" placeholder="State" onChange={handleChange} required />
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="pincode">Pincode</label>
          <input name="pincode" id="pincode" placeholder="Pincode" onChange={handleChange} required />
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="preferredDriverGender">Preferred Driver Gender</label>
          <select name="preferredDriverGender" id="preferredDriverGender" onChange={handleChange}>
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="pickupLocation">Pickup Location</label>
          <input name="pickupLocation" id="pickupLocation" placeholder="Pickup Location" onChange={handleChange} required />
        </div>
        <div className="emergency-driver-request_field">
          <label htmlFor="destination">Destination</label>
          <input name="destination" id="destination" placeholder="Destination" onChange={handleChange} />
        </div>
        <button type="submit" className="emergency-driver-request_submit">Request Driver</button>
      </form>
    </div>
  );
}

export default EmergencyDriverRequest;
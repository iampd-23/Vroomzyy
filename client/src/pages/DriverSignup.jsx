import React, { useState } from "react";
import axios from "axios";
import "../styles/DriverSignup.scss";

function DriverSignup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    experience: "",
    chargesPerNight: "",
    gender: "Male",
    age: "",
    photo: "",
    licensePhoto: "",
  });
  const [success, setSuccess] = useState(false); // New state for success message
  const [error, setError] = useState(false); // New state for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataToSend.append(key, formData[key])
    );

    try {
      await axios.post("http://localhost:2305/api/emergencyDriver/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true); // Show success message
      setError(false); // Hide error message
      setFormData({
        name: "",
        phone: "",
        experience: "",
        chargesPerNight: "",
        gender: "Male",
        age: "",
        photo: "",
        licensePhoto: "",
      }); // Clear form fields
    } catch (error) {
      setError(true); // Show error message if the request fails
      setSuccess(false); // Hide success message
    }
  };

  return (
    <div className="driver-signup">
      <h1>Register as Driver</h1>

      {/* Success and error messages */}
      {success && <p className="success-message">Driver registered successfully! Wait for your first booking</p>}
      {error && <p className="error-message">Failed to register driver. Please try again.</p>}

      <form onSubmit={handleSubmit} className="driver-signup_form">
        <div className="driver-signup_field">
          <label htmlFor="name">Name</label>
          <input name="name" id="name" placeholder="Name" onChange={handleChange} required />
        </div>
        <div className="driver-signup_field">
          <label htmlFor="phone">Phone</label>
          <input name="phone" id="phone" placeholder="Phone" onChange={handleChange} required />
        </div>
        <div className="driver-signup_field">
          <label htmlFor="experience">Experience (years)</label>
          <input name="experience" id="experience" type="number" placeholder="Experience (years)" onChange={handleChange} required />
        </div>
        <div className="driver-signup_field">
          <label htmlFor="chargesPerNight">Charges Per Night</label>
          <input name="chargesPerNight" id="chargesPerNight" type="number" placeholder="Charges Per Night" onChange={handleChange} required />
        </div>
        <div className="driver-signup_field">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="driver-signup_field">
          <label htmlFor="age">Age</label>
          <input name="age" id="age" type="number" placeholder="Age" onChange={handleChange} required />
        </div>
        <div className="driver-signup_field">
          <label htmlFor="photo">Photo</label>
          <input name="photo" id="photo" type="file" onChange={handleFileChange} required />
        </div>
        <div className="driver-signup_field">
          <label htmlFor="licensePhoto">License Photo</label>
          <input name="licensePhoto" id="licensePhoto" type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="driver-signup_submit">Register as Driver</button>
      </form>
    </div>
  );
}

export default DriverSignup;
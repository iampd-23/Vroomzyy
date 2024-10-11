/* global google */ // This tells ESLint that `google` is a global variable
import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState, useEffect } from "react"; // Import useEffect from React
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };
  // console.log(formLocation)

  /* BASIC COUNTS */
  const [seatCount, setSeatCount] = useState(1);
  const [doorsCount, setDoorsCount] = useState(2);
  const [fuelCount, setFuelCount] = useState(25);
  const [luggageCount, setLuggageCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);
  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const reorderedPhotos = Array.from(photos);
    const [removed] = reorderedPhotos.splice(result.source.index, 1);
    reorderedPhotos.splice(result.destination.index, 0, removed);

    setPhotos(reorderedPhotos);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    // title: "",
    // description: "",
    // highlight: "",
    // highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };
  // console.log(formDescription)
  // console.log(amenities)

  const creatorId = useSelector((state) => state.user?._id);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    // if (!creatorId) {
    //   // Handle the case where creatorId is not available
    //   console.log("User is not authenticated or creatorId is missing.");
    //   return;
    // }

    try {
      /* Create a new FormData object to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("seatCount", seatCount);
      listingForm.append("doorsCount", doorsCount);
      listingForm.append("fuelCount", fuelCount);
      listingForm.append("luggageCount", luggageCount);
      listingForm.append("amenities", amenities);
      // listingForm.append("title", formDescription.title);
      // listingForm.append("description", formDescription.description);
      // listingForm.append("highlight", formDescription.highlight);
      // listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("ownerName", formOwnerDetails.ownerName);
      listingForm.append("vehicleNumber", formOwnerDetails.vehicleNumber);
      listingForm.append("price", formDescription.price);

      /* Append each selected photo to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });
      if (formOwnerDetails.vehicleImage) {
        listingForm.append("vehicleImage", formOwnerDetails.vehicleImage);
      }

      /* Send a POST request to server */
      const response = await fetch("http://localhost:2305/vehicles/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.log("Failed to create listing. Status:", response.status);
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  const [formOwnerDetails, setFormOwnerDetails] = useState({
    ownerName: "",
    vehicleNumber: "",
    vehicleImage: null, // For file upload
  });
  const handleChangeOwnerDetails = (e) => {
    const { name, value, type, files } = e.target;
    setFormOwnerDetails({
      ...formOwnerDetails,
      [name]: type === "file" ? files[0] : value,
    });
  };
  // console.log(formOwnerDetails);


  useEffect(() => {
    const initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.5937, lng: 78.9629 }, // Default India coordinates
        zoom: 5, // Default zoom level
      });
  
      const geocoder = new google.maps.Geocoder();
      const marker = new google.maps.Marker({
        map: map,
        draggable: true,
      });
  
      google.maps.event.addListener(map, "click", function (event) {
        marker.setPosition(event.latLng);
        geocodeLatLng(geocoder, map, event.latLng);
      });
  
      // Save map instance and marker for later use
      window.map = map;
      window.marker = marker;
    };
  
    const geocodeLatLng = (geocoder, map, latLng) => {
      geocoder.geocode({ location: latLng }, function (results, status) {
        if (status === "OK") {
          if (results[0]) {
            setFormLocation((prev) => ({
              ...prev,
              streetAddress: results[0].formatted_address,
            }));
          } else {
            alert("No results found");
          }
        } else {
          alert("Geocoder failed due to: " + status);
        }
      });
    };
  
    if (window.google) {
      initMap(); // Initialize map
    }
  }, []);
  
  // Function to geocode an address and update the map
  const geocodeAddress = (geocoder, address) => {
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        window.map.setCenter(location); // Recenter the map
        window.marker.setPosition(location); // Move marker to new location
      } else {
        console.error("Geocode failed: " + status);
      }
    });
  };
  
  // Update `handleChangeLocation` to geocode the address when inputs change
  const handleChangeLocationn = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  
    const fullAddress = `${formLocation.streetAddress}, ${formLocation.city}, ${formLocation.province}, ${formLocation.country}`;
    
    // Geocode the full address when any field changes
    const geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, fullAddress);
  };

  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Publish Your Vehicle</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your Vehicle</h2>
            <hr />
            <h3>Which of these categories best describes your vehicle?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() =>
                    setCategory(category === item.label ? null : item.label)
                  }
                >
                  <div className="category-icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What rental option best suits your needs?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            {/* <h3>Where is your vehicle located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Society, etc.</p>
                <input
                  type="text"
                  placeholder="Apartment, Society, etc."
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>

              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>State</p>
                <input
                  type="text"
                  placeholder="State"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>

              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div> */}
            <h3>Where is your vehicle located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Society, etc.</p>
                <input
                  type="text"
                  placeholder="Apartment, Society, etc."
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>

              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocationn}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>State</p>
                <input
                  type="text"
                  placeholder="State"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocationn}
                  required
                />
              </div>

              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            {/* <!-- New map container --> */}
            <div id="map" style={{ height: "400px", width: "100%" }}></div>

            <h3>Share some basics about your vehicle</h3>
            <div className="basics">
              <div className="basic">
                <p>Seats</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      seatCount > 1 && setSeatCount(seatCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{seatCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setSeatCount(seatCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Doors</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      doorsCount > 1 && setDoorsCount(doorsCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{doorsCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setDoorsCount(doorsCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Fuel Capacity (liters)</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      fuelCount > 1 && setFuelCount(fuelCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{fuelCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setFuelCount(fuelCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Luggage Capacity (bags)</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      luggageCount > 1 && setLuggageCount(luggageCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{luggageCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setLuggageCount(luggageCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Highlight Your Vehicle's Unique Features</h2>
            <hr />
            <h3>Showcase the Best of What Your Vehicle Offers</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your vehicle</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => (
                          <Draggable
                            key={index.toString()}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="vehicle"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(index)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>Pricing Overview</h3>
            <div className="description">
              {/* <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />

              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />

              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />

              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              /> */}

              <p>Now, Set your price</p>
              <span>₹</span>
              <input
                type="number"
                placeholder="1000"
                name="price"
                className="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                required
              />
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 3: Enter Your Details</h2>
            <div className="description">
              <p>Full Name</p>
              <input
                type="text"
                placeholder="Name"
                name="ownerName"
                value={formOwnerDetails.ownerName}
                onChange={handleChangeOwnerDetails}
                required
              />
              <p>Enter Your Vehicle Number</p>
              <input
                type="text"
                placeholder="Eg. MH01BC1234"
                name="vehicleNumber"
                value={formOwnerDetails.vehicleNumber}
                onChange={handleChangeOwnerDetails}
                required
              />
              <p>Upload Your Vehicle RC (Registration Certificate)</p>
              <input
                type="file"
                accept="image/*"
                name="vehicleImage"
                onChange={handleChangeOwnerDetails}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit_btn">
            PUBLISH YOU VEHICLE
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { enUS } from 'date-fns/locale'; 
import Loader from "../components/loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:2305/vehicles/${listingId}`, {
        method: "GET",
      });

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  console.log(listing);

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)); // Ensure the calculation is correct

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toLocaleDateString(), 
        endDate: dateRange[0].endDate.toLocaleDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch("http://localhost:2305/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              key={item}
              src={`http://localhost:2305/${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div>

        <h2>
          {listing.type} from {listing.city}, {listing.province}
        </h2>
        <p>
        {listing?.seatCount ?? "N/A"} person(s) -{" "}
        {listing?.doorsCount ?? "N/A"} door(s) - {listing?.fuelCount ?? "N/A"}{" "}
        Lts fuel - {listing?.luggageCount ?? "N/A"} luggage(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:2305/${listing.creator.profileImagePath.replace("public", "")}`}
            alt="Host profile"
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Detailed Description of the vehicle</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>Key Highlights of the vehicle</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} locale={enUS}  />
              {dayCount > 1 ? (
                <h2>
                  ₹{listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ₹{listing.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ₹{listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toLocaleDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toLocaleDateString()}</p>

              <button className="button" type="submit" onClick={handleSubmit}>
                CONFIRM BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;

import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setVehicleList } from "../redux/state";
import Loader from "../components/loader";

const VehicleList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const vehicleList = user?.vehicleList;
  console.log(user)

  const dispatch = useDispatch()
  const getVehicleList = async () => {
    try {
      const response = await fetch(`http://localhost:2305/users/${user._id}/vehicles`, {
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      dispatch(setVehicleList(data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all vehicles failed", err.message)
    }
  }

  useEffect(() => {
    getVehicleList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {vehicleList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            // country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
            //   country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>

    </>
  );
};

export default VehicleList;
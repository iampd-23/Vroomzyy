import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.length > 0 ? (
          wishList.map(
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
                key={_id} // Unique key for each item
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                // country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )
        ) : (
          <p className="empty-message">Your wishlist is empty.</p> // Message for empty wishlist
        )}
      </div>
    </>
  );
};

export default WishList;
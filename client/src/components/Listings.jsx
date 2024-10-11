import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
// import ListingCard from "./ListingCard";
// import Loader from "./Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { setListings } from "../redux/state";

const Listings = () => {
  return (
    <div className="category-list">
      {categories?.map((category, index) => (
        <div className={`category `} key={index}>
          <div className="category_icon">{category.icon}</div>
          <p>{category.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;

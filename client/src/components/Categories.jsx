import React from "react";
import { categories } from "../data";
import "../styles/Categories.scss"
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p>
        Explore our extensive selection of vehicles tailored to every traveler’s
        needs. Whether you're cruising through the city or embarking on an
        adventurous road trip, enjoy the comfort and reliability of our
        top-notch vehicles. Start your journey with us and create unforgettable
        memories on the road.
      </p>
      <div className="categories_list">
        {categories?.slice(1, 6).map((category, index) => (
          <Link to="">
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

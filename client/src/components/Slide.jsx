import React from "react";
import "../styles/Slide.scss";

const Slide = () => {
  return (
    <div className="slide">
      <video autoPlay muted loop className="backgroundVideo">
      <source src="/assets/Homepage_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <h1>
          Wherever You Roam, Let Every Ride Become a Memory. <br />
          Your Journey Begins Here.
        </h1>
      </div>
    </div>
  );
};

export default Slide;

// import "../styles/Slide.scss"

// const Slide = () => {
//   return (
//     <div className="slide">
//       <h1>
//         Welcome Home! Anywhere you roam Stay in the moment. Make your
//         memories
//       </h1>
//     </div>
//   );
// };

// export default Slide;

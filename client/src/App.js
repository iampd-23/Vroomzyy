import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import VehicleList from "./pages/VehicleList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
// import Chatbot from "./components/Chatbot";

import DriverSignup from "./pages/DriverSignup";
import EmergencyDriverRequest from "./pages/EmergencyDriverRequest";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Chatbot /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/vehicles/:listingId" element={<ListingDetails />} />
          <Route
            path="/vehicles/category/:category"
            element={<CategoryPage />}
          />
          <Route path="/vehicles/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/vehicles" element={<VehicleList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />

          <Route path="/driver-signup" element={<DriverSignup />} />
          <Route path="/request-driver" element={<EmergencyDriverRequest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

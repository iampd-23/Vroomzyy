import './App.css';
import {BrowserRouter , Routes , Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/vehicles/:listingId" element={<ListingDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import EventPage from "./pages/EventPage/EventPage";
import MainPage from "./pages/MainPage/MainPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/artist" element={<ArtistPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

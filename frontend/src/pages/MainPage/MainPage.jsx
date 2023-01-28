import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { something } from "../CalendarPage/something";
import { rapidAPIKey } from "../APIKeys/APIKeys";
import "./MainPage.css";

const MainPage = (props) => {
  const navigate = useNavigate();

  const [artistDisplay, setArtistDisplay] = useState([]);

  const todayDate = new Date();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const nextDayDate = new Date();
  nextDayDate.setDate(nextDayDate.getDate() + 2);

  useEffect(() => {
    fetchDailyEvents();
  }, []);

  const fetchDailyEvents = async () => {
    let response = await axios.get(
      `https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Milwaukee&minDate=${todayDate.toLocaleDateString()}&maxDate=${nextDayDate.toLocaleDateString()}&rapidapi-key=${rapidAPIKey}`
    );
    let dataToMap = response.data.data;
    // let dataToMap = something;
    let artists = dataToMap?.map(function (el) {
      return {
        title: el.description,
        eventDate: el.endDate,
        venue: el.location.name,
        venueWebsite: el.location?.sameAs,
        performers: el.performer?.map((el) => el.name),
      };
    });
    console.log(artists);
    setArtistDisplay(artists);
  };

  const handleClick = () => {
    navigate("/calendar");
  };

  function handleArtistClick(artist, name) {
    let eventInfo = {
      eventInfo: artist,
      artistName: name,
    };
    navigate("/artist", { state: eventInfo });
  }

  function buildResultsToday() {
    let results = artistDisplay?.map((artist, index) => {
      let date = new Date(artist.eventDate.replace(/-/g, "/"));
      if (todayDate.toLocaleDateString() === date.toLocaleDateString()) {
        return artist.performers.map((el) => {
          return <h2 className="artist-spacer" onClick={() => handleArtistClick(artist, el)}>{el}</h2>;
        });
      }
    });
    return results;
  }
  function buildResultsTomorrow() {
    let results = artistDisplay?.map((artist, index) => {
      let date = new Date(artist.eventDate.replace(/-/g, "/"));
      if (tomorrowDate.toLocaleDateString() === date.toLocaleDateString()) {
        return artist.performers.map((el) => {
          return <h2 className="artist-spacer" onClick={() => handleArtistClick(artist, el)}>{el}</h2>;
        });
      }
    });
    return results;
  }
  function buildResultsNextDay() {
    let results = artistDisplay?.map((artist, index) => {
      let date = new Date(artist.eventDate.replace(/-/g, "/"));
      if (nextDayDate.toLocaleDateString() === date.toLocaleDateString()) {
        return artist.performers.map((el) => {
          return <h2 className="artist-spacer" onClick={() => handleArtistClick(artist, el)}>{el}</h2>;
        });
      }
    });
    return results;
  }

  return (
    <div>
      <div>
        <div>
          <h1 className="date-center">{todayDate.toLocaleDateString()}</h1>
        </div>
        <div className="artist-align">{buildResultsToday()}</div>
      </div>
      <div>
        <h1 className="date-center">{tomorrowDate.toLocaleDateString()}</h1>
        <div className="artist-align">{buildResultsTomorrow()}</div>
      </div>
      <div>
        <h1 className="date-center">{nextDayDate.toLocaleDateString()}</h1>
        <div className="artist-align">{buildResultsNextDay()}</div>
      </div>
      <div>
        <button onClick={handleClick}>Calendar</button>
      </div>
    </div>
  );
};

export default MainPage;

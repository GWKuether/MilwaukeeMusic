import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { something } from "../CalendarPage/something";

const MainPage = (props) => {
  const navigate = useNavigate();


  const [artistDisplay, setArtistDisplay] = useState([]);
  
  var todayDate = new Date()

  var tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)

  var nextDayDate = new Date()
  nextDayDate.setDate(nextDayDate.getDate() + 2)

 

  useEffect(() => {
    fetchDailyEvents();
  }, []);

  const fetchDailyEvents = async () => {
    // let response = await axios.get(
    //   "https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Milwaukee&minDate=2023-01-18&maxDate=2023-01-31&rapidapi-key=e4a27c7a77msh429e0aa2416efe0p168c02jsnfd69a5e83ce3"
    // )
    // console.log(response.data.data);
    // let dataToMap = response.data.data;
    let dataToMap = something;
    let artists = dataToMap.map(function (el) {
      return {
        eventDate: el.endDate,
        venue: el.location.name,
        performers: el.performer.map((el) => el.name),
      };
    });
    console.log(artists);
    setArtistDisplay(artists);
  };

  const handleClick = () => {
    navigate("/calendar");
  };

  function handleArtistClick(artist){
    navigate("/artist", {state: artist});
}

  return (
    <div>
      <h1>{todayDate.toLocaleDateString()}</h1>
      <h1>{tomorrowDate.toLocaleDateString()}</h1>
      <h1>{nextDayDate.toLocaleDateString()}</h1>
      <button onClick={handleClick}>Calendar</button>
      {artistDisplay.map((artist) => {
        if (todayDate.toLocaleDateString() === artist.eventDate) {
          return artist.performers.map((artist) => {
            return <p onClick={() => handleArtistClick(artist)}>{artist}</p>;
          });
        }
      })}
    </div>
  );
};

export default MainPage;

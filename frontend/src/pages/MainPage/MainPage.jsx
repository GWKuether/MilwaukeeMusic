import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { something } from "../CalendarPage/something";

const MainPage = (props) => {
  const navigate = useNavigate();


  const [artistDisplay, setArtistDisplay] = useState([]);
  
  const todayDate = new Date()

  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)

  const nextDayDate = new Date()
  nextDayDate.setDate(nextDayDate.getDate() + 2)

 

  useEffect(() => {
    fetchDailyEvents();
  }, []);

  const fetchDailyEvents = async () => {
    let response = await axios.get(
      // `https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Milwaukee&minDate=${todayDate.toLocaleDateString()}&maxDate=${nextDayDate.toLocaleDateString()}&rapidapi-key=e4a27c7a77msh429e0aa2416efe0p168c02jsnfd69a5e83ce3`
    )
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

  function handleArtistClick(artist, name){
    let eventInfo={
        eventInfo: artist,
        artistName: name
    }
    navigate("/artist", {state: eventInfo});
}

function buildResultsToday(){
    let results = artistDisplay?.map((artist,index) => {
        let date = new Date(artist.eventDate.replace(/-/g, '\/'))
        if (todayDate.toLocaleDateString() === date.toLocaleDateString()) {
          return artist.performers.map((el) => {
            return <p onClick={() => handleArtistClick(artist, el)}>{el}</p>;
          });
        }
      })
      console.log(results)
      return results
}
function buildResultsTomorrow(){
    let results = artistDisplay?.map((artist,index) => {
        let date = new Date(artist.eventDate.replace(/-/g, '\/'))
        if (tomorrowDate.toLocaleDateString() === date.toLocaleDateString()) {
          return artist.performers.map((el) => {
            return <p onClick={() => handleArtistClick(artist, el)}>{el}</p>;
          });
        }
      })
      console.log(results)
      return results
}
function buildResultsNextDay(){
    let results = artistDisplay?.map((artist,index) => {
        let date = new Date(artist.eventDate.replace(/-/g, '\/'))
        if (nextDayDate.toLocaleDateString() === date.toLocaleDateString()) {
          return artist.performers.map((el) => {
            return <p onClick={() => handleArtistClick(artist, el)}>{el}</p>;
          });
        }
      })
      console.log(results)
      return results
}

  return (
    <div>
      <h1>{todayDate.toLocaleDateString()}</h1>
      {buildResultsToday()}
      <h1>{tomorrowDate.toLocaleDateString()}</h1>
      {buildResultsTomorrow()}
      <h1>{nextDayDate.toLocaleDateString()}</h1>
      {buildResultsNextDay()}
      <button onClick={handleClick}>Calendar</button>

    </div>
  );
};

export default MainPage;

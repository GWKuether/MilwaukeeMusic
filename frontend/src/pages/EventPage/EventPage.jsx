import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./EventPage.css";

const EventPage = (props) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const state = useLocation();
  const eventInfo = state.state;
  const eventDate = new Date(eventInfo.eventDate.replace(/-/g, "/"));
  const [saveButton, setSaveButton] = useState("inactive")
  // const shortTitle = eventInfo.title?.slice(0, -28);


  function handleSaveClick() {
    let savedEvent = {
      title: eventInfo.title,
      date: eventInfo.eventDate,
      venue: eventInfo.venue,
      user_id_id: user.id,
    };
    addNewEvent(savedEvent);
    if (saveButton === "inactive"){
      setSaveButton("saved")
    }
  }

  async function addNewEvent(savedEvent) {
    let results = await axios.post(
      "http://127.0.0.1:8000/api/events/",
      savedEvent,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (results == "Duplicate") {
      console.log("You've already added this event!");
    }
  }

  function handleClick(info, name) {
    let eventInfo = {
      eventInfo: info,
      artistName: name,
    };
    navigate("/artist", { state: eventInfo });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", padding: "1em" }}>
        <button className={saveButton} onClick={handleSaveClick}>Save This Event</button>
      </div>
      <div style={{ display:"flex", justifyContent:"center",  paddingLeft:".5em", paddingRight: ".5em", paddingBottom:".5em" }}>
        <h1>{eventInfo.eventTitle}</h1>
      </div>
      <div style={{ display: "flex", justifyContent:"center", paddingBottom: "2em" }}>
        <h1>{eventDate.toLocaleDateString()}</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ borderWidth: ".25em", borderStyle: "solid", padding: "1em"}}>
          <p>All Performers:</p>
          {eventInfo.performers?.map((el) => {
            return <h2 style={{paddingBottom: ".5em"}} onClick={() => handleClick(eventInfo, el)}>{el}</h2>;
          })}
        </div>
        <div>
          <p>{eventInfo.venue}</p>
          <div style={{display: "flex", justifyContent: "center"}}>
            <a href={eventInfo.venueWebsite}>website</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;

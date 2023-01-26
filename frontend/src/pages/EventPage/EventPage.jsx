import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


const EventPage = (props) => {


    const [user, token] = useAuth()  
    const navigate = useNavigate()
    const state = useLocation();
    const eventInfo = state.state
    const eventDate = new Date (eventInfo.eventDate.replace(/-/g, '\/'))


    console.log(eventInfo?.title)
    console.log(eventInfo.title?.slice(0,-28))
    
   function handleSaveClick(){
    let savedEvent = {
      title: eventInfo.title,
      date: eventInfo.eventDate,
      venue: eventInfo.venue,
      user_id_id: user.id
    }
    addNewEvent(savedEvent)
   }

   async function addNewEvent(savedEvent) {
    let results = await axios.post("http://127.0.0.1:8000/api/events/", savedEvent, {
      headers: {
        Authorization: "Bearer " + token,
      }
    })
    if (results == "Duplicate"){
      console.log("You've already added this event!")
    }
  }



    function handleClick(info, name){
        let eventInfo={
            eventInfo: info,
            artistName: name
        }
        navigate("/artist", {state: eventInfo});
  }


  return (
    <div>
      <h1>Hey welcome to the event page!</h1>
      <h1>{eventDate.toLocaleDateString()}</h1>
      <p>Here are the artists playing this show:</p>
      {eventInfo.performers?.map((el) =>{
        return(
            <p onClick={() => handleClick(eventInfo, el)}>{el}</p>
        )
      })}
      <p>this is the venue: {eventInfo.venue}</p>
      <p>{eventInfo.venueWebsite}</p>
      <button onClick={handleSaveClick}>Save This Event</button>
    </div>
  );
};

export default EventPage;

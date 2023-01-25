import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const EventPage = (props) => {
    
    const navigate = useNavigate()
    const state = useLocation();
    const eventInfo = state.state
    const eventDate = new Date (eventInfo.eventDate.replace(/-/g, '\/'))
    
   function handleSaveClick(){
    let savedEvent = {
      title: eventInfo.title,
      date: eventInfo.eventDate,
      venue: eventInfo.venue,
      user_id: user.id
    }
   }


    console.log(eventInfo);

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
    </div>
  );
};

export default EventPage;

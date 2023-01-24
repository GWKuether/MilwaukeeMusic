import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EventPage = (props) => {
    
    const navigate = useNavigate()
    const state = useLocation();
    const eventInfo = state.state
    
   

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
      {eventInfo.performers.map((el) =>{
        return(
            <p onClick={() => handleClick(eventInfo, el)}>{el}</p>
        )
      })}
      
    </div>
  );
};

export default EventPage;

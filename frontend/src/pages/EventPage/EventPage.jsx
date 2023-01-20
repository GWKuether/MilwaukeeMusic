import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EventPage = (props) => {
    
    const navigate = useNavigate()
    const state = useLocation();
    const eventInfo = state.state
    
   

    console.log(eventInfo);

    function handleClick(performer){
        navigate("/artist", {state: performer});
  }


  return (
    <div>
      <h1>Hey welcome to the event page!</h1>
      {eventInfo.performers.map((performer) =>{
        return(
            <p onClick={() => handleClick(performer)}>{performer}</p>
        )
      })}
      
    </div>
  );
};

export default EventPage;

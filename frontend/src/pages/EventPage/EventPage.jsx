import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EventPage = (props) => {

  const navigate = useNavigate()
  const state = useLocation();
  const eventInfo = state.state
  console.log(eventInfo);

  function handleClick(){
    navigate("/artist")
    
  }


  return (
    <div>
      <h1>Hey welcome to the event page!</h1>
      <p onClick={handleClick}>{eventInfo.performer1}</p>
    </div>
  );
};

export default EventPage;

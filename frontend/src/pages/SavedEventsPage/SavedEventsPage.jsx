import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./SavedEventsPage.css"

const SavedEvents = (props) => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);
 

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api/events/", {
        headers: {
          Authorization: "Bearer " + token,
        }
      });
    console.log(response.data);
    setEvents(response.data);
  };

  function buildUserEvents() {
    let results = events?.map((event) => {
      let date = new Date(event.date.replace(/-/g, "/"))
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", borderStyle: "dashed", borderWidth: "1.5px"}}>
          <p>{event.title}</p>
          <p>{date.toLocaleDateString()}</p>
          <p>{event.venue}</p>
        </div>
      );
    });
    return results
  }

  return (
    <div>
    <h1 style={{paddingLeft: "1em", paddingBottom: "1em"}}>{user.username}'s Events</h1>
    {buildUserEvents()}
    </div>
  );
};

export default SavedEvents;

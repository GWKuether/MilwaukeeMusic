import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

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
      return (
        <div>
          <p>{event.title}</p>
          <p>{event.date}</p>
          <p>{event.venue}</p>
        </div>
      );
    });
    return results
  }

  return (
    <div>
    <p>
      this is going to be a list of all of the events {user.username} wants to
      attend
    </p>
    {buildUserEvents()}
    </div>
  );
};

export default SavedEvents;

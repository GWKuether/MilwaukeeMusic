import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {something} from './something';


const Calendar = (props) => {

    const navigate = useNavigate()

    const [events, setEvents] = useState([])


    const handleEventClick = (event) => {
        navigate('/event', {state: event.event.extendedProps})

    }




    useEffect(() => {
        fetchEvents();
      }, []);



    const fetchEvents = async () => {
        // let response = await axios.get(
        //   "https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Milwaukee&minDate=2023-01-18&maxDate=2023-01-31&rapidapi-key=e4a27c7a77msh429e0aa2416efe0p168c02jsnfd69a5e83ce3"
        // )
        // console.log(response.data.data);
        // let dataToMap = response.data.data;
        let dataToMap = something
        let calendarEvents = dataToMap.map(function(el){ 
            return { 
                title: el.description, 
                date: el.endDate, 
                eventTitle: el.description,
                eventDate: el.endDate,
                venue: el.location.name,
                venueWebsite: el.location?.sameAs,
                performer1: el.performer[0].name,
                performer2: el.performer[1]?.name,
                performer3: el.performer[2]?.name,
                performer4: el.performer[3]?.name,
                performer5: el.performer[4]?.name,
                performer6: el.performer[5]?.name,
                performer7: el.performer[6]?.name,
                performer8: el.performer[7]?.name,
                performer9: el.performer[8]?.name,
                performer10: el.performer[9]?.name,
                backgroundColor: '#74AAEB'
            }
        })
        console.log(calendarEvents)
        setEvents(calendarEvents);
    }


        return (
            <div>
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
          />
          </div>
        )
      }

export default Calendar;
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {something} from './something';
import { rapidAPIKey } from '../APIKeys/APIKeys';


const Calendar = (props) => {

    const navigate = useNavigate()

    const todayDate = new Date()
    const [events, setEvents] = useState([])


    const handleEventClick = (event) => {
        navigate('/event', {state: event.event.extendedProps})

    }




    useEffect(() => {
        fetchEvents();
      }, []);



    const fetchEvents = async () => {
        let response = await axios.get(
          `https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Milwaukee&minDate=${todayDate.toLocaleDateString()}&maxDate=2023-12-31&rapidapi-key=${rapidAPIKey}`
        )
        console.log(response.data.data);
        let dataToMap = response.data.data;
        // let dataToMap = something
        let calendarEvents = dataToMap?.map(function(el){ 
            return { 
                title: el.description, 
                date: el.endDate, 
                eventTitle: el.description,
                eventDate: el.endDate,
                venue: el.location.name,
                venueWebsite: el.location?.sameAs,
                performers: el.performer.map(el => el.name),
                backgroundColor: '#3B5270'
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



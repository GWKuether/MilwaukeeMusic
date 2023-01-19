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
        console.log(event)
        console.log(event.event.title)
        console.log(event.jsEvent.pageX + ',' + event.jsEvent.pageY)
        console.log(event.event.start)
        console.log(event.event.extendedProps)
        // navigate('/event', {state: event})

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
                flamingo:"Banana",

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
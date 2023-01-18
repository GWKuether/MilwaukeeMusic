import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const Calendar = (props) => {

        return (
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
          />
        )
      }

export default Calendar;
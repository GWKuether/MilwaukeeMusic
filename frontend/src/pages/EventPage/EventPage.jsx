import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


const EventPage = (props) => {

    const state = useLocation()
    console.log(state)


    return ( 
        <h1>Hey welcome to the event page!</h1>
     );
}
 
export default EventPage;
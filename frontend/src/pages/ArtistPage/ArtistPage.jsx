import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const ArtistPage = (props) => {

    const state = useLocation();
    const performer = state.state
    console.log(performer)

    useEffect(() => {
        fetchPerformer();
      }, []);

    
      const fetchPerformer = async () => {
        let response = await axios.get(`https://spotify23.p.rapidapi.com/search/?q=${performer}&type=artists&offset=0&limit=1&numberOfTopResults=1&rapidapi-key=e4a27c7a77msh429e0aa2416efe0p168c02jsnfd69a5e83ce3`)
        debugger
        console.log(response.data.artists.items[0]?.data.uri)
      }




    return ( 
        <h1>This right here? You guessed it. It's the Artist Page!</h1>
     );
}
 
export default ArtistPage;
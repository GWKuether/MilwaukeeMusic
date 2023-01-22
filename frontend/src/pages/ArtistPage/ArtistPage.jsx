import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

const ArtistPage = (props) => {
  const state = useLocation();
  const performer = state.state;
  const [performerId, setPerformerId] = useState("");
  const [monthlyListeners, setMonthlyListeners] = useState("")
  const [artistBio, setArtistBio] = useState("")
  const [topTrack, setTopTrack] = useState("")
  const [topTracks, setTopTracks] = useState([])

  useEffect(() => {
    fetchPerformerId();
  }, []);

  const fetchPerformerId = async () => {
    // let response = await axios.get(
    //   `https://spotify23.p.rapidapi.com/search/?q=${performer}&type=artists&offset=0&limit=1&numberOfTopResults=1&rapidapi-key=e4a27c7a77msh429e0aa2416efe0p168c02jsnfd69a5e83ce3`
    // );
    let text = response.data.artists?.items[0]?.data.uri;
    const idArray = text.split("");
    idArray.splice(0, 15);
    let id = idArray.join("")
    console.log(id)
    setPerformerId(idArray.join(""));
    fetchPerformerOverview(id)
  };

  const fetchPerformerOverview = async (id) => {
    // let response = await axios.get(
    //   `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}&rapidapi-key=e4a27c7a77msh429e0aa2416efe0p168c02jsnfd69a5e83ce3`
    // );
    console.log(response.data)
    setMonthlyListeners(response.data.data.artist.stats.monthlyListeners)
    console.log(response.data.data.artist.discography.topTracks.items[0].track.name)
    setTopTrack(response.data.data.artist.discography.topTracks.items[0].track.name)
    setArtistBio(response.data.data.artist.profile?.biography.text);
  };

  return (
    <div>
      <h1>This right here? You guessed it. It's the Artist Page!</h1>
      <h1>Who's that artist? it's {performer}!</h1>
      <p>here are the monthly listeners! {monthlyListeners}</p>
      <p>and of course, the top tracks: {topTracks}</p>
      <p>{artistBio}</p>
      <VideoPlayer performer={performer} topTrack={topTrack} />
    </div>
  );
};

export default ArtistPage;

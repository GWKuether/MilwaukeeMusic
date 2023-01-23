import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

const ArtistPage = (props) => {
  const state = useLocation();
  const performer = state.state;
  const [performerId, setPerformerId] = useState("");
  const [artistInfo, setArtistInfo] = useState("");
  const [topSongs, setTopSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
    let id = idArray.join("");
    console.log(id);
    setPerformerId(idArray.join(""));
    fetchPerformerOverview(id);
  };

  const fetchPerformerOverview = async (id) => {
    // let response = await axios.get(
    //   `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}&rapidapi-key=e4a27c7a77msh429e0aa2416efe0p168c02jsnfd69a5e83ce3`
    // );

    let artistInfo = [response.data.data.artist];
    let topSongs = [
      artistInfo[0].discography.topTracks.items[0],
      artistInfo[0].discography.topTracks.items[1],
      artistInfo[0].discography.topTracks.items[2],
    ];
    console.log(artistInfo);
    console.log(topSongs);
    setTopSongs(topSongs);
    setArtistInfo(artistInfo);
    setIsLoaded(true);
  };

  return (
    <div>
      {isLoaded ? (
        <>
          <h1>Who's that artist? it's {performer}!</h1>
          <img src={artistInfo[0].visuals.avatarImage.sources[0].url} alt="ArtistPhoto"></img>
          <p>here are the monthly listeners! {artistInfo[0].stats.monthlyListeners}</p>
          <p>and of course, the top tracks:</p>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Plays</th>
                </tr>
              </thead>
              <tbody>
                {topSongs.map((song) => {
                  return (
                    <tr>
                      <td>{song.track.name}</td>
                      <td>{song.track.playcount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <VideoPlayer performer={performer} topTrack={topSongs[0].track.name} />
        </>
      ) : null}
    </div>
  );
};

export default ArtistPage;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { useNavigate } from "react-router-dom";
import { rapidAPIKey } from "../APIKeys/APIKeys";
import "./ArtistPage.css";

const ArtistPage = (props) => {
  const navigate = useNavigate();
  const state = useLocation();
  const eventInfo = state.state;
  const [performerId, setPerformerId] = useState("");
  const [artistInfo, setArtistInfo] = useState("");
  const [topSongs, setTopSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  let date = new Date(eventInfo.eventInfo.eventDate);

  useEffect(() => {
    fetchPerformerId();
  }, []);

  const fetchPerformerId = async () => {
    let response = await axios.get(
      `https://spotify23.p.rapidapi.com/search/?q=${eventInfo.artistName}&type=artists&offset=0&limit=1&numberOfTopResults=1&rapidapi-key=${rapidAPIKey}`
    );
    let text = response.data.artists?.items[0]?.data.uri;
    const idArray = text?.split("");
    idArray?.splice(0, 15);
    let id = idArray?.join("");
    setPerformerId(idArray?.join(""));
    fetchPerformerOverview(id);
  };

  const fetchPerformerOverview = async (id) => {
    let response = await axios.get(
      `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}&rapidapi-key=${rapidAPIKey}`
    );
    let artistInfo = [response?.data?.data?.artist];
    let topSongs = [
      artistInfo[0]?.discography?.topTracks.items[0],
      artistInfo[0]?.discography?.topTracks.items[1],
      artistInfo[0]?.discography?.topTracks.items[2],
    ];
    console.log(artistInfo);
    console.log(artistInfo[0]?.visuals?.avatarImage?.sources[0]?.url);
    console.log(topSongs);
    setTopSongs(topSongs);
    setArtistInfo(artistInfo);
    setIsLoaded(true);
  };

  function handleClick() {
    navigate("/event", { state: eventInfo.eventInfo });
  }

  return (
    <div>
      {isLoaded ? (
        <>
          <div style={{paddingLeft:"1em", paddingBottom:"1em"}}>
            <h1>{eventInfo.artistName}</h1>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img style={{marginBottom: "1em"}}
                src={artistInfo[0]?.visuals?.avatarImage?.sources[0]?.url}
                alt="ArtistPhoto"
                className="artist-image-sizer"
              ></img>
              <div style={{marginBottom: "1em"}}>
                <p>
                  Spotify Monthly Listeners:{" "}
                  {artistInfo[0]?.stats.monthlyListeners}
                </p>
              </div>
                <div style={{marginBottom: ".5em"}}>
                  <h3>Spotify Top Tracks</h3>
                </div>
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
                          <td>{song?.track?.name}</td>
                          <td>{song?.track?.playcount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <VideoPlayer
                performer={eventInfo.artistName}
                topTrack={topSongs[0]?.track.name}
              />
              <h2 style={{marginTop: "1em"}}>{eventInfo.eventInfo.venue}</h2>
              <h3>{date.toLocaleDateString()}</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "1em",
                }}
              >
                <h2
                  style={{ borderWidth: "2px", borderStyle: "solid", padding: ".75em", marginTop: "1em", backgroundColor:"#3B5270", color: "white",  }}
                  onClick={() => handleClick()}
                >
                  Click here for more event information about this event!
                </h2>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ArtistPage;

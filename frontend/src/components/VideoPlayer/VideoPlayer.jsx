import React, { useState, useEffect } from "react";
import axios from "axios";
import { youtubeAPIKey } from "../../pages/APIKeys/APIKeys";

const VideoPlayer = (props) => {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    fetchVideoId();
  }, []);

  const fetchVideoId = async () => {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${props.performer} ${props.topTrack}&key=${youtubeAPIKey}&part=snippet&maxResults=1`
    );
    console.log(response.data);
    setVideoId(response.data.items[0].id.videoId);
  };

  return (
    <div>
      <iframe
        style={{
          boxShadow: "4px 2px 5px gray",
          borderRadius: ".75em",
        }}
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`}
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;

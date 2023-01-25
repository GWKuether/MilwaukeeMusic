import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoPlayer = (props) => {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    fetchVideoId();
  }, []);

  const fetchVideoId = async () => {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${props.performer} ${props.topTrack}&key=AIzaSyADwfFOa8oCMWoWfKuESBZmEFDTEd8mB18&part=snippet&maxResults=1`
    );
    console.log(response.data);
    setVideoId(response.data.items[0].id.videoId);
  };

  return (
    <div>
      <iframe
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

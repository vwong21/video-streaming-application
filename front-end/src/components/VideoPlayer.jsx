import React, { useRef, useEffect } from "react";

const VideoPlayer = ({ videoName }) => {
  console.log(videoName);
  const videoRef = useRef(null);
  const streamURL = import.meta.env.VITE_STREAM_URL;

  useEffect(() => {
    if (videoRef.current) {
      // Any setup logic for the video player can go here
    }
  }, []);

  return (
    <video ref={videoRef} width="320" height="240" controls autoPlay>
      <source src={`${streamURL}?title=${videoName}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;

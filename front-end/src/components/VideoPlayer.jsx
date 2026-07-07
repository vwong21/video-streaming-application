import React, { useRef, useEffect } from "react";

const VideoPlayer = ({ videoId }) => {
    console.log(videoId);
    const videoRef = useRef(null);
    const streamURL = import.meta.env.VITE_STREAM_URL;

    useEffect(() => {
        if (videoRef.current) {
            // Any setup logic for the video player can go here
        }
    }, []);

    return (
        <video ref={videoRef} controls autoPlay id="video_player">
            <source src={`${streamURL}?id=${videoId}`} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;

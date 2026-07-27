import React, { useRef, useEffect, useState } from "react";

const VideoPlayer = ({ videoId }) => {
    const videoRef = useRef(null);
    const streamURL = import.meta.env.VITE_STREAM_URL;
    const [videoUrl, setVideoUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setVideoUrl(null);
        setError(null);

        fetch(`${streamURL}?id=${videoId}`)
            .then((res) => {
                if (!res.ok) throw new Error("failed to load video");
                return res.json();
            })
            .then((data) => setVideoUrl(data.url))
            .catch((err) => {
                console.error(err);
                setError(err.message);
            });
    }, [videoId, streamURL]);

    if (error) return <div>Could not load video.</div>;
    if (!videoUrl) return <div>Loading...</div>;

    return (
        <video
            ref={videoRef}
            src={videoUrl}
            controls
            autoPlay
            id="video_player"
        >
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;

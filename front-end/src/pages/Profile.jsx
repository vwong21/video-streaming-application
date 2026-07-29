import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [upload, setUpload] = useState(false);
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        const jwtToken = localStorage.getItem("token");
        console.log("token:", jwtToken);
        try {
            const res = await axios.get(`${import.meta.env.VITE_VIDEOS_URL}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            setVideos(res.data.videos);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleUpload = () => {
        setUpload(!upload);
    };
    return (
        <div id="profile">
            {upload && (
                <div id="faded_background">
                    <div id="upload_file_container">
                        <div onClick={toggleUpload} id="close_popup">
                            Close
                        </div>
                        <h1>React File Upload</h1>
                        <div id="upload_file">
                            <Upload />
                        </div>
                    </div>
                </div>
            )}
            <header>
                <div id="header_container">
                    <h1 onClick={() => navigate("/")} id="title">
                        Stream
                        <span style={{ color: "#008CBA", fontSize: "3rem" }}>
                            Shelf
                        </span>
                    </h1>
                    <div id="icons_container">
                        <h2 onClick={toggleUpload} id="upload_header">
                            Upload
                        </h2>
                        <img src="/profile.svg" alt="" id="profile_svg" />
                    </div>
                </div>
            </header>
            <main id="profile_main">
                <h2 id="your_videos_title">Your Videos:</h2>
                <div className="profile_video_container">
                    {videos.map((video) => {
                        return (
                            <div key={video.id} className="profile_video_card">
                                <img
                                    className="thumbnail"
                                    src={`${video.thumbnailUrl}`}
                                ></img>
                                <div className="video_details_container">
                                    <p className="video_title">{video.title}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Profile;

import { useEffect, useState } from "react";
import "../App.css";
import VideoPlayer from "../components/VideoPlayer";
import Upload from "./Upload";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";

function App() {
    const navigate = useNavigate();
    const [upload, setUpload] = useState(false);

    const [title, setTitle] = useState("");
    const [videoId, setVideoId] = useState(null);
    const [videoTitle, setVideoTitle] = useState(null);
    const [videoDescription, setVideoDescription] = useState(null);
    const [videoUsername, setVideoUsername] = useState(null);

    const [browse, setBrowse] = useState([]);
    const [browseLoaded, setBrowseLoaded] = useState(false);

    const location = useLocation();

    useEffect(() => {
        getBrowseVideos();
    }, []);

    useEffect(() => {
        if (location.state?.video) {
            const video = location.state.video;
            setVideoId(video.id);
            setVideoTitle(video.title);
            setVideoDescription(video.description);
            setVideoUsername(video.username);
        }
    }, [location.state]);

    const toggleUpload = () => {
        setUpload(!upload);
    };

    const getBrowseVideos = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BROWSE_URL);
            setBrowse(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setBrowseLoaded(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            getBrowseVideos();
            return;
        }
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SEARCH_URL}?search=${title}`,
            );
            setBrowse(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setBrowseLoaded(true);
        }
    };

    const handleClick = (videoObject) => {
        setVideoId(videoObject.id);
        setVideoTitle(videoObject.title);
        setVideoDescription(videoObject.description);
        setVideoUsername(videoObject.username);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div id="app">
            {upload && (
                <div id="faded_background">
                    <div id="upload_file_container">
                        <div id="upload_file_header">
                            <p id="upload_file_title">Upload a video</p>
                            <button
                                onClick={toggleUpload}
                                id="close_popup"
                                aria-label="Close"
                            >
                                &#10005;
                            </button>
                        </div>
                        <div id="upload_file">
                            <Upload
                                onSuccess={() => {
                                    toggleUpload();
                                    getBrowseVideos();
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <header>
                <div id="header_container">
                    <h1 onClick={() => navigate("/")} id="title">
                        Stream
                        <span id="title_accent">Shelf</span>
                    </h1>

                    <form onSubmit={handleSubmit} id="search_vid">
                        <span id="search_icon">&#128269;</span>
                        <input
                            type="text"
                            name="title"
                            placeholder="Search videos"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="search_input"
                        />
                    </form>

                    <div id="icons_container">
                        <button onClick={toggleUpload} id="upload_header">
                            Upload
                        </button>
                        <ProfileMenu />
                    </div>
                </div>
            </header>

            <main id="app_main">
                {videoId && (
                    <section id="player_section">
                        <VideoPlayer key={videoId} videoId={videoId} />
                        <p id="video_player_title">{videoTitle}</p>
                        <div id="details_container">
                            <p id="video_player_username">{videoUsername}</p>
                            <p id="video_player_description">
                                {videoDescription}
                            </p>
                        </div>
                    </section>
                )}

                <section id="browse_section">
                    <p id="browse_label">Browse</p>
                    {browseLoaded && browse.length === 0 ? (
                        <div className="empty_state">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="empty_state_icon"
                            >
                                <rect
                                    x="2"
                                    y="5"
                                    width="15"
                                    height="14"
                                    rx="2"
                                ></rect>
                                <path d="M17 9l5-3v12l-5-3"></path>
                            </svg>
                            <p className="empty_state_title">No videos yet</p>
                            <p className="empty_state_body">
                                Nothing's been uploaded to StreamShelf yet.
                                Check back soon.
                            </p>
                        </div>
                    ) : (
                        <div id="browse_grid">
                            {browse.map((videoObject) => (
                                <div
                                    key={videoObject.id}
                                    onClick={() => handleClick(videoObject)}
                                    className="browse_card"
                                >
                                    <img
                                        className="browse_thumbnail"
                                        src={`${videoObject.thumbnailUrl}`}
                                    ></img>
                                    <p className="browse_title">
                                        {videoObject.title}
                                    </p>
                                    <p className="browse_username">
                                        {videoObject.username}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;

import { useEffect, useState } from "react";
import "../App.css";
import VideoPlayer from "../components/VideoPlayer";
import Upload from "./Upload";
import axios from "axios";

function App() {
    const [upload, setUpload] = useState(false);

    const [title, setTitle] = useState("");
    const [videoId, setVideoId] = useState(null);
    const [videoTitle, setVideoTitle] = useState(null);
    const [videoDescription, setVideoDescription] = useState(null);
    const [videoUsername, setVideoUsername] = useState(null);

    const [browse, setBrowse] = useState([]);

    const toggleUpload = () => {
        setUpload(!upload);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SEARCH_URL}?search=${title}`,
            );
            console.log(res);
            setBrowse(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {}, videoId);

    const handleClick = async (videoObject) => {
        setVideoId(videoObject.id);
        setVideoTitle(videoObject.title);
        setVideoDescription(videoObject.description);
        setVideoUsername(videoObject.username);
    };

    return (
        <div id="app">
            {upload && (
                <div id="faded_background">
                    <div id="upload_file_container">
                        <div onClick={toggleUpload} id="close_popup">
                            Close
                        </div>
                        <div id="upload_file">
                            <Upload />
                        </div>
                    </div>
                </div>
            )}

            <header>
                <div id="header-container">
                    <h1>
                        Stream
                        <span style={{ color: "#008CBA", fontSize: "3rem" }}>
                            Shelf
                        </span>
                    </h1>
                    <h2 onClick={toggleUpload} id="upload_header">
                        Upload
                    </h2>
                </div>
            </header>
            <main>
                <section className="browse">
                    <form onSubmit={handleSubmit} id="search_vid">
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button type="submit">GO</button>
                    </form>
                    <div id="results_container">
                        {browse.map((videoObject) => {
                            return (
                                <div
                                    key={videoObject.id}
                                    onClick={() => handleClick(videoObject)}
                                    className="video_container"
                                >
                                    <img
                                        className="thumbnail"
                                        src={`${import.meta.env.VITE_THUMBNAIL_URL_BASE}${videoObject.thumbnailPath}`}
                                    ></img>
                                    <div className="video_details_container">
                                        <p className="video_title">
                                            {videoObject.title}
                                        </p>
                                        <p className="video_username">
                                            {videoObject.username}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className="video">
                    {videoId && (
                        <div id="video_player_container">
                            <VideoPlayer key={videoId} videoId={videoId} />
                            <p
                                id="video_player_title"
                                className="video_player_content"
                            >
                                {videoTitle}
                            </p>
                            <div id="details_container">
                                <p
                                    id="video_player_username"
                                    className="video_player_content"
                                >
                                    {videoUsername}
                                </p>

                                <p
                                    id="video_player_description"
                                    className="video_player_content"
                                >
                                    {videoDescription}
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;

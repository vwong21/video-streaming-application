import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProfileMenu from "../components/ProfileMenu";

function Profile() {
    const [upload, setUpload] = useState(false);
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [videosLoaded, setVideosLoaded] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        getVideos();
    }, []);

    // Close the popup if you click anywhere outside of it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleVideoClick = (video) => {
        navigate("/", { state: { video } });
    };

    const getVideos = async () => {
        const jwtToken = localStorage.getItem("token");
        try {
            const res = await axios.get(`${import.meta.env.VITE_VIDEOS_URL}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            setVideos(res.data.videos);
        } catch (err) {
            console.error(err);
        } finally {
            setVideosLoaded(true);
        }
    };

    const toggleMenu = (e, videoId) => {
        e.stopPropagation();
        setOpenMenuId((prev) => (prev === videoId ? null : videoId));
    };

    const handleDelete = async (e, videoId) => {
        e.stopPropagation();
        const jwtToken = localStorage.getItem("token");
        try {
            await axios.delete(
                `${import.meta.env.VITE_UPLOAD_URL}/${videoId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                },
            );
            setVideos((prev) => prev.filter((v) => v.id !== videoId));
        } catch (err) {
            console.error(err);
        } finally {
            setOpenMenuId(null);
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
                                    getVideos();
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
                    <div id="icons_container">
                        <button onClick={toggleUpload} id="upload_header">
                            Upload
                        </button>
                        <ProfileMenu />
                    </div>
                </div>
            </header>
            <div id="profile_content_container">
                <main id="profile_main">
                    <h2 id="your_videos_title">Your videos</h2>
                    {videosLoaded && videos.length === 0 ? (
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
                            <p className="empty_state_title">
                                Upload your first video
                            </p>
                            <p className="empty_state_body">
                                Videos you upload will show up here.
                            </p>
                            <button
                                onClick={toggleUpload}
                                className="empty_state_button"
                            >
                                Upload a video
                            </button>
                        </div>
                    ) : (
                        <div className="profile_video_container">
                            {videos.map((video) => {
                                return (
                                    <div
                                        key={video.id}
                                        className="profile_video_card"
                                    >
                                        <img
                                            className="profile_thumbnail"
                                            src={`${video.thumbnailUrl}`}
                                            onClick={() =>
                                                handleVideoClick(video)
                                            }
                                        ></img>
                                        <div className="profile_details_container">
                                            <p
                                                className="profile_video_title"
                                                onClick={() =>
                                                    handleVideoClick(video)
                                                }
                                            >
                                                {video.title}
                                            </p>
                                            <div className="options_wrapper">
                                                <button
                                                    className="profile_video_options"
                                                    onClick={(e) =>
                                                        toggleMenu(e, video.id)
                                                    }
                                                    aria-label="Video options"
                                                >
                                                    &#8942;
                                                </button>
                                                {openMenuId === video.id && (
                                                    <div
                                                        className="options_menu"
                                                        ref={menuRef}
                                                    >
                                                        <button
                                                            className="delete_option"
                                                            onClick={(e) =>
                                                                handleDelete(
                                                                    e,
                                                                    video.id,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Profile;

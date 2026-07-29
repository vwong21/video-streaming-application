import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import { useState } from "react";

function Profile() {
    const [upload, setUpload] = useState(false);
    const navigate = useNavigate();

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
                <div id="header-container">
                    <h1 onClick={() => navigate("/")} id="title">
                        Stream
                        <span style={{ color: "#008CBA", fontSize: "3rem" }}>
                            Shelf
                        </span>
                    </h1>
                    <div id="icons-container">
                        <h2 onClick={toggleUpload} id="upload_header">
                            Upload
                        </h2>
                        <img
                            src="../../public/profile.svg"
                            alt=""
                            id="profile-svg"
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Profile;

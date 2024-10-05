import { useState } from "react";
import { Router, Route, useNavigate, Link } from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Upload from "./Upload";

function App() {
  const [upload, setUpload] = useState(false);

  const [title, setTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState(null);

  const toggleUpload = () => {
    setUpload(!upload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVideoTitle(title);
  };

  const navigate = useNavigate();
  const { authenticated, login } = useAuth();
  useEffect(() => {
    if (authenticated == false) {
      navigate("/auth");
    } else {
      console.log(authenticated);
    }
  });

  return (
    <div id="root">
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
        <h1>StreamShelf</h1>
        <h2 onClick={toggleUpload} id="upload_header">
          Upload
        </h2>
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
            <button type="submit">Search</button>
          </form>
        </section>
        <section className="search">
          {videoTitle && <VideoPlayer videoName={videoTitle} />}
        </section>
      </main>
    </div>
  );
}

export default App;

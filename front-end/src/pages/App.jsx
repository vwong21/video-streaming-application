import { useState } from "react";
import "../App.css";
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
            Stream<span style={{ color: "#008CBA" }}>Shelf</span>
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

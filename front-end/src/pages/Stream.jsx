import { useState } from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

const Stream = () => {
  const [title, setTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setVideoTitle(title);
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <li>
            <Link to="/stream">Stream</Link>
          </li>
        </ul>
      </nav>
      <h1>Stream</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {videoTitle && <VideoPlayer videoName={videoTitle} />}
    </>
  );
};

export default Stream;

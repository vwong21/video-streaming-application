import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
const Stream = () => {
  const [title, setTitle] = useState();
  const [filePath, setFilePath] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(title);
      const res = await axios
        .get("http://video-streaming.eastus.cloudapp.azure.com:3003/stream", {
          params: {
            title: title,
          },
        })
        .then((res) => {
          console.log(res.data);
          setFilePath(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/upload"}>Upload</Link>
          </li>
          <li>
            <Link to={"/stream"}>Stream</Link>
          </li>
        </ul>
      </nav>
      <h1>Stream</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title || ""}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {filePath && (
        <ReactPlayer
          url={`/app/public/${filePath.filePath.filePath}`}
          controls
        />
      )}
    </>
  );
};

export default Stream;

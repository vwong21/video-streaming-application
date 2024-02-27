import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Upload = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("video", file);
      const res = await axios.post("http://localhost:3002/upload", formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (file) {
      console.log(file);
    }
  }, [file]);

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
      <form onSubmit={submitForm}>
        <h1>React File Upload</h1>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title || ""}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default Upload;

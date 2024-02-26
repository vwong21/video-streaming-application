import axios from "axios";
import { useEffect, useState } from "react";
const Upload = () => {
  const [file, setFile] = useState();

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post("http://localhost:3002/upload", {
        video: file,
      });
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
      <form onSubmit={submitForm}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default Upload;

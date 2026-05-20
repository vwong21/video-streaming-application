import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Upload = () => {
    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const uploadURL = import.meta.env.VITE_UPLOAD_URL;
    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const jwtToken = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("video", file);
            const res = await axios.post(uploadURL, formData, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            });
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
                <input
                    type="text"
                    name="description"
                    value={description || null}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <button type="submit">Upload</button>
            </form>
        </>
    );
};

export default Upload;

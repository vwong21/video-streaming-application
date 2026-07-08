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
            <form onSubmit={submitForm} id="upload_vid">
                <div id="upload_title_container" className="upload_containers">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="upload_inputs"
                        value={title || ""}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <div
                    id="upload_description_container"
                    className="upload_containers"
                >
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        className="upload_inputs"
                        value={description || null}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </div>
                <input
                    type="file"
                    onChange={handleChange}
                    id="upload_video_file"
                />

                <button type="submit" id="upload_button">
                    Upload
                </button>
            </form>
        </>
    );
};

export default Upload;

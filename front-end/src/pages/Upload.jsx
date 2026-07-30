import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Upload = ({ onSuccess }) => {
    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const uploadURL = import.meta.env.VITE_UPLOAD_URL;

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a video file");
            return;
        }

        setError(null);
        setUploading(true);
        setProgress(0);

        try {
            const jwtToken = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("video", file);
            const res = await axios.post(uploadURL, formData, {
                headers: { Authorization: `Bearer ${jwtToken}` },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                    );
                    setProgress(percent);
                },
            });
            console.log(res);
            setProgress(100);
            if (onSuccess) onSuccess(res.data);
        } catch (error) {
            console.error(error);
            setError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
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
                <fieldset disabled={uploading} id="upload_fieldset">
                    <div
                        id="upload_title_container"
                        className="upload_containers"
                    >
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
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </fieldset>
            </form>

            {uploading && (
                <div id="upload_progress_container">
                    <div
                        id="upload_progress_bar"
                        style={{ width: `${progress}%` }}
                    ></div>
                    <p id="upload_progress_text">{progress}%</p>
                </div>
            )}

            {error && <p id="upload_error">{error}</p>}
        </>
    );
};

export default Upload;

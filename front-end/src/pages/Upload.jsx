import axios from "axios";
import { useEffect, useState } from "react";

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
        <form onSubmit={submitForm} id="upload_vid">
            <fieldset disabled={uploading} id="upload_fieldset">
                <label
                    htmlFor="upload_video_file"
                    id="upload_dropzone"
                    className={file ? "upload_dropzone_filled" : ""}
                >
                    <span id="upload_dropzone_icon">&#8593;</span>
                    <p id="upload_dropzone_text">
                        {file ? file.name : "Choose a video file"}
                    </p>
                    {file && (
                        <p id="upload_dropzone_subtext">
                            Choose a different file
                        </p>
                    )}
                </label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleChange}
                    id="upload_video_file"
                />

                <div className="upload_field">
                    <label htmlFor="upload_title" className="upload_label">
                        Title
                    </label>
                    <input
                        type="text"
                        id="upload_title"
                        name="title"
                        placeholder="Give your video a title"
                        className="upload_inputs"
                        value={title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="upload_field">
                    <label
                        htmlFor="upload_description"
                        className="upload_label"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="upload_description"
                        name="description"
                        placeholder="What's this video about"
                        className="upload_inputs"
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {uploading && (
                    <div id="upload_progress_container">
                        <div
                            id="upload_progress_bar"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}
                {uploading && (
                    <p id="upload_progress_text">Uploading, {progress}%</p>
                )}

                {error && <p id="upload_error">{error}</p>}

                <button type="submit" id="upload_button">
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </fieldset>
        </form>
    );
};

export default Upload;

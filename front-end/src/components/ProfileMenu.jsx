import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileMenu = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setOpen(false);
        navigate("/auth");
    };

    const handleDeleteUser = async () => {
        try {
            const jwtToken = localStorage.getItem("token");
            await axios.delete(import.meta.env.VITE_DEL_USER_URL, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            });
            localStorage.removeItem("token");
            setConfirmOpen(false);
            setOpen(false);
            navigate("/auth");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div id="profile_menu_wrapper" ref={menuRef}>
            <div id="profile_avatar" onClick={() => setOpen((prev) => !prev)}>
                VC
            </div>
            {open && (
                <div id="profile_dropdown">
                    <button
                        className="profile_dropdown_option"
                        onClick={() => {
                            setOpen(false);
                            navigate("/profile");
                        }}
                    >
                        Profile
                    </button>
                    <button
                        className="profile_dropdown_option logout_option"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                    <button
                        className="profile_dropdown_option delete_option"
                        onClick={() => {
                            setOpen(false);
                            setConfirmOpen(true);
                        }}
                    >
                        Delete Profile
                    </button>
                </div>
            )}

            {confirmOpen && (
                <>
                    <div
                        id="faded_background"
                        onClick={() => setConfirmOpen(false)}
                    />
                    <div id="upload_file_container">
                        <div id="upload_file_header">
                            <span id="upload_file_title">Delete profile?</span>
                            <button
                                id="close_popup"
                                onClick={() => setConfirmOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <p id="confirm_delete_body">
                            This will permanently delete your account and all
                            your videos. This action cannot be undone.
                        </p>
                        <div id="confirm_delete_actions">
                            <button
                                className="confirm_cancel_button"
                                onClick={() => setConfirmOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="confirm_delete_button"
                                onClick={handleDeleteUser}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileMenu;

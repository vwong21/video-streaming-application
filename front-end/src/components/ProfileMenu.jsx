import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
    const [open, setOpen] = useState(false);
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
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;

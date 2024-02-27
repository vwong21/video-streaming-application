import { Router, Route, useNavigate, Link } from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { authenticated, login } = useAuth();
  useEffect(() => {
    if (authenticated == false) {
      navigate("/auth");
    } else {
      console.log(authenticated);
    }
  });

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
      <h1>Home</h1>
    </>
  );
}

export default App;

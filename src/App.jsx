import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ChatBox from "./components/ChatBox/ChatBox";
import Welcome from "./components/Welcome/Welcome";
import { useEffect } from "react";

const App = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/Chatgroup");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Chatgroup" element={<ChatBox />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

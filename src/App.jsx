import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      // Redirect to the home page if not authenticated
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Welcome />} />

        {/* Protected Route */}
        <Route
          path="/Chatgroup"
          element={
            <ProtectedRoute>
              <ChatBox />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

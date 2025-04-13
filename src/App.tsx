import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ChatBox from "./components/ChatBox/ChatBox";
import Welcome from "./components/Welcome/Welcome";
import { useEffect, ReactNode } from "react";
import Profile from "./components/Profile/Profile";
import { Provider } from "react-redux";
import { store } from "./redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user] = useAuthState(auth);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

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
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/Chatgroup"
            element={
              <ProtectedRoute>
                <ChatBox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;

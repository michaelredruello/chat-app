import React from "react";
import GoogleSignin from "/btn_google_signin_dark_pressed_web.png";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import "./index.css";

const NavBar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="nav-bar">
      <h1>dotTxT</h1>
    </nav>
  );
};

export default NavBar;

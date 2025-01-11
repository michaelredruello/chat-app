import React, { useState } from "react";
import GoogleSignin from "/btn_google_signin_dark_pressed_web.png";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import "./index.css";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="nav-bar">
      <h1>dotTxT</h1>
      {user ? (
        <div className="hamburger-icon" onClick={toggleMenu}>
          &#9776;
        </div>
      ) : (
        <></>
      )}
      {menuOpen && (
        <div className="menu">
          <>
            <button className="menu-button" type="button">
              Profile
            </button>
            <button onClick={signOut} className="menu-button" type="button">
              Sign Out
            </button>
          </>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

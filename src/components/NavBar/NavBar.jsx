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
      <div className="hamburger-placeholder" onClick={toggleMenu}>
        {/* Hamburger placeholder */}
        &#9776;
      </div>
      {menuOpen && (
        <div className="menu">
          {user ? (
            <button onClick={signOut} className="sign-out" type="button">
              Sign Out
            </button>
          ) : (
            <>
              <button onClick={googleSignIn} className="sign-in" type="button">
                <img src={GoogleSignin} alt="Sign in with Google" />
              </button>
              <button className="sign-out" type="button">
                Profile
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

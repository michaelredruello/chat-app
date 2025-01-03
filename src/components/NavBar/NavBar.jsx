import React from "react";
import GoogleSignin from "/btn_google_signin_dark_pressed_web.png";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import "./index.css";

const NavBar = () => {
  const [user] = useAuthState(auth);

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

  return (
    <nav className="nav-bar">
      <h1>dotTxT</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button onClick={googleSignIn} className="sign-in" type="button">
          <img src={GoogleSignin} alt="Sign in with Google" />
        </button>
      )}
    </nav>
  );
};

export default NavBar;

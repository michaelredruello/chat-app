import React from "react";
import GoogleSignin from "/btn_google_signin_dark_pressed_web.png";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import "./index.css";

const Welcome = () => {
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <main className="welcome">
      <h2>Welcome to dotTxT</h2>
      <p>Sign in with Google and start chatting with your friends!</p>
      <button className="sign-in" onClick={googleSignIn} type="button">
        <img src={GoogleSignin} alt="Sign in with Google" />
      </button>
    </main>
  );
};

export default Welcome;

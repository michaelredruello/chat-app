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
      <h1 className="app-title">
        <span className="yellow">d</span>
        <span className="yellow">o</span>
        <span className="yellow">t</span>
        <span className="cyan">T</span>
        <span className="yellow">x</span>
        <span className="cyan">T</span>
      </h1>
      <p>Sign in with Google and start chatting with your friends!</p>
      <div className="sign-in">
        <img
          src={GoogleSignin}
          onClick={googleSignIn}
          alt="Sign in with Google"
        />
      </div>
    </main>
  );
};

export default Welcome;

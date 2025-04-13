import React from "react";
import GoogleSignin from "/btn_google_signin_dark_pressed_web.png";
import defaultAvatar from "../../../public/default-avatar.png";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import "./index.css";

const db = getFirestore();

const Welcome = () => {
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const { uid, displayName, photoURL } = result.user;

          await setDoc(
            doc(db, "users", uid),
            {
              name: displayName,
              avatar: photoURL || defaultAvatar,
            },
            { merge: true }
          );

          await updateProfile(result.user, {
            photoURL: photoURL || defaultAvatar,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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

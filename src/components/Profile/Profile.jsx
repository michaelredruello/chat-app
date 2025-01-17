import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import "./index.css";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhoto, setNewPhoto] = useState(user?.photoURL || "");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!newName.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: newName,
        photoURL: newPhoto,
      });
      setEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="profile"
          className="profile-image"
        />
        {!editing ? (
          <>
            <h2 className="profile-name">{user?.displayName || "No Name"}</h2>
            <p className="profile-email">{user?.email}</p>
            <button
              className="profile-edit-btn"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <div className="edit-field">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="edit-field">
              <label htmlFor="photo">Profile Picture URL:</label>
              <input
                id="photo"
                type="text"
                value={newPhoto}
                onChange={(e) => setNewPhoto(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="edit-buttons">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setEditing(false);
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

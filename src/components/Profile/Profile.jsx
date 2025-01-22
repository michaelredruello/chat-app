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
        <div className="profile-card__left">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="profile-card__image"
          />
        </div>
        <div className="profile-card__right">
          {!editing ? (
            <>
              <h2 className="profile-card__name">
                {user?.displayName || "No Name"}
              </h2>
              <p className="profile-card__email">{user?.email}</p>
              <button
                className="profile-card__edit-btn"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="profile-card__edit-field">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="profile-card__edit-field">
                <label htmlFor="photo">Profile Picture URL:</label>
                <input
                  id="photo"
                  type="text"
                  value={newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                />
              </div>
              {error && <p className="profile-card__error">{error}</p>}
              <div className="profile-card__edit-buttons">
                <button className="profile-card__save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="profile-card__cancel-btn"
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
    </div>
  );
};

export default Profile;

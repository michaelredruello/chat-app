import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { FaPencilAlt } from "react-icons/fa";
import "./index.css";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!newName.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      await updateProfile(user, { displayName: newName });
      setEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    }
  };

  // TODO: BROTHER. THIS. NOT. WORK.
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile(user, { photoURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <div className="profile-card__left">
          <div className="profile-card__image-container">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="profile-card__image"
            />
            <label htmlFor="photo-upload" className="profile-card__image-edit">
              <FaPencilAlt className="profile-card__edit-icon" />
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
        </div>
        <div className="profile-card__right">
          {!editing ? (
            <>
              <h2 className="profile-card__name">
                {user?.displayName || "No Name"}
                <FaPencilAlt
                  className="profile-card__edit-icon-name"
                  onClick={() => setEditing(true)}
                />
              </h2>
              <p className="profile-card__email">{user?.email}</p>
            </>
          ) : (
            <>
              <div className="profile-card__edit-field">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
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

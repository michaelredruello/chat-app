import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import "./index.css";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const navigationItems = [
    { label: "Chat", action: () => handleNavigation("/Chatgroup") },
    { label: "Profile", action: () => handleNavigation("/Profile") },
    { label: "Sign Out", action: handleSignOut },
  ];

  const deleteMessages = async () => {
    try {
      const messagesRef = collection(db, "messages");
      const snapshot = await getDocs(messagesRef);

      snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log("All messages deleted.");
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  const scheduleDeletion = () => {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(6, 30, 0, 0);

    let timeUntilNextRun = targetTime.getTime() - now.getTime();
    if (timeUntilNextRun < 0) {
      timeUntilNextRun += 24 * 60 * 60 * 1000;
    }

    setTimeout(() => {
      deleteMessages();
      setInterval(deleteMessages, 24 * 60 * 60 * 1000);
    }, timeUntilNextRun);
  };

  scheduleDeletion();

  return (
    <nav className="nav-bar">
      <h1>dotTxT</h1>
      {user && (
        <>
          {isMobile ? (
            <>
              <div
                className="hamburger-icon"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-label="Toggle menu"
              >
                &#9776;
              </div>
              {menuOpen && (
                <div className="menu">
                  {navigationItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="menu-button"
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="menu-desktop">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="navbar-button"
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default NavBar;

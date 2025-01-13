import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./index.css";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const signOut = () => {
    auth.signOut();
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="nav-bar">
      <h1>dotTxT</h1>
      {user ? (
        isMobile ? (
          <div className="hamburger-icon" onClick={toggleMenu}>
            &#9776;
          </div>
        ) : (
          <div className="menu-desktop">
            <button className="navbar-button" type="button">
              Profile
            </button>
            <button onClick={signOut} className="navbar-button" type="button">
              Sign Out
            </button>
          </div>
        )
      ) : (
        <></>
      )}
      {menuOpen && isMobile && (
        <div className="menu">
          <button className="menu-button" type="button">
            Profile
          </button>
          <button onClick={signOut} className="menu-button" type="button">
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

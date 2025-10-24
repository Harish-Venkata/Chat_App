import React from "react";
import { SignOutButton, UserProfile } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Modal from "../ReuseableComponents/Modal";
import DarkMode from "../Landing/DarkMode";
import styles from "../Styles/AuthenticatedHeader.module.css";

const dummyUser = {
  firstName: "John",
  imageUrl: "https://i.pravatar.cc/100?img=6",
};

const AuthenticatedHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Logo + App Name */}
        <div className={styles.logoContainer}>
          <img src="/assets/logo.png" alt="Logo" className={styles.logoImage} />
          <span className={styles.appName}>WSA Chat App</span>
        </div>

        {/* Right controls */}
        <div className={styles.controls}>
          <div className={styles.userInfo}>
            {dummyUser?.imageUrl && (
              <div className="avatar">
                <div className={styles.avatar}>
                  <img
                    src={dummyUser.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            )}
            <span className={styles.userName}>
              {dummyUser?.firstName || "User"}
            </span>
          </div>

          <button
            className={styles.editBtn}
            onClick={() => document.getElementById("edit_profile").showModal()}
          >
            Edit Profile
          </button>
          <Modal id="edit_profile">
            <UserProfile />
          </Modal>

          <DarkMode />

          <div>
            <SignOutButton signOutCallback={() => navigate("/")}>
              <button className={styles.logoutBtn}>Logout</button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;

import React from "react";
import styles from "../Styles/Message.module.css";
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected";
import Chat from "./Chat";
export default function MainLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebarwrapper}>
        <Sidebar />
      </div>
      <div className={styles.chatWrapper}>
        {5 < 3 ? <NoChatSelected /> : <Chat />}
      </div>
    </div>
  );
}

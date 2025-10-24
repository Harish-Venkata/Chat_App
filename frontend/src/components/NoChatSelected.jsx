import { MessageSquare } from "lucide-react";
import styles from "../Styles/NoChatSelected.module.css";
const NoChatSelected = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Icon Display */}
        <div className={styles.iconWrapper}>
          <div className={styles.iconContainer}>
            <div className={styles.iconBackground}>
              <MessageSquare className={styles.icon} />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className={styles.title}>Welcome to WSA Chat App!</h2>
        <p className={styles.subtitle}>
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

import { Image, Send, X } from "lucide-react";

import styles from "../Styles/MessageInput.module.css";

const MessageInput = () => {
  const dummyText = "Hello, this is a message!";
  const dummyImagePreview = "https://i.pravatar.cc/150?img=67"; // placeholder image
  return (
    <form className={styles.formContainer}>
      {/* Show dummy image preview */}
      <div className={styles.previewContainer}>
        <img
          src={dummyImagePreview}
          alt="Preview"
          className={styles.previewImage}
        />
        <button type="button" className={styles.removeButton}>
          <X size={16} />
        </button>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.imageButton}
          aria-label="Attach image"
        >
          <Image size={20} />
        </button>
        {/* Hidden file input(not functional in static version) */}
        <input type="file" hidden accept="image/*" />
        <input
          type="text"
          //   value={dummyText}

          placeholder="Type a message..."
          className={styles.textInput}
        />
        {/* Send button is enabled since we have dummy content */}
        <button type="submit" className={styles.sendButton}>
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

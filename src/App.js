import React, { useEffect, useState } from "react";
import { createSignalRConnection } from "./utils/singleR";

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const connection = createSignalRConnection(userId, (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      connection.stop();
    };
  }, [userId]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Notifications</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={styles.input}
      />
      <ul style={styles.notificationList}>
        {notifications.map((item, index) => (
          <li key={index} style={styles.notificationItem}>
            <p style={styles.notificationTitle}>{item.title}</p>
            <p style={styles.notificationMessage}>{item.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "24px",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "12px",
    margin: "16px",
    borderRadius: "8px",
    border: "1px solid #6B6B6B",
    backgroundColor: "#212121",
    color: "#FFFFFF",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  "@media (max-width: 768px)": {
    input: {
      maxWidth: "90%",
      padding: "10px",
      fontSize: "14px",
    },
  },
  notificationList: {
    listStyleType: "none",
    padding: 0,
    width: "100%",
    maxWidth: "600px",
  },
  notificationItem: {
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: "#212121",
    borderRadius: "8px",
  },
  notificationTitle: {
    fontSize: "18px",
    color: "#9CDCFE",
    margin: 0,
  },
  notificationMessage: {
    fontSize: "16px",
    color: "#CE9178",
    margin: 0,
  },
};

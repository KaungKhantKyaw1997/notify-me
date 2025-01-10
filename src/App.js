import React, { useEffect, useState } from "react";
import { createSignalRConnection } from "./utils/singleR";

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const userId = "user123";

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
    marginBottom: 0,
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

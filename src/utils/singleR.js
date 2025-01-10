import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const createSignalRConnection = (userId, onNotificationReceived) => {
  const connection = new HubConnectionBuilder()
    .withUrl(
      `https://connectify-bul3.onrender.com/notifications?userId=${userId}`
    )
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveNotification", (notification) => {
    console.log("Broadcast Notification received:", notification);
    onNotificationReceived(notification);
  });

  connection.on("ReceiveNotificationForUser", (notification) => {
    console.log("Specific User Notification received:", notification);
    if (notification.userId === userId) {
      onNotificationReceived(notification);
    }
  });

  connection
    .start()
    .then(() => console.log("Connected to SignalR"))
    .catch((error) => console.log("Connection failed:", error));

  return connection;
};

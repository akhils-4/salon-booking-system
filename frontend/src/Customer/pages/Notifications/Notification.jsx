import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { addNotification } from "../../../Redux/Notifications/action";
import NotificationCard from "./NotificationCard";

const Notification = ({ type }) => {
  const dispatch = useDispatch();
  const { auth, notification } = useSelector((store) => store);
  const [stompClient, setStompClient] = useState(null);

  // Create WebSocket client
  useEffect(() => {
    const sock = new SockJS("http://localhost:5000/api/notifications/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
  }, []);

  // Handle incoming messages
  const onMessageReceive = useCallback(
    (payload) => {
      const receivedNotification = JSON.parse(payload.body);
      dispatch(addNotification(receivedNotification));
    },
    [dispatch]
  );

  // Connect and subscribe
  useEffect(() => {
    if (stompClient && auth.user?.id) {
      stompClient.connect(
        {},
        () => {
          stompClient.subscribe(
            `/notification/user/${auth.user.id}`,
            onMessageReceive
          );
          console.log("Subscribed to notifications for user:", auth.user.id);
        },
        (error) => console.error("WebSocket connection error:", error)
      );
    }

    return () => {
      if (stompClient?.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [stompClient, auth.user?.id, onMessageReceive]);

  return (
    <div className="flex justify-center px-5 md:px-20 py-5 md:py-10">
      <div className="space-y-5 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold text-center">Notifications</h1>
        {[...notification.notifications].reverse().map((item) => (
          <NotificationCard type={type} key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Notification;

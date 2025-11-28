import React from "react";
import { Card, Typography, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { markNotificationAsRead } from "../../../Redux/Notifications/action";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ item, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReadNotification = () => {
    if (type === "USER" && !item.isRead) {
      dispatch(
        markNotificationAsRead({
          notificationId: item.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
      navigate("/bookings");
    }
  };

  return (
    <Card
      onClick={handleReadNotification}
      sx={{
        bgcolor: item.isRead && type === "USER" ? "white" : "#EAF0F1",
        cursor: "pointer",
        p: 2,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 3,
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography fontSize="1.5rem">🛎️</Typography>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="textPrimary">
            {item.description}
          </Typography>
          {item.booking?.services?.length > 0 && (
            <Typography variant="caption" color="textSecondary">
              {item.booking.services.map((service) => service.name).join(", ")}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default NotificationCard;

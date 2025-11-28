import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Drawer, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NotificationsActive } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsBySalon } from "../../../Redux/Notifications/action";
import useNotificationWebsoket from "../../../util/useNotificationWebsoket";

const Navbar = ({ DrawerList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ FIX: Select only needed slices instead of the entire store
  const salon = useSelector((state) => state.salon);
  const notification = useSelector((state) => state.notification);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // ✅ Fetch salon notifications
  useEffect(() => {
    if (salon.salon?.id) {
      dispatch(
        fetchNotificationsBySalon({
          salonId: salon.salon.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [salon.salon?.id, dispatch]);

  // ✅ Real-time notifications through WebSocket
  useNotificationWebsoket(salon.salon?.id, "salon");

  return (
    <div className="h-[10vh] flex items-center justify-between px-5 border-b bg-white">
      {/* Left: Drawer Menu + Logo */}
      <div className="flex items-center gap-3">
        <IconButton onClick={toggleDrawer(true)} color="primary">
          <MenuIcon color="primary" />
        </IconButton>

        <h1
          onClick={() => navigate("/")}
          className="font-extrabold text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer select-none"
        >
          Salon <span className="text-black">Booking</span>
        </h1>
      </div>

      {/* Right: Notifications */}
      {/* <IconButton
        onClick={() => navigate("/salon-dashboard/notifications")}
        sx={{ marginRight: 1 }}
      >
        <Badge
          badgeContent={
            notification.unreadCount || notification.notifications.length
          }
          color="secondary"
        >
          <NotificationsActive color="primary" />
        </Badge>
      </IconButton> */}

      {/* Drawer */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;

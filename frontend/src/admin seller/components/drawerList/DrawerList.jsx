import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Auth/action";
import { useDispatch } from "react-redux";

const DrawerList = ({ toggleDrawer, menu, menu2 }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClick = (item) => () => {
    if (item.name === "Logout") {
      handleLogout();
    }
    navigate(item.path);
    if (toggleDrawer) toggleDrawer(false)();
  };

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.path;

    return (
      <div
        key={item.name}
        onClick={handleClick(item)}
        className="cursor-pointer"
      >
        <div
          className={`flex items-center px-5 py-3 rounded-r-full transition-all duration-200 
            ${
              isActive
                ? "bg-red-500 text-white shadow-md"
                : "text-gray-700 hover:bg-red-100 hover:text-red-600"
            }`}
        >
          <ListItemIcon
            className={`min-w-[36px] ${
              isActive ? "text-white" : "text-gray-500"
            }`}
          >
            {isActive ? item.activeIcon : item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              className: "font-medium tracking-wide",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-white">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        {/* Top Menu */}
        <div className="space-y-2 px-1">{menu.map(renderMenuItem)}</div>

        {/* Bottom Menu */}
        <div className="space-y-4 px-1">
          <Divider />
          <div className="space-y-2">{menu2.map(renderMenuItem)}</div>
        </div>
      </div>
    </div>
  );
};

export default DrawerList;

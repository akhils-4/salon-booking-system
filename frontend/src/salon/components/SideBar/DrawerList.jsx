import * as React from "react";
import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
import {
  AccountBox,
  NotificationsNoneOutlined,
  Logout,
  Dashboard,
  Receipt,
  ShoppingBag,
  Inventory,
  Add,
  Category,
  AccountBalanceWallet,
} from "@mui/icons-material";

const menu = [
  {
    name: "Dashboard",
    path: "/salon-dashboard",
    icon: <Dashboard />,
    activeIcon: <Dashboard />,
  },
  {
    name: "Bookings",
    path: "/salon-dashboard/bookings",
    icon: <ShoppingBag />,
    activeIcon: <ShoppingBag />,
  },
  {
    name: "Services",
    path: "/salon-dashboard/services",
    icon: <Inventory />,
    activeIcon: <Inventory />,
  },
  {
    name: "Add Services",
    path: "/salon-dashboard/add-services",
    icon: <Add />,
    activeIcon: <Add />,
  },
  {
    name: "Payment",
    path: "/salon-dashboard/payment",
    icon: <AccountBalanceWallet />,
    activeIcon: <AccountBalanceWallet />,
  },
  {
    name: "Transaction",
    path: "/salon-dashboard/transaction",
    icon: <Receipt />,
    activeIcon: <Receipt />,
  },
  {
    name: "Category",
    path: "/salon-dashboard/category",
    icon: <Category />,
    activeIcon: <Category />,
  },
  {
    // name: "Notifications",
    // path: "/salon-dashboard/notifications",
    // icon: <NotificationsNoneOutlined />,
    // activeIcon: <NotificationsNoneOutlined />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/salon-dashboard/account",
    icon: <AccountBox />,
    activeIcon: <AccountBox />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />,
    activeIcon: <Logout />,
  },
];

const SalonDrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SalonDrawerList;

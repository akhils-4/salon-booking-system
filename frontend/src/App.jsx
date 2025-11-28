import { ThemeProvider } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import redTheme from "./Theme/redTheme";

import SalonDashboard from "./salon/pages/SellerDashboard/SalonDashboard";
import Auth from "./Auth/Auth";
import BecomePartner from "./salon/pages/Become Partner/BecomePartnerForm";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminDashboard from "./Admin/pages/Dashboard/Dashboard";

import { getUser } from "./Redux/Auth/action";

function App() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt, dispatch]);

  useEffect(() => {
    if (auth.user?.role === "ROLE_SALON_OWNER") {
      navigate("/salon-dashboard");
    }
  }, [auth.user?.role, navigate]);

  return (
    <ThemeProvider theme={redTheme}>
      <div className="relative">
        <Routes>
          <Route path="/salon-dashboard/*" element={<SalonDashboard />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<CustomerRoutes />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

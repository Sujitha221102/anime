import React from "react";
import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

const useAuth = () => {
  const isLoggedIn = localStorage.getItem("LoggedIn");
  return isLoggedIn === "true";
};

const Protect = () => {
  const isAuth = useAuth();
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <HomePage />;
};

export default Protect;

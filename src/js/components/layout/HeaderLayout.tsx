import React from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../header/Header";

export const HeaderLayout = () => {
  const location = useLocation();
  return (
    location.pathname !== "/signin" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/forgot-password" &&
    location.pathname !== "/reset-password" &&
    location.pathname !== "/guest-login" && <Header />
  );
};

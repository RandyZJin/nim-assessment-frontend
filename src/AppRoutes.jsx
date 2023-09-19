import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import ConfirmationPage from "./components/ConfirmationPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/order-confirmation/:id" element={<ConfirmationPage />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default AppRoutes;

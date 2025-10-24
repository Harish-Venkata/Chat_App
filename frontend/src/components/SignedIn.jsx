import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import AuthenticatedHeader from "../Authentication/AuthenticatedHeader";

export default function SignedIn() {
  return (
    <div className="main-layout">
      {/* Header will change, now it will show us who logged in */}
      <AuthenticatedHeader />
      <main className="context-area">
        <Routes>
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </main>
    </div>
  );
}

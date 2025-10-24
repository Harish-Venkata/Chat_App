import React from "react";
import { NavLink } from "react-router-dom";
import DarkMode from "./DarkMode";

export default function Navbar() {
  return (
    <nav className=" top-0 navbar bg-base-200 px-6">
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="Logo" className="size-16" />
        <p className="font-medium text-xl">WSA Chat App</p>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <nav className="flex items-center gap-2">
          <NavLink className="btn btn-ghost text-lg" to="/register">
            Sign Up
          </NavLink>
          <NavLink className="btn btn-ghost text-lg" to="/login">
            Log In
          </NavLink>
        </nav>
        {/* Darkmode component */}
        <DarkMode />
      </div>
    </nav>
  );
}

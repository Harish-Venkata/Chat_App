import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./Landing/Hero";
import Footer from "./Landing/Footer";
import Login from "./Authentication/Login";
import SignedIn from "./components/SignedIn";
import Register from "./Authentication/Register";
1;

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main/*" element={<SignedIn />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

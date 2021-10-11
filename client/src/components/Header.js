import React from "react";
import Navbar from "./Navbar";
import "../styles/home/header.css";

export default function Header() {
  return (
    <div className="Header">
      <div className="container">
        <Navbar />
      </div>
    </div>
  );
}

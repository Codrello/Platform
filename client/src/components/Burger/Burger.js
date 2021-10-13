import React, { useEffect, useState } from "react";
import { elastic as Menu } from "react-burger-menu";
import { Link, NavLink } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import getWindowDimensions from "../../utils/getWindowDimensions";

import "./main.css";

function Burger(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  // This can be used to close the menu, e.g. when a user clicks a menu item
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={(state) => handleStateChange(state)}
      right
      width={windowDimensions.width < 400 ? 250 : 350}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
    >
      <NavLink
        exact
        activeStyle={{
          fontWeight: "bold",
          color: "#2175f5",
        }}
        to="/"
        onClick={() => closeMenu()}
      >
        <HomeIcon className="navbarIcon" />
        Bosh Sahifa
      </NavLink>
      <NavLink
        activeStyle={{
          fontWeight: "bold",
          color: "#2175f5",
        }}
        to="/products"
        onClick={() => closeMenu()}
      >
        <ShoppingBagIcon className="navbarIcon" />
        Darsliklar
      </NavLink>
      {/* <NavLink
        activeStyle={{
          fontWeight: "bold",
          color: "#2175f5",
        }}
        to="/shops"
        onClick={() => closeMenu()}
      >
        <StorefrontIcon className="navbarIcon" /> Do`konlarimiz
      </NavLink> */}
      <NavLink
        activeStyle={{
          fontWeight: "bold",
          color: "#2175f5",
        }}
        to="/authors"
        onClick={() => closeMenu()}
      >
        <PersonIcon className="navbarIcon" /> Authors
      </NavLink>
      <NavLink
        activeStyle={{
          fontWeight: "bold",
          color: "#2175f5",
        }}
        to="/news"
        onClick={() => closeMenu()}
      >
        <FiberNewIcon className="navbarIcon" /> Yangiliklar
      </NavLink>
    </Menu>
  );
}

export default Burger;

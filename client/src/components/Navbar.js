import React from "react";
// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";

import { Link, NavLink } from "react-router-dom";

import DropdownView from "./Dropdown";
import BadgeView from "./Badge";
import SearchView from "./SearchView";
import { ModalView } from "./Modal";
const searchIcon = () => {
  return <SearchIcon />;
};
const dropDownIcon = () => {
  return <AccountCircleIcon style={{ color: "#2175f5" }} />;
};

const badgeIcon = () => {
  return <ShoppingBasketIcon style={{ color: "#2175f5" }} />;
};

export default function Navbar() {
  return (
    <div className="Navbar" id="outer-container">
      <div id="page-wrap" className="navbar">
        <Link className="navbarLogo" to="/">
          <img
            src="https://via.placeholder.com/300x400"
            alt="BookMarket24_Logo"
            className="navbar-logo"
            width="200"
            height="75"
          />
        </Link>
        <ModalView className="navbar-search" children={searchIcon()} />
        <SearchView className="navbarSearchInput" />
        <div className="navbarActions">
          <BadgeView className="basket" children={badgeIcon()} />
          <DropdownView className="avatar" children={dropDownIcon()} />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DropdownView from "./Dropdown";
import BadgeView from "./Badge";
import SearchView from "./SearchView";
import { ModalView } from "./Modal";

export default function Navbar() {
  const { error, loading, isAuthanticated, user } = useSelector(
    (state) => state.auth
  );
  const userDetails = user["user"];
  const searchIcon = () => {
    return <SearchIcon />;
  };
  const dropDownIcon = () => {
    return !isAuthanticated ? (
      <AccountCircleIcon style={{ color: "#2175f5" }} />
    ) : (
      <div style={{ textAlign: "center" }}>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <span>{userDetails.name}</span>
      </div>
    );
  };

  const badgeIcon = () => {
    return <ShoppingBasketIcon style={{ color: "#2175f5" }} />;
  };
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
        <div
          className="navbarActions"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BadgeView className="basket" children={badgeIcon()} />
          <DropdownView className="avatar" children={dropDownIcon()} />
        </div>
      </div>
    </div>
  );
}

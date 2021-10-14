import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./style.css";
import InnerHome from "./InnerHome";
import Features from "./Features";

export default function Home() {
  return (
    <div className="Home">
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {" "}
        {/* <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" />
      </Box>
      <h2 style={{ marginTop: "10px", color: "red" }}> МЫ СКОРО ПРИЕДЕМ </h2>
      <h2 style={{ marginTop: "10px", color: "red" }}>
        Мы очень много работаем над новой версией нашего сайта. Это принесет
        много новых функций. Быть в курсе!
      </h2>
      <marquee
        style={{ backgroundColor: "red", color: "white", fontSize: "36px" }}
      >
        на разработке
      </marquee> */}
        <InnerHome />
        <Features />
      </div>
    </div>
  );
}

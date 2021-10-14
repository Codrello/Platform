import React, { useEffect } from "react";
import { Spin } from "antd";
const Admin = () => {
  useEffect(() => {
    window.location.href = "https://express-admins.herokuapp.com/admin";
  }, []);

  return (
    <div className="container">
      <div
        style={{
          margin: "20px 0",
          marginBottom: "20px",
          padding: "30px 50px",
          textAlign: "center",
          borderRadius: "4px",
        }}
      >
        <Spin />
      </div>
    </div>
  );
};
export default Admin;

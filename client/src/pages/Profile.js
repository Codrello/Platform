import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions } from "antd";

export default function Profile() {
  const { loading, isAuthanticated, error, user } = useSelector(
    (state) => state.auth
  );
  return (
    <div className="container">
      <Descriptions title="User Info" layout="vertical">
        <Descriptions.Item label="FISH">
          {user &&
            `${user["user"].name} ${user["user"].Surname} ${user["user"].FatherName} `}
        </Descriptions.Item>
        <Descriptions.Item label="Tug'ilgan Kuni">
          {user && user["user"].DateBirth}
        </Descriptions.Item>
        <Descriptions.Item label="UserName">
          {user && user["user"].username}
        </Descriptions.Item>
        <Descriptions.Item label="JSHSHIR">
          {user && user["user"].JSHSHIR}
        </Descriptions.Item>
        <Descriptions.Item label="Viloyat">
          {user && user["user"].Region}
        </Descriptions.Item>
        <Descriptions.Item label="Tuman">
          {user && user["user"].District}
        </Descriptions.Item>
        <Descriptions.Item label="Jinsi">
          {user && user["user"].Jinsi}
        </Descriptions.Item>
        <Descriptions.Item label="Telephone">
          {user && user["user"].Workph}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

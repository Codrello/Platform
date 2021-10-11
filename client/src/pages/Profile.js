import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Profile() {
  const { loading, isAuthanticated, error } = useSelector(
    (state) => state.auth
  );
  return <div></div>;
}

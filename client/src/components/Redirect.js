import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RedirectRoute({ component: Component, path, ...rest }) {
  const { isAuthanticated, loading, user } = useSelector((state) => state.auth);
  console.log(path);
  return (
    <Fragment>
      <Route
        {...rest}
        render={(props) => {
          if (path === "/admin") {
            return (window.location.href =
              "https://express-admins.herokuapp.com/admin");
          }

          return <Component {...props} />;
        }}
      />
    </Fragment>
  );
}

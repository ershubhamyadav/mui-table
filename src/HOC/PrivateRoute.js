import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import { getStorage } from "../Helper/store";
import ContentWrapper from "./ContentWrapper";

export const PrivateRoute = ({ element, path }) => {
  let { data } = getStorage("userLogin");
  let isLoggedIn = data ? true : false;

  //   if (isLoggedIn) {
  //     return <Navigate to="/" />;
  //   }
  //   if (!isLoggedIn) {
  return <Route path={path} element={element} />;
  //   }
};

export default PrivateRoute;

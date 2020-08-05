import { Heading, Page } from "@shopify/polaris";
import CardTag from "./CardTag";
import React, { useContext } from "react";
import StoreContextProvider from "./Contexts/Context";
import Login from "./Login/Login";
import Signup from "./Login/SignUp";
import { StoreContext } from "./Contexts/Context";

export default function PageHandler() {
  let { currentPage } = useContext(StoreContext);

  return (
    <div>
      {currentPage == "main" && <CardTag />}
      {currentPage == "login" && <Login />}
      {currentPage == "signup" && <Signup />}
    </div>
  );
}

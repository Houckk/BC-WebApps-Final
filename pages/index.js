import { Heading, Page } from "@shopify/polaris";
import CardTag from "./components/CardTag";
import React, { useContext } from "react";
import StoreContextProvider from "./components/Contexts/Context";
import QandA from "./components/QandA";
import Login from "./components/Login/Login";
import Signup from "./components/Login/SignUp";
import { StoreContext } from "./components/Contexts/Context";
import PageHandler from "./components/PageHandler";

export default function Index() {
  return (
    <StoreContextProvider>
      <Page>
        <Heading> Welcome to Our FAQ App </Heading>
        <PageHandler />
      </Page>
    </StoreContextProvider>
  );
}

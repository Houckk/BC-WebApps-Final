import { Heading, Page } from "@shopify/polaris";
import CardTag from "./components/CardTag";
import React from "react";
import StoreContextProvider from "./components/Contexts/Context";
import QandA from "./components/QandA";

const Index = () => (
  <StoreContextProvider>
    <Page>
      <Heading> Welcome to Our FAQ App </Heading>
      <CardTag />
    </Page>
  </StoreContextProvider>
);

export default Index;

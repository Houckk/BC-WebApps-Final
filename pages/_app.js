import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App, { Container } from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
import "@shopify/polaris/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include"
  }
});
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const shopOrigin = Cookies.get("shopOrigin");
    return (
      <Container>
        <Router>
          <AppProvider i18n={translations}>
            <Provider
              config={{
                apiKey: API_KEY,
                shopOrigin: shopOrigin,
                forceRedirect: true
              }}
            >
              <ApolloProvider client={client}>
                <Component {...pageProps} />
              </ApolloProvider>
            </Provider>
          </AppProvider>
        </Router>
      </Container>
    );
  }
}

export default MyApp;

import React, { useContext, useCallback } from "react";
import { FormLayout, TextField, Button, Card, Stack } from "@shopify/polaris";
import { StoreContext } from "../Contexts/Context";
import { set } from "js-cookie";

export default function Login() {
  let {
    username,
    setUsername,
    setPassword,
    password,
    setCurrentPage
  } = useContext(StoreContext);
  const handleUsername = useCallback(newValue => setUsername(newValue), []);
  const handlePassword = useCallback(newValue => setPassword(newValue), []);

  function login(email, password) {
    var fetchUrl = "/api/login";
    var method = "PUT";
    fetch(fetchUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        if (data == "success") {
          console.log(data);
          setCurrentPage("main");
        }
      });
  }

  return (
    <Card title="Login" sectioned>
      <FormLayout>
        <TextField
          label="Email"
          type="email"
          onChange={handleUsername}
          value={username}
        />
        <TextField
          label="Password"
          onChange={handlePassword}
          type="password"
          value={password}
        />
        <Button onClick={() => login(username, password)} primary fullWidth>
          {" "}
          Log In{" "}
        </Button>
        <Stack alignment="center" vertical={true}>
          <div>
            Need to create an account? &nbsp;
            <Button onClick={() => setCurrentPage("signup")}>Sign Up</Button>
          </div>
        </Stack>
      </FormLayout>
    </Card>
  );
}

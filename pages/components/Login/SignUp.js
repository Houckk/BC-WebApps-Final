import { FormLayout, TextField, Button, Card, Stack } from "@shopify/polaris";
import React, { useState, useContext, useCallback } from "react";
import { StoreContext } from "../Contexts/Context";
function Signup(props) {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentPage } = useContext(StoreContext);

  const handleEmail = useCallback(newValue => setEmail(newValue), []);
  const handlePassword = useCallback(newValue => setPassword(newValue), []);

  function handleSubmit(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all the required fields");
      return;
    }
    setId(email);
    signup(email, password, id);
    setEmail("");
    setPassword("");
    setId("");
    setError("");
  }
  function signup(email, password, id) {
    var fetchUrl = "/api/signup";
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
        if (data == "success") {
          setCurrentPage("main");
        }
      });
  }

  return (
    <Card sectioned title="Sign Up">
      <FormLayout onSubmit={handleSubmit}>
        <TextField
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <Button type="submit" primary fullWidth onClick={handleSubmit}>
          Sign Up
        </Button>
        <Stack alignment="center" vertical={true}>
          <div>
            Already have an account? &nbsp;
            <Button onClick={() => setCurrentPage("login")}>Log In</Button>
          </div>
        </Stack>
      </FormLayout>
      <div>{error}</div>
    </Card>
  );
}

export default Signup;

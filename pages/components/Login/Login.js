import React, { useContext, useCallback, useState } from "react";
import {
  FormLayout,
  TextField,
  Button,
  Card,
  Stack,
  Spinner,
  Modal
} from "@shopify/polaris";
import { StoreContext } from "../Contexts/Context";
import Reset from "./Reset";

export default function Login() {
  let {
    setPassword,
    password,
    setCurrentPage,
    setCurrentUser,
    currentUser,
    setTags
  } = useContext(StoreContext);
  const handleEmail = useCallback(newValue => setEmail(newValue), []);
  const handlePassword = useCallback(newValue => setPassword(newValue), []);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function login(email, password) {
    setLoading(true);
    setError("");
    var fetchUrl = "/api/login";
    var method = "PUT";
    fetch(fetchUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        console.log(data);
        if (data.status == "success") {
          setCurrentPage("main");
          setCurrentUser(data.user);
          fetch("/api/getTags", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
          })
            .then(response => response.json())
            .then(data => setTags(data.tags));
        } else {
          setError(
            "The email or password entered is incorrect. Please try again or reset your password."
          );
        }
      });
  }

  return (
    <div>
      <Card title="Login" sectioned>
        <FormLayout>
          <TextField
            label="Email"
            type="email"
            onChange={handleEmail}
            value={email}
          />
          <TextField
            label="Password"
            onChange={handlePassword}
            type="password"
            value={password}
          />
          {loading ? (
            <Stack alignment="center" vertical={true}>
              <Spinner
                accessibilityLabel="Spinner example"
                size="large"
                color="inkLightest"
              />
            </Stack>
          ) : (
            <Button onClick={() => login(email, password)} primary fullWidth>
              Log In
            </Button>
          )}
          <Stack alignment="center" vertical={true}>
            <div style={{ color: "red" }}>{error}</div>
          </Stack>
          <Stack alignment="center" vertical={true}>
            <div>
              Need to create an account? &nbsp;
              <Button onClick={() => setCurrentPage("signup")}>Sign Up</Button>
            </div>
          </Stack>
          <Stack alignment="center" vertical={true}>
            <a onClick={() => setOpen(true)} style={{ color: "black" }}>
              Forgot your password?
            </a>
          </Stack>
        </FormLayout>
      </Card>
      <Reset open={open} setOpen={setOpen} />
    </div>
  );
}

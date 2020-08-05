import React, { useCallback, useState } from "react";
import {
  FormLayout,
  TextField,
  Button,
  TextContainer,
  Stack,
  Spinner,
  Modal
} from "@shopify/polaris";

export default function Reset(props) {
  const open = props.open;
  const setOpen = props.setOpen;
  const [email, setEmail] = useState("");
  const handleEmail = useCallback(newValue => setEmail(newValue), []);

  function handleSubmit() {
    setOpen(false);
    var fetchUrl = "/api/resetPassword";
    var method = "PUT";
    fetch(fetchUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    });
  }

  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Reset Your Password"
      >
        <Modal.Section>
          <Stack vertical>
            <Stack.Item>
              <TextContainer>
                <p>
                  Enter your email and we will send an email to you with a link
                  to reset your password.
                </p>
              </TextContainer>
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                label="Email"
                value={email}
                onChange={handleEmail}
                connectedRight={
                  <Button primary onClick={handleSubmit}>
                    Submit
                  </Button>
                }
              />
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

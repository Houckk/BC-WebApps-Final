import React, { useCallback, useState } from "react";
import {
  Button,
  Card,
  Collapsible,
  Stack,
  TextContainer
} from "@shopify/polaris";

export default function CollapsibleElement(props) {
  const [active, setActive] = useState(true);

  const handleToggle = useCallback(() => setActive(active => !active), []);

  return (
    <div style={{ height: "200px" }}>
      <Card sectioned>
        <Stack vertical>
          <Button
            onClick={handleToggle}
            ariaExpanded={active}
            ariaControls="basic-collapsible"
          >
            {props.question}
          </Button>
          <Collapsible
            open={active}
            id="basic-collapsible"
            transition={{ duration: "150ms", timingFunction: "ease" }}
          >
            <TextContainer>{props.answer}</TextContainer>
          </Collapsible>
        </Stack>
      </Card>
    </div>
  );
}

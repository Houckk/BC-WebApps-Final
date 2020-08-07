import React, { useState, useCallback } from "react";
import { Button, Collapsible } from "@shopify/polaris";
import Template4Preview from "./Template4Preview";

export default function SelectPreview(props) {
  const userSelectedTemplate = props.userSelectedTemplate;
  const tags = props.tags;

  const [active, setActive] = useState(true);

  const handleToggle = useCallback(() => setActive(active => !active), []);

  return (
    <div>
      <Button
        onClick={handleToggle}
        ariaExpanded={active}
        ariaControls="basic-collapsible"
      >
        Preview
      </Button>
      <Collapsible
        open={active}
        id="basic-collapsible"
        transition={{ duration: "150ms", timingFunction: "ease" }}
      >
        {/* // {userSelectedTemplate == "Template-1" && <Template1Preview tags = {tags}/>} */}
        {/* // {userSelectedTemplate == "Template-2" && <Template2Preview tags = {tags}/>}
            // {userSelectedTemplate == "Template-3" && <Template3Preview tags = {tags}/>} */}
        {userSelectedTemplate == "Template-4" && (
          <Template4Preview tags={tags} />
        )}
        {/* // {userSelectedTemplate == "Template-5" && <Template5Preview tags = {tags}/>} */}
      </Collapsible>
    </div>
  );
}

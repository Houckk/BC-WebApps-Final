import React, { useCallback, useState } from "react";
import { Select } from "@shopify/polaris";

export default function SelectedTemplate(props) {
  const [selected, setSelected] = useState("Template-1");

  const handleSelectChange = useCallback(value => setSelected(value), []);

  const options = [
    { label: "Template-1", value: "Template-1" },
    { label: "Template-2", value: "Template-2" },
    { label: "Template-3", value: "Template-3" },
    { label: "Template-4", value: "Template-4" },
    { label: "Template-5", value: "Template-5" }
  ];

  props.template(selected);

  return (
    <Select
      label="Choose Your Template"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}

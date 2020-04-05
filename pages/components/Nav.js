import React, { useCallback, useState } from "react";
import { Card, Tabs } from "@shopify/polaris";

export default function TabsExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    selectedTabIndex => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "home",
      content: "Home",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content"
    },
    {
      id: "stats",
      content: "Statistics",
      panelID: "accepts-marketing-content"
    }
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          <p></p>
        </Card.Section>
      </Tabs>
    </Card>
  );
}

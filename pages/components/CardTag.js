import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Tag, List } from "@shopify/polaris";
import TextFieldTag from "./TextFieldTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import QandA from "./QandA.js";
import { StoreContext } from "../components/Contexts/Context";
import SelectedTemplate from "./TemplateSelectToggle";
import FAQTemplate1, {
  FAQTemplate1JS,
  FAQTemplate1CSS
} from "../Page-Templates/FAQ-Template-1";
import FAQTemplate2, {
  FAQTemplate2CSS,
  FAQTemplate2Redirects
} from "../Page-Templates/FAQ-Template-2";
import GetPages4 from "../Page-Templates/FAQ-Template-4";
import FAQTemplate3, {
  FAQTemplate3JS,
  FAQTemplate3CSS
} from "../Page-Templates/FAQ-Template-3";
//import {GetShopUrl} from './../Page-Templates/GraphQLTest'

export default function CardTag() {
  const [tagValue, setTagValue] = useState("");
  // const [listOfTags, setListOfTags] = useState([]);
  const [isTagButtonClicked, setTagButtonClicked] = useState(0);

  const [userSelectedTemplate, setUserSelectedTemplate] = useState(
    "Template-1"
  );

  let { addTag, tags, removeTag } = useContext(StoreContext);
  tags.map(d => "logging tags: " + tags.id);

  // useEffect(() => {
  //   setListOfTags(oldTagArray => [...oldTagArray, tagValue]);
  // }, [isTagButtonClicked]);

  function handleTemplateChange(templateNumber) {
    setUserSelectedTemplate(templateNumber);
  }

  function handleAddTag() {
    setTagButtonClicked(isTagButtonClicked + 1);
    console.log("tag value: " + tagValue);
    addTag(tagValue);
  }

  function handleRemoveTag(props) {
    removeTag(props);
  }
  function onChangeTagValue(props) {
    setTagValue(props);
  }
  function handleButton() {
    if (userSelectedTemplate === "Template-1") {
      console.log("Tags Being Passed*********************", tags);
      FAQTemplate1(tags);
      FAQTemplate1CSS();
      FAQTemplate1JS();
    } else if (userSelectedTemplate === "Template-2") {
      console.log("Tags Being Passed*********************", tags);
      FAQTemplate2(tags);

      tags.map(
        tag => `
        ${FAQTemplate2Redirects(tag.name, tag.questionIds)}
      `
      );
      FAQTemplate2Redirects(tags);
      FAQTemplate2CSS();
    } else if (userSelectedTemplate === "Template-3") {
      FAQTemplate3(tags);
      FAQTemplate3CSS();
      FAQTemplate3JS();
    } else if (userSelectedTemplate === "Template-4") {
      GetPages4(tags);
    } else {
      //function for posting template 3 here
    }
  }
  return (
    <Card title="Just Fill Out our Form and We will build your FAQ Page">
      <Card.Section title="Create Categories to Group Your Questions Here">
        <div>
          <TextFieldTag onTagChange={onChangeTagValue} />
        </div>

        <br></br>

        <Button primary onClick={handleAddTag}>
          Save
        </Button>
      </Card.Section>

      <Card.Section title="Your categories">
        <div>
          <List type="bullet">
            {tags.map(d => (
              <List.Item key={d.name}>
                {d.name}
                {"      "}
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  onClick={() => handleRemoveTag(d)}
                />
              </List.Item>
            ))}
          </List>
        </div>
      </Card.Section>

      <QandA />

      <Card.Section title="Drag Your Questions from above into the Corresponding Category below"></Card.Section>

      <Card.Section title="Preview Templates">
        <SelectedTemplate template={handleTemplateChange} />
        __________________________
        <br />
        Template Selected: {userSelectedTemplate}
        <br />
        __________________________
      </Card.Section>

      <Card.Section title="testing">
        <Button onClick={handleButton}>Save Questions</Button>
        {/* <GetPages /> */}
        {/* <GetShopUrl/> */}
      </Card.Section>
    </Card>
  );
}

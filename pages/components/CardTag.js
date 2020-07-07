import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Tag, List } from "@shopify/polaris";
import TextFieldTag from "./TextFieldTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import QandA from "./QandA.js";
import { StoreContext } from "../components/Contexts/Context";
import SelectedTemplate from "./TemplateSelectToggle";
import { GetPages } from "../Page-Templates/FAQ-Template-1";
import { GetPages2 } from "../Page-Templates/FAQ-Template-2";
import GetPages4 from "../Page-Templates/FAQ-Template-4";
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
      //function for posting template 1 here
    } else if (userSelectedTemplate === "Template-2") {
      //function for posting template 2 here
      console.log("Option 2 would run");
    } else if (userSelectedTemplate === "Template-3") {
      //function for posting template 3 here
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

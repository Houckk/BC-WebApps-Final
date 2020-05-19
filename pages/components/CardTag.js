import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Tag, List } from "@shopify/polaris";
import TextFieldTag from "./TextFieldTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import QandA from "./QandA.js";
import { StoreContext } from "../components/Contexts/Context";
import { GetPages } from "../Page-Templates/FAQ-Template-1";
//import {GetShopUrl} from './../Page-Templates/GraphQLTest'

export default function CardTag() {
  const [tagValue, setTagValue] = useState("");
  // const [listOfTags, setListOfTags] = useState([]);
  const [isTagButtonClicked, setTagButtonClicked] = useState(0);

  let { addTag, tags, removeTag } = useContext(StoreContext);
  tags.map(d => "logging tags: " + tags.id);

  // useEffect(() => {
  //   setListOfTags(oldTagArray => [...oldTagArray, tagValue]);
  // }, [isTagButtonClicked]);

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

      <Card.Section title="testing">
        <GetPages />
        {/* <GetShopUrl/> */}
      </Card.Section>
    </Card>
  );
}

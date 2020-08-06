import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Tag, List } from "@shopify/polaris";
import TextFieldTag from "./TextFieldTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import QandA from "./QandA.js";
import { StoreContext } from "../components/Contexts/Context";
import DropZoneWithImageFileUpload from "./ImageUpload";
import SelectedTemplate from "./TemplateSelectToggle";
import FAQTemplate1, {
  FAQTemplate1JS,
  FAQTemplate1CSS
} from "../Page-Templates/FAQ-Template-1";
import FAQTemplate2, {
  FAQTemplate2CSS,
  FAQTemplate2Redirects
} from "../Page-Templates/FAQ-Template-2";
import FAQTemplate4JS, {
  FAQTemplate4CSS
} from "../Page-Templates/FAQ-Template-4";
import FAQTemplate5JS, {
  FAQTemplate5CSS
} from "../Page-Templates/FAQ-Template-5";
import FAQTemplate3, {
  FAQTemplate3JS,
  FAQTemplate3CSS,
  FAQTemplate3Pictures
} from "../Page-Templates/FAQ-Template-3";
//import {GetShopUrl} from './../Page-Templates/GraphQLTest'

export default function CardTag() {
  const [tagValue, setTagValue] = useState("");
  // const [listOfTags, setListOfTags] = useState([]);
  const [isTagButtonClicked, setTagButtonClicked] = useState(0);

  const [userSelectedTemplate, setUserSelectedTemplate] = useState(
    "Template-1"
  );
  const [provideUserMessage, setProvideUserMessage] = useState(
    userSelectedTemplate + " does not allow image uploads"
  );
  const [photoUrls, setPhotoUrls] = useState([]);
  const [photoTypes, setPhotoTypes] = useState([]);

  let { setTags, tags, removeTag, currentUser, questions, addTag } = useContext(
    StoreContext
  );
  tags.map(d => "logging tags: " + tags.id);

  // useEffect(() => {
  //   setListOfTags(oldTagArray => [...oldTagArray, tagValue]);
  // }, [isTagButtonClicked]);

  function handlePhotoUrls(photos, types) {
    setPhotoUrls(photos);
    setPhotoTypes(types);
  }

  function handleTemplateChange(templateNumber) {
    setUserSelectedTemplate(templateNumber);
    if (templateNumber === "Template-3") {
      setProvideUserMessage(
        "Please provide at least two photos for your website's faq page. To ensure best results, please use photos with a minimum height of 250 pixels."
      );
    } else {
      setProvideUserMessage(
        userSelectedTemplate + " does not allow image uploads"
      );
    }
  }

  function handleAddTag() {
    setTagButtonClicked(isTagButtonClicked + 1);
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
      FAQTemplate1(tags);
      FAQTemplate1CSS();
      FAQTemplate1JS();
    } else if (userSelectedTemplate === "Template-2") {
      FAQTemplate2(tags);

      for (var i = 0; i < tags.length; i++) {
        FAQTemplate2Redirects(tags[i]);
      }

      FAQTemplate2CSS();
    } else if (userSelectedTemplate === "Template-3") {
      FAQTemplate3(tags, photoUrls, photoTypes);
      FAQTemplate3CSS();
      FAQTemplate3JS();
      for (var i = 0; i < photoUrls.length; i++) {
        FAQTemplate3Pictures(photoUrls[i], photoTypes[i]);
      }
    } else if (userSelectedTemplate === "Template-4") {
      FAQTemplate4JS();
      FAQTemplate4CSS();
    } else if (userSelectedTemplate === "Template-5") {
      FAQTemplate5JS();
      FAQTemplate5CSS();
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
        {provideUserMessage}
        <DropZoneWithImageFileUpload
          selectedTemplate={userSelectedTemplate}
          photos={handlePhotoUrls}
          url={photoUrls}
        />
        __________________________
        <br />
        {photoUrls}
      </Card.Section>

      <Card.Section title="testing">
        <Button onClick={handleButton}>Save Questions</Button>
        {/* <GetPages /> */}
        {/* <GetShopUrl/> */}
      </Card.Section>
    </Card>
  );
}

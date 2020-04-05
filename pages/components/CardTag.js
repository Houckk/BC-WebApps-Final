import React, { useState, useEffect }from 'react';
import {Card, Button, Tag, List} from '@shopify/polaris';
import TextFieldTag from './TextFieldTag'
import TextFieldCreateQuestion from './TextFieldCreateQuestion'
import TextFieldCreateAnswer from './TextFieldCreateAnswer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'


export default function CardTag() {

    const [tagValue, setTagValue] = useState('');
    const [listOfTags, setListOfTags] = useState([]);
    const [isTagButtonClicked, setTagButtonClicked] = useState(0)

    useEffect(() => {
        console.log('useEffect has been called!');
        console.log("TagArray1", listOfTags)
        setListOfTags(oldTagArray => [...oldTagArray, tagValue])
        console.log("TagArray2", listOfTags)
        
    },[isTagButtonClicked]);

    function onChangeTagValue(newTag){
        setTagValue(newTag)
        // setTagButtonClicked(true);
    }

    function printClicked(){
        console.log("Save Button Category Clicked")
    }

    function createTagList(){
        setTagButtonClicked(isTagButtonClicked+1)
    }

    function removeTag(props){
        const newArrayTags = listOfTags.filter(tag => tag !== props)
        setListOfTags(newArrayTags)
    }


    return (
        <Card title="Just Fill Out our Form and We will build your FAQ Page">
            
            <Card.Section title="Create Categories to Group Your Questions Here">
                <div>
                    <TextFieldTag
                        onTagChange={onChangeTagValue}
                    />
                </div>

                <br></br>

                <Button primary onClick={createTagList}>
                    Save
                </Button>
            </Card.Section>
            
            <Card.Section title="Your categories">
                <div> 
                    <List type="bullet">
                        {listOfTags.slice(1).map((tagValue,index) => (
                            <List.Item key={index.toString()}>
                                {tagValue}
                                {"      "}
                                <FontAwesomeIcon icon={faTimesCircle} onClick={() => removeTag(tagValue)}/>
                            </List.Item>
                        ))}
                    </List>
                </div>
            </Card.Section>

            <Card.Section title="Create your Questions and Answers Here">
                <TextFieldCreateQuestion/>
                <br></br>
                <TextFieldCreateAnswer/>
                <br></br>
                <Button primary onClick={printClicked}>
                    Save
                </Button>
            </Card.Section>

            <Card.Section title="Your Qustions and Answers">

            </Card.Section>

            <Card.Section title="Drag Your Questions from above into the Corresponding Category below">

            </Card.Section>

            <Card.Section title="testing">

            </Card.Section>
        </Card>
    );
}


import React, { useContext } from "react";
import { Card } from "@shopify/polaris";
import Question from "./Question";
import { Droppable } from "react-beautiful-dnd";
import ListGroup from "react-bootstrap/ListGroup";
import { StoreContext } from "../components/Contexts/Context";

//import styled from "styled-components"

export default function Column(props) {
  let { addQuestion, tags, questionBank, questions } = useContext(StoreContext);
  console.log(props.tagQuestions);

  const corQuestions = questions.filter(
    q => props.tagQuestions.map(d => d.id) == q.id
  );
  console.log(corQuestions);

  return (
    <div>
      <Card.Section title={props.tag}>
        <Droppable droppableId={props.id}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ListGroup>
                {props.tagQuestions.map((question, index) => (
                  <Question
                    key={question.id}
                    question={question}
                    index={index}
                    id={question.id}
                  />
                ))}
              </ListGroup>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card.Section>
    </div>
  );
}

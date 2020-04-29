import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import Question from "./Question";
import { Card } from "@shopify/polaris";
import ListGroup from "react-bootstrap/ListGroup";
import { StoreContext } from "../components/Contexts/Context";

export default function QuestionBank(props) {
  let { questions } = useContext(StoreContext);
  const questionBank = questions.filter(q => q.questionBank == 1);

  const id = "questionBank";
  return (
    <Card.Section title="Your Questions and Answers">
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
            {questionBank.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                index={index}
                id={question.id}
              />
            ))}

            {provided.placeholder}
          </ListGroup>
        )}
      </Droppable>
    </Card.Section>
  );
}

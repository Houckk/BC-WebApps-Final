import TextFieldCreateAnswer from "./TextFieldCreateAnswer";
import TextFieldCreateQuestion from "./TextFieldCreateQuestion";
import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Tag, List } from "@shopify/polaris";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import uniqueId from "./uniqueId";
import QuestionBank from "./QuestionBank";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreContext } from "../components/Contexts/Context";

export default function QandA(props) {
  let {
    addFirstQuestion,
    tags,
    questions,
    questionBank,
    addToQuestionBankAndQuestions,
    addToTagArray,
    removeFromQuestionBank
  } = useContext(StoreContext);

  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [questionObject, setQuestionObject] = useState([]);
  console.log("tags " + tags.map(d => d.name + d.questionIds));
  console.log("Questions" + questions);
  console.log("Question Bank : " + questionBank);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const [firstQuestion] = questions.filter(d => d.id == draggableId);
    const Tag = tags.filter(d => d.id == destination.droppableId);
    console.log(Tag[0]);

    if (Tag[0].questionIds.length == 0) {
      console.log("length = 0");
      addFirstQuestion(firstQuestion, destination.droppableId);
    } else if (source.droppableId != destination.droppableId) {
      console.log("else if");
      const [newQuestion] = questions.filter(d => d.id == draggableId);
      const newQuestions = Tag[0].questionIds.splice(
        destination.index,
        0,
        newQuestion
      );
      console.log(newQuestions);
      if (source.droppableId != "questionBank") {
        tags
          .filter(q => q.id == source.droppableId)[0]
          .questionIds.splice(source.index, 1);
      } else {
        removeFromQuestionBank(newQuestions, destination.droppableId);
      }
    } else {
      console.log("else");
      const sourceItem = Tag[0].questionIds[source.index];
      const destinationItem = Tag[0].questionIds[destination.index];
      Tag[0].questionIds.splice(source.index, 1);
      Tag[0].questionIds.splice(destination.index, 0, sourceItem);
      //addToTagArray(newQuestions,destination.droppableId);
    }
  }

  function onQuestionChange(newQuestion) {
    setQuestion(newQuestion);
  }

  function onAnswerChange(newAnswer) {
    setAnswer(newAnswer);
  }

  function handleSave() {
    const newQuestion = {
      id: question,
      question: question,
      answer: answer
    };
    addToQuestionBankAndQuestions(newQuestion);
  }

  return (
    <Card.Section title="Create your Questions and Answers Here">
      <DragDropContext onDragEnd={onDragEnd}>
        <TextFieldCreateQuestion onQuestionChange={onQuestionChange} />
        <TextFieldCreateAnswer onAnswerChange={onAnswerChange} />
        <br />
        <Button primary onClick={handleSave}>
          Save
        </Button>

        <QuestionBank />

        <Card.Section title="Your categories">
          {tags.map(tag => console.log(tag.questionIds))}
          {tags.map(tag => (
            <Column
              key={tag.id}
              tag={tag.name}
              id={tag.id}
              tagQuestions={tag.questionIds}
            />
          ))}
        </Card.Section>
      </DragDropContext>
      <Button primary onClick={handleDone}>
        Done
      </Button>
    </Card.Section>
  );
}

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
  let { tags, questions, addToQuestions, setResetGlobal } = useContext(
    StoreContext
  );

  const [tempQuestion, setTempQuestion] = useState([]);
  const [tempAnswer, setTempAnswer] = useState([]);

  var today = new Date();
  var time =
    today.getMonth() +
    "-" +
    today.getHours() +
    "-" +
    today.getMinutes() +
    " : " +
    today.getSeconds();

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
    if (source.droppableId != destination.droppableId) {
      console.log("else if");
      const [newQuestion] = questions.filter(d => d.id == draggableId);
      const newQuestions = Tag[0].questionIds.splice(
        destination.index,
        0,
        newQuestion
      );
      if (source.droppableId != "questionBank") {
        tags
          .filter(q => q.id == source.droppableId)[0]
          .questionIds.splice(source.index, 1);
        setResetGlobal(time);
      } else {
        questions
          .filter(q => q.id == draggableId)[0]
          .questionBank.splice(0, 1, 0);
        setResetGlobal(time);
      }
    } else {
      if (source.droppableId == "questionBank") {
        console.log("incoming from question bank");

        questions
          .filter(q => q.id == draggableId)[0]
          .questionBank.splice(0, 1, 0);
        setResetGlobal(time);
      }
      const sourceItem = Tag[0].questionIds[source.index];
      const destinationItem = Tag[0].questionIds[destination.index];
      Tag[0].questionIds.splice(source.index, 1);
      Tag[0].questionIds.splice(destination.index, 0, sourceItem);
      setResetGlobal(time);
    }
  }

  function onQuestionChange(newQuestion) {
    setTempQuestion(newQuestion);
  }

  function onAnswerChange(newAnswer) {
    setTempAnswer(newAnswer);
  }

  function handleSave() {
    const newQuestion = {
      id: tempQuestion,
      question: tempQuestion,
      answer: tempAnswer,
      questionBank: [1]
    };
    addToQuestions(newQuestion);
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
      {/* <Button onClick = {pushData}>
        Done
      </Button> */}
    </Card.Section>
  );
}

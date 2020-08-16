// will eventually pull questions from the data store
// import InitialData form "./InitialData"
import React from "react";
import Column from "./Column";

export default function Drag() {
  return initialData.columnOrder.map(columnId => {
    const column = initialData.columns.filter(column => column.id === columnId);
    const questions = initialData.questions.filter(
      question => question.id === column.id
    );

    <Column key={column.id} column={column} questions={questions} />;
  });
}

const initialData = {
  questions: [
    { id: 1, content: "question 1" },
    { id: 2, content: "question 1" },
    { id: 3, content: "question 1" },
    { id: 4, content: "question 1" }
  ],
  columns: [
    {
      id: "column1",
      title: "tag1",
      questionIds: [1, 2]
    },
    {
      id: "column2",
      title: "tag2",
      questionIds: [3, 4]
    }
  ],
  columnOrder: ["column1", "column2"]
};

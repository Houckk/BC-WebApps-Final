import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ListGroup from "react-bootstrap/ListGroup";

export default function Question(props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ListGroup.Item>
            {props.question.question}
            <br></br>
            {props.question.answer}
          </ListGroup.Item>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

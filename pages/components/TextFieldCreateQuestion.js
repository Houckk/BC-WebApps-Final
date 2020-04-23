import React, {useCallback, useState} from 'react';
import {TextField} from '@shopify/polaris';



export default function TextFieldCreateQuestion(props) {
  const [value, setValue] = useState("");
  const handleChange = useCallback(newValue => setValue(newValue), []);
  props.onQuestionChange(value);

  function clear() {
    setValue("");
  }

  return (
    <TextField
      value={value}
      onChange={handleChange}
      label="Question"
      clearButton={true}
      onClearButtonClick={clear}
      placeholder={"Type your question here"}
    />
  );
}

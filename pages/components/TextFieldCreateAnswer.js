import React, {useCallback, useState} from 'react';
import {TextField} from '@shopify/polaris';



export default function TextFieldCreateAnswer(props) {
  const [value, setValue] = useState("");
  const handleChange = useCallback(newValue => setValue(newValue), []);
  props.onAnswerChange(value);

  function clearClicked(){
    setValue('')
  }

  return <TextField value={value} onChange={handleChange} label="Answer" clearButton={true} onClearButtonClick={clearClicked} placeholder={'Type your answer here'}/>;
}

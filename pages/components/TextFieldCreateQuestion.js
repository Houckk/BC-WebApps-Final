import React, {useCallback, useState} from 'react';
import {TextField} from '@shopify/polaris';



export default function TextFieldCreateQuestion() {
  const [value, setValue] = useState('');
  const handleChange = useCallback((newValue) => setValue(newValue), []);

  function clearClicked(){
    setValue('')
  }


  return <TextField value={value} onChange={handleChange} label="Question" clearButton={true} onClearButtonClick={clearClicked} placeholder={'Type your question here'}/>;
}

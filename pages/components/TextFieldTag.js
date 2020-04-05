import React, {useCallback, useState} from 'react';
import {TextField} from '@shopify/polaris';



export default function TextFieldTag(props) {
  const [value, setValue] = useState('');
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  props.onTagChange(value);

  function clearClicked(){
    setValue('')
  }


  return <TextField value={value} onChange={handleChange} clearButton={true} onClearButtonClick={clearClicked} placeholder={'Shipping, Returns, Etc'}/>;
}

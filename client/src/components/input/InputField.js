import React from 'react';

import Input from './Input';
import FormItem from '../form/FormItem';

const InputField = props => (
  <FormItem
    label={props.label}
    name={props.name}
    rules={props.rules}
    key={props.key}
  >
    <Input {...props} />
  </FormItem>
);

export default InputField;

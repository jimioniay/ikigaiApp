import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

const FormItem = ({ label, name, rules, children, id }) => (
  <Form.Item label={label} name={name} rules={rules} key={id}>
    {children}
  </Form.Item>
);

FormItem.defaultProps = {
  label: 'Username',
  name: 'username',
  rules: [{ required: true, message: 'Please input your username!' }],
  children: <div />,
};

FormItem.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  rules: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default FormItem;

import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

const CustomForm = ({
  layout,
  name,
  initialValues,
  onFinish,
  onFinishFailed,
  children,
}) => (
  <Form
    {...layout}
    name={name}
    initialValues={initialValues}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    {children}
  </Form>
);

CustomForm.defaultProps = {
  layout: {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  },
  name: 'basic',
  initialValues: { remember: true },
  onFinish: () => {},
  onFinishFailed: () => {},
  children: <div />,
};

CustomForm.propTypes = {
  layout: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
  name: PropTypes.string,
  initialValues: PropTypes.any,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CustomForm;

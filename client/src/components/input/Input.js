import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const CustomInput = ({
  size,
  className,
  placeholder,
  disabled,
  id,
  maxLength,
  type,
  value,
  defaultValue,
  initialValues,
  onChange,
  onPressEnter,
  allowClear,
  setValue,
}) => (
  <div className={className}>
    <Input
      size={size}
      placeholder={placeholder}
      id={id}
      maxLength={maxLength}
      type={type}
      value={defaultValue || value}
      defaultValue={defaultValue}
      initialValues={initialValues}
      onChange={onChange}
      onPressEnter={onPressEnter}
      allowClear={allowClear}
      prefix={''}
      disabled={disabled}
      setValue={setValue}
    />
  </div>
);

CustomInput.defaultProps = {
  size: 'large',
  placeholder: 'placeholder',
  className: 'input',
  id: '',
  maxLength: 10000000000000000,
  type: 'input',
  value: '',
  onChange: () => {},
  onPressEnter: () => {},
  setValue: () => {},
  allowClear: true,
  disabled: false,
};

CustomInput.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
};
export default CustomInput;

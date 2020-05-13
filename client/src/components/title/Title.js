import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title } = Typography;

const CustomTitle = ({ level, text }) => <Title level={level}>{text}</Title>;

CustomTitle.defaultProps = {
  level: 1,
  text: 'Sample Title',
};

CustomTitle.propTypes = {
  level: PropTypes.number,
  text: PropTypes.string,
};

export default CustomTitle;

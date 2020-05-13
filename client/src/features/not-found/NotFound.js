import React from 'react';
import { StopOutlined } from '@ant-design/icons';

import Container from '../../components/container';
import Title from '../../components/title';

import './style.css';

const NotFound = () => (
  <Container>
    <div className="flex flex-direction-column align-items-center svg">
      <StopOutlined />
      <Title level={2} text="404" />
      <span>Oops! Page Not Found</span>
    </div>
  </Container>
);

export default NotFound;

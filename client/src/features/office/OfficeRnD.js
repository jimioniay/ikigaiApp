import React, { Fragment } from 'react';
import Container from '../../components/container';
import Title from '../../components/title';

import { level, text } from './title.json';

const OfficeRnD = () => {
  return (
    <Container>
      <div className="flex flex-direction-column align-items-center svg">
        <Title level={level} text={text} />
        <Fragment>Transaction Completed</Fragment>
      </div>
    </Container>
  );
};

export default OfficeRnD;

import React, { Fragment } from 'react';
import { CheckOutlined, WarningOutlined } from '@ant-design/icons';

import Counter from './Counter';

const Status = ({ status, response, txref }) => {
  const renderStatus = () => {
    if (status) {
      return (
        <div className="flex flex-direction-column align-items-center svg">
          <CheckOutlined />
          <span>{response}</span>
          <Counter txref={txref} />
        </div>
      );
    }
    if (!status) {
      return (
        <div className="flex flex-direction-column align-items-center svg">
          <WarningOutlined />
          <span>{response}</span>
          <Counter txref={txref} />
        </div>
      );
    }
  };
  return renderStatus();
};

export default Status;

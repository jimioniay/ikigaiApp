import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { notification } from 'antd';

const CustomAlert = ({ status, message, type }) => {
  let init = 0;
  useEffect(() => {
    init += 1;
  });
  const checkState = () => {
    return init === 1 ? true : false;
  };
  const renderAlert = () => {
    return status && checkState ? (
      <Fragment>
        {notification[type]({
          message: type,
          description: message,
        })}
      </Fragment>
    ) : null;
  };
  // return renderAlert();
  return null;
};

CustomAlert.defaultProps = {
  status: false,
  message: '',
  type: 'success',
  onClose: () => {},
};

CustomAlert.propTypes = {
  alert: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func,
};

export default CustomAlert;

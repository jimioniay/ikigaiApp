import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Spinner = ({ status }) => (
  <Fragment>
    {status && <Spin indicator={antIcon} size={'large'} className="white" />}
  </Fragment>
);

Spinner.defaultProps = {
  status: false,
};

Spinner.propTypes = {
  status: PropTypes.bool,
};
export default Spinner;

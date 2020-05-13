import React from 'react';
import { withRouter } from 'react-router-dom';

import Confirm from './Confirm';

const index = props => <Confirm {...props} />;
export default withRouter(index);

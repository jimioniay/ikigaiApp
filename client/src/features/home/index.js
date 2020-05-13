import React from 'react';
import { withRouter } from 'react-router-dom';

import Home from './Home';

const index = props => <Home {...props} />;
export default withRouter(index);

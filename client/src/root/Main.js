import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../features/home';
import Pay from '../features/pay';
import Confirm from '../features/confirm';
import OfficeRnD from '../features/office';
import NotFound from '../features/not-found';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/pay" component={Pay} />
    <Route exact path="/confirm/:id" component={Confirm} />
    <Route exact path="/officeRnD" component={OfficeRnD} />
    <Route component={NotFound} />
  </Switch>
);
export default Main;

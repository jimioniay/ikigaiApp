import 'babel-polyfill'; // eslint-disable-line

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Main from './Main';

import '../App.css';

const App = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
export default App;

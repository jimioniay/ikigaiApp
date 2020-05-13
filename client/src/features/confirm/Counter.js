import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import utils from '../../utils';

const {
  api: { officeRnDURL },
} = utils;

const Counter = ({ txref, history: { push } }) => {
  const [counter, setCounter] = useState(
    process.env.REACT_APP_REDIRECT_COUNTER,
  );
  const [error, setError] = useState('');

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      console.log('Count down done!');
      fetchOfficeRnDURL();
    }
  }, [counter]);

  const fetchOfficeRnDURL = async () => {
    const response = await officeRnDURL(txref);
    console.log(response);
    if (response.status) {
      console.log('got here');
      response.data.url.includes('127.0.0.1')
        ? push('/officeRnD')
        : window.location.assign(response.data.url);
    } else {
      setError(response.message);
    }
  };
  const renderCounter = () =>
    error ? (
      <span>{`This error occured while redirecting: ${error}`}</span>
    ) : (
      <span>{`Redirecting in ${counter} seconds...`}</span>
    );

  return renderCounter();
};
export default withRouter(Counter);

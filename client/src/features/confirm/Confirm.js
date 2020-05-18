import React, { useState, useEffect } from 'react';

import Container from '../../components/container';
import SyncOutlined from '../../components/sync';
import Status from './Status';
import './style.css';

import util from '../../utils';
const {
  api: { confirmPayment },
} = util;

const Confirm = ({
  match: {
    params: { id: txref },
  },
}) => {
  const [state, setState] = useState({
    status: false,
    loading: true,
    data: {},
    error: '',
  });
  useEffect(() => {
    let isCurrent = true;
    if (txref) {
      isCurrent ? confirm(txref) : (isCurrent = false);
    }
  }, [txref]);

  const confirm = async txref => {
    const response = await confirmPayment(txref);
    if (response.status) {
      setState({
        ...state,
        status: true,
        loading: false,
        data: response.data.data,
      });
    } else {
      setState({
        status: false,
        loading: false,
        error: response.message || 'An error occured',
      });
    }
  };

  const { error, loading, data, status } = state;
  let response;
  if (status) {
    response = data.responseMessage;
  } else {
    response = error;
  }

  return (
    <Container>
      {loading ? (
        <div className="flex justify-content-center align-items-center">
          <div className="flex flex-direction-column align-items-center svg">
            <SyncOutlined />
            <span>Checking Status...</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-content-center align-items-center svg">
          <Status status={status} response={response} txref={txref} />
        </div>
      )}
    </Container>
  );
};

export default Confirm;

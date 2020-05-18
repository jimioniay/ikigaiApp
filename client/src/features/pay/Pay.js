import React, { Fragment, useState, useEffect } from 'react';
import ip from 'ip';
import Container from '../../components/container';
import Form from '../../components/form';
import Title from '../../components/title';
import Input from '../../components/input';
import Button from '../../components/button';

import { level, text } from './title.json';
import InputFieldData from './input.json';

import util from '../../utils';

const {
  api: { initiatePayment, generatePaymentURL },
  getQueryParams,
  decodeToken,
  AuthService,
} = util;

const Pay = ({ history: { push }, location: { search } }) => {
  const [data, setData] = useState({
    transactionId: '',
    amount: '',
    reference: '',
    redirectUrl: '',
    ip: '',
  });
  const [spinner, setSpinner] = useState(false);
  const [notification, setNotification] = useState({
    status: false,
    error: false,
    message: '',
  });
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    productName: '',
    amount: '',
  });
  useEffect(() => {
    search ? processRequest() : push('/');
  }, [search]);

  const notify = (status, error, message) => ({
    status,
    error,
    message,
  });
  const processRequest = async () => {
    const queryParams = await getQueryParams(search);
    if (queryParams.status !== false) {
      setNotification(notify(true, false, 'Query params succesfully resovled'));
      submitQueryParams(queryParams);
    } else {
      setNotification(
        notify(true, true, 'An error occured while resolving query parameters'),
      );
    }
  };

  const submitQueryParams = async data => {
    setSpinner(false);
    try {
      const response = await initiatePayment(data);
      const { status, message, data: tokenData } = decodeToken(response.token);
      if (status) {
        AuthService.saveToken(response.token);
        setData({
          ip: ip.address(),
          ...tokenData,
        });
      } else {
        setNotification(
          notify(true, true, 'An error occured while decoding token'),
        );
      }
      setSpinner(false);
    } catch (error) {
      setNotification(
        notify(true, true, 'An error occured while parsing parameters'),
      );
    }
  };

  const handleChange = event => {
    const { value } = event.target;
    let name = event.target.id.split('_')[1];
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const displayInputFields = () => {
    return InputFieldData.map(field => (
      <Fragment key={field.id}>
        <div key={field.id}>
          <Input
            key={field.id}
            label={field.label}
            name={field.name}
            rules={field.rules}
            size={field.size}
            className={field.className}
            placeholder={field.placeholder}
            type={field.type}
            disabled={field.id === '5' ? true : false}
            value={field.id === '5' ? data.amount : form[field.name]}
            defaultValue={field.id === '5' && data.amount}
            setValue={value =>
              setForm({
                ...form,
                [field.name]: value,
              })
            }
            onChange={handleChange}
          />
        </div>
      </Fragment>
    ));
  };

  const onFinish = data => {
    console.log(data);
  };

  const onFinishFailed = data => {
    console.log(data);
  };

  const onSubmit = data => {
    console.log(data);
  };

  const handleClick = async e => {
    e.preventDefault();
    setSpinner(true);
    const resp = await generatePaymentURL(data, form);
    setSpinner(false);
    window.location.assign(resp);
  };

  return (
    <Container
      spinner={spinner}
      alert={{
        status: notification.status,
        message: notification.message,
        type: notification.error ? 'error' : 'success',
      }}
    >
      <Fragment>
        <div className="container">
          <div className="flex justify-content-center">
            <Title level={level} text={text} />
          </div>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {displayInputFields()}
            <div className="flex justify-content-center">
              <Button onClick={handleClick} disabled={spinner} size="large">
                Pay with Flutterwave
              </Button>
            </div>
          </Form>
        </div>
      </Fragment>
    </Container>
  );
};

export default Pay;

import React, { Fragment, useState, useEffect } from 'react';

import Container from '../../components/container';
import Form from '../../components/form';
import Title from '../../components/title';
import Input from '../../components/input';
import Button from '../../components/button';

import { level, text } from './title.json';
import InputFieldData from './input.json';
import { SecurityScanTwoTone } from '@ant-design/icons';
import input from './input.json';

const Home = ({ history: { push } }) => {
  const [form, setForm] = useState({
    tId: '',
    ref: '',
    amount: '',
    signature:
      '617b0b7d29e57db460208904f0e64c11092872d86faf581598c3ba9b8b0e00ae',
  });
  let obj = {};
  useEffect(() => {
    for (let i = 0; i < input.length; i++) {
      obj = {
        ...obj,
        [input[i].name]: input[i].defaultValue,
      };
    }
    setForm({
      ...form,
      ...obj,
    });
  }, [input]);
  const [spinner, setSpinner] = useState(false);
  const handleChange = event => {
    const { name, value, checked, type } = event.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  console.log(form);
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
            disabled={true}
            defaultValue={field.defaultValue}
            initialValues={form[field.name]}
            setValue={(form[field.name], callback => console.log(callback))}
            value={field.defaultValue}
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

  const handleClick = async e => {
    const { tId, ref, amount, signature } = form;
    e.preventDefault();
    push(
      `/pay?transactionId=${tId}&reference=${ref}&amount=${amount}&signature=${signature}&redirectUrl=http://localhost:3000/officeRnD`,
    );
  };

  const handleSetValue = field => form[field];
  return (
    <Container spinner={spinner}>
      <Fragment>
        <div className="container">
          <div className="flex justify-content-center">
            <Title level={level} text={text} />
          </div>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {displayInputFields()}
            <div className="flex justify-content-center">
              <Button onClick={handleClick} disabled={spinner}>
                Submit Office RnD
              </Button>
            </div>
          </Form>
        </div>
      </Fragment>
    </Container>
  );
};

export default Home;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Layout from '../layout';
import Header from '../header';
import Footer from '../footer';
import Content from '../content';
import Spinner from '../spinner';
import Alert from '../alert';

const Container = ({ hederText, children, spinner, alert }) => {
  return (
    <Layout>
      <Alert {...alert} />
      <Header>
        <Link to="/">
          <span className="float-left">
            <img
              src="https://ikigai.co.ke/static/assan/custom/img/logo.93882014883e.png"
              alt="IKIGAI"
            />
          </span>
        </Link>
        <span className="float-right">
          <Spinner status={spinner} />
        </span>
        <div className="flex justify-content-center">{hederText}</div>
      </Header>
      <Content className="content">{children}</Content>
      <Footer>
        <span className="flex justify-content-center">Ikigai @ 2020</span>
      </Footer>
    </Layout>
  );
};

Container.defaultProps = {
  hederText: 'Ikigai Membership Payments',
  children: <div />,
  spinner: false,
};
Container.propTypes = {
  hederText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  spinner: PropTypes.bool,
};

export default Container;

import React from 'react';

import { PageHeader } from 'antd';

const CustomPageHeader = () => (
  <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Title"
    subTitle="This is a subtitle"
  />
);

export default CustomPageHeader;

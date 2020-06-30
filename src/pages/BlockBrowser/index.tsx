import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default function BlockBrowser(props: any) {
  return (
    <PageHeaderWrapper>
      <div>{props.children}</div>
    </PageHeaderWrapper>
  );
}

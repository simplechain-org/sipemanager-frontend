import React, { useEffect } from 'react';
import request from '@/utils/request';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default function ChainList() {
  useEffect(() => {
    async function aaa() {
      const res = await request('/api/v1/wallet/list');
      console.log(res);
    }
    aaa();
  }, []);

  return (
    <PageHeaderWrapper>
      <div>55552</div>
    </PageHeaderWrapper>
  );
}

import React from 'react';
// import { Button } from 'antd';
import './index.less';

interface PropsType {
  // btnTitle: string,
  children: any;
}

export default function Card(props: PropsType) {
  return (
    <div className="card">
      {/* <Button>{props.btnTitle}</Button> */}
      {props.children}
    </div>
  );
}

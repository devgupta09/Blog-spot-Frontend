import React from "react";
import { Spin } from "antd";
import "../../styles/style.scss";

const Loader = (props) => {
  const { children, isLoading } = props;

  return (
    <Spin
      className="loader"
      tip="Please wait..."
      size="large"
      spinning={isLoading}
    >
      {children}
    </Spin>
  );
};

export default Loader;

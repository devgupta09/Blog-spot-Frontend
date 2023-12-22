import { Spin } from "antd";
import "./style.scss";

const Loader = (props) => {
  const { children, isLoading } = props;

  return (
    <Spin className="loader" tip="Loading..." size="large" spinning={isLoading}>
      {children}
    </Spin>
  );
};

export default Loader;

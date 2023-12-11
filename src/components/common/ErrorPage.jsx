import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";


const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/allBlogs");
  };

  return (
    <Result
      status="404"
      title="Invalid Page"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={goHome}>
          Back to Dashboard
        </Button>
      }
      style={{ minHeight: "85vh" }}
    />
  );
};

export default React.memo(ErrorPage);

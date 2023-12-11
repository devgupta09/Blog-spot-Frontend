import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import "./style.scss";

const NoBlogsAvailable = () => {
  const navigate = useNavigate();

  return (
    <div className="no-blogs">
      <Result
        title="No Blogs Available"
        subTitle="Sorry, there are no blogs to display at the moment."
        extra={
          <Button type="primary" onClick={() => navigate("/addBlog")}>
            Add New Blog
          </Button>
        }
      />
    </div>
  );
};

export default React.memo(NoBlogsAvailable);

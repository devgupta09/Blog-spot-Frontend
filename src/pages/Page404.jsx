import { Result } from "antd";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/style.scss";

const Page404 = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/allBlogs");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="submit" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default Page404;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Tooltip } from "antd";
import NoBlogsAvailable from "./NoBlogsAvailable";
import DeleteModal from "./DeleteModal";
import Notification from "../common/Notification";
import Loader from "../common/Loader";
import http from "../../http";
import "./style.scss";

const MyBlogs = () => {
  const [deleteId, setDeleteId] = useState();
  const [blogList, setBlogList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOk = async () => {
    setModalOpen(false);
    await http()
      .delete(`/deleteBlog/${deleteId}`)
      .then(() => {
        Notification.success("Blog deleted Successfully!");
        navigate("/myBlogs");
      })
      .catch(() => {
        Notification.error("Failed to Delete Blog!");
      });
  };

  const handleParaLength = (index, maxlength = 200) => {
    let temp = [...blogList];
    temp[index].maxLength = maxlength;
    setBlogList([...temp]);
  };

  const handleGetMyBlogs = async () => {
    await http()
      .get("/getMyBlogs")
      .then((res) => {
        setBlogList(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        Notification.error("Failed to fetching Blogs!");
      });
  };

  useEffect(() => {
    handleGetMyBlogs();
  }, []);

  if (blogList && !blogList.length) {
    return <NoBlogsAvailable />;
  }

  return (
    <Loader isLoading={isLoading}>
      <div
        className="d-flex mx-4 my-4"
        style={{ gap: "20px", flexWrap: "wrap" }}
      >
        {blogList?.map((blog, index) => {
          return (
            <Card hoverable key={index}>
              <div style={{ float: "right" }}>
                <Tooltip placement="bottom" title="Edit">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: "20px" }}
                    onClick={() => navigate(`/editBlog/${blog._id}`)}
                  >
                    edit_square
                  </span>
                </Tooltip>
                <Tooltip placement="bottom" title="Delete">
                  <span
                    className="material-symbols-outlined text-danger"
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      setDeleteId(blog._id);
                      setModalOpen(true);
                    }}
                  >
                    delete
                  </span>
                </Tooltip>
              </div>
              <h4
                className="text-center"
                style={{ textTransform: "capitalize" }}
              >
                {blog.title}
              </h4>
              <div
                style={{
                  height: "70%",
                  overflowX: "auto",
                }}
              >
                <p id={`para-${index}`} style={{ wordBreak: "break-word" }}>
                  {blog.description.slice(0, blog.maxLength)}
                  {blog.description.length > 200 &&
                    (blog.maxLength == blog.description.length ? (
                      <Link
                        style={{ textDecoration: "none" }}
                        onClick={() => handleParaLength(index)}
                      >
                        ...See less
                      </Link>
                    ) : (
                      <Link
                        style={{ textDecoration: "none" }}
                        onClick={() =>
                          handleParaLength(index, blog.description.length)
                        }
                      >
                        ...See More
                      </Link>
                    ))}
                </p>
              </div>
              <div
                className="text-secondary"
                style={{ float: "right", fontWeight: "500" }}
              >
                ~{blog.author}
              </div>
            </Card>
          );
        })}
        <DeleteModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleOk={handleOk}
        />
      </div>
    </Loader>
  );
};

export default MyBlogs;

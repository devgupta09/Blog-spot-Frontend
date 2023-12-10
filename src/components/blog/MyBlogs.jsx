import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useNavigate } from "react-router-dom";
import { Card, Modal, Tooltip } from "antd";
import { AiFillExclamationCircle } from "react-icons/ai";
import Notification from "../common/Notification";

const MyBlogs = () => {
  const allBlogs = useStoreState((state) => state.blog.blogs);
  const getMyBlogs = useStoreActions((action) => action.blog.getMyBlogs);
  const deleteBlog = useStoreActions((action) => action.blog.deleteBlog);
  const [deleteId, setDeleteId] = useState();
  const [blogList, setBlogList] = useState(allBlogs);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    setModalOpen(false);
    try {
      deleteBlog({ id: deleteId })
        .then(() => {
          Notification.success("Blog deleted Successfully!");
          navigate("/myBlogs");
        })
        .catch(() => {
          Notification.error("Failed to Delete Blog!");
        });
    } catch (err) {
      Notification.warning("Error occured while Deleting Blog!");
    }
  };

  const handleParaLength = (index, maxlength = 280) => {
    let temp = [...blogList];
    temp[index].maxLength = maxlength;
    setBlogList([...temp]);
  };

  useEffect(() => {
    try {
      getMyBlogs()
        .then((res) => {
          setBlogList(res);
        })
        .catch((err) => {
          console.error("Error while fetching blogs!", err);
        });
    } catch (err) {
      Notification.error("Error while fetching Blogs!");
    }
  }, []);

  return (
    <div className="d-flex mx-4 my-4" style={{ gap: "20px", flexWrap: "wrap" }}>
      <Modal
        title={
          <span style={{ color: "red" }}>
            <AiFillExclamationCircle size={25} style={{ color: "#faad14" }} />
            {` Delete !`}
          </span>
        }
        style={{
          top: "20vh",
          height: "400px",
        }}
        open={modalOpen}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        Do you want to delete this blog?
      </Modal>
      {blogList.length ? (
        blogList.map((blog, index) => {
          return (
            <Card
              hoverable
              style={{
                width: "32%",
                // height: "270px",
              }}
              key={index}
            >
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
                  minHeight: "75%",
                }}
              >
                <p className="card-desc" id={`para-${index}`}>
                  {blog.description.slice(0, blog.maxLength)}
                  {blog.description.length > 280 &&
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
        })
      ) : (
        <div>No blogs</div>
      )}
    </div>
  );
};

export default MyBlogs;

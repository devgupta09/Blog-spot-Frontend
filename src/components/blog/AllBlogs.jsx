import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import { Card } from "antd";
import NoBlogsAvailable from "./NoBlogsAvailable";
import Notification from "../common/Notification";
import "./style.scss";

const AllBlogs = () => {
  const allBlogs = useStoreState((state) => state.blog.blogs);
  const getAllBlogs = useStoreActions((action) => action.blog.getAllBlogs);
  const [blogList, setBlogList] = useState(allBlogs);

  const handleParaLength = (index, maxlength = 280) => {
    let temp = [...blogList];
    temp[index].maxLength = maxlength;
    setBlogList([...temp]);
  };

  const handleGetAllBlogs = async () => {
    try {
      getAllBlogs()
        .then((res) => {
          res.forEach((element, idx, tempArr) => {
            tempArr[idx].maxLength = 280;
          });
          setBlogList(res);
        })
        .catch(() => {
          Notification.error("Failed to fetching Blogs!");
        });
    } catch (err) {
      Notification.warning("Error while fetching Blogs!");
    }
  };

  useEffect(() => {
    handleGetAllBlogs();
  }, []);

  return (
    <div className="d-flex mx-4 my-4" style={{ gap: "20px", flexWrap: "wrap" }}>
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
              <h4
                className="text-center"
                style={{ textTransform: "capitalize" }}
              >
                {blog.title}
              </h4>
              <div
                style={{
                  minHeight: "70%",
                }}
              >
                <p id={`para-${index}`} style={{ wordBreak: "break-word" }}>
                  {blog.description.slice(0, blog.maxLength)}
                  {blog.description.length > 280 &&
                    (blog.maxLength == blog.description.length ? (
                      <Link
                        style={{ textDecoration: "none" }}
                        onClick={() => handleParaLength(index)}
                      >
                        See less
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
        <NoBlogsAvailable />
      )}
    </div>
  );
};

export default React.memo(AllBlogs);

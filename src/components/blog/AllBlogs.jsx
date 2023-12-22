import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import NoBlogsAvailable from "./NoBlogsAvailable";
import Notification from "../common/Notification";
import Loader from "../common/Loader";
import http from "../../http";
import "./style.scss";

const AllBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogList, setBlogList] = useState(null);

  const handleParaLength = (index, maxlength = 250) => {
    let temp = [...blogList];
    temp[index].maxLength = maxlength;
    setBlogList([...temp]);
  };

  const handleGetAllBlogs = async () => {
    await http()
      .get("/getAllBlogs")
      .then((res) => {
        res.data.forEach((element, idx, tempArr) => {
          tempArr[idx].maxLength = 200;
        });
        setBlogList(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        Notification.error("Failed to fetching Blogs!");
      });
  };

  useEffect(() => {
    handleGetAllBlogs();
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
                        {" See less"}
                      </Link>
                    ) : (
                      <Link
                        style={{ textDecoration: "none" }}
                        onClick={() =>
                          handleParaLength(index, blog.description.length)
                        }
                      >
                        {"...See More"}
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
      </div>
    </Loader>
  );
};

export default AllBlogs;

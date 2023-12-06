import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  LiaAngleDoubleLeftSolid,
  LiaAngleDoubleRightSolid,
} from "react-icons/lia";

const AllBlogs = () => {
  const [index, setIndex] = useState(0);
  const [blogList, setBlogList] = useState([]);
  const [blog, setBlog] = useState({});
  const getAllBlogs = useStoreActions((action) => action.blog.getAllBlogs);
  const allBlogs = useStoreState((state) => state.blog.blogs);

  const prevPage = () => {
    if (index > 0) {
      setIndex(index - 1);
      document.getElementById("right").classList.remove("disable-btn");
    }
  };

  const nextPage = () => {
    if (index < blogList.length - 1) {
      setIndex(index + 1);
      document.getElementById("left").classList.remove("disable-btn");
    }
  };

  useEffect(() => {
    setBlogList(allBlogs);
    setBlog(blogList[index]);
  }, [allBlogs]);

  useEffect(() => {
    getAllBlogs()
      .then((res) => {
        console.log("All blogs fetched!", res);
      })
      .catch((err) => {
        console.error("Error while fetching blogs!", err);
      });
  }, []);

  useEffect(() => {
    setBlog(blogList[index]);
    if (index <= 0) {
      document.getElementById("left").classList.add("disable-btn");
      document.getElementById("right").classList.remove("disable-btn");
    } else if (index >= blogList.length - 1) {
      document.getElementById("right").classList.add("disable-btn");
      document.getElementById("left").classList.remove("disable-btn");
    }
  }, [index]);

  return (
    <div className="all-blogs-container">
      <span className="sider" id="left" style={{ left: "10%" }}>
        <LiaAngleDoubleLeftSolid onClick={prevPage} />
      </span>
      <span className="sider" id="right" style={{ right: "10%" }}>
        <LiaAngleDoubleRightSolid onClick={nextPage} />
      </span>
      <div className="blogs-container">
        <div className="blog-content" key={blogList.key}>
          {blog?.title ? (
            <>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <span>{`~ ${blog.author}`}</span>
              <p className="page">{`${index + 1}/${blogList.length}`}</p>
            </>
          ) : (
            <span>No Blogs Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;

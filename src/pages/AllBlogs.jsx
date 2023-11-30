import { useEffect, useState } from "react";
import {
  LiaAngleDoubleLeftSolid,
  LiaAngleDoubleRightSolid,
} from "react-icons/lia";
import "../styles/style.scss";

const AllBlogs = () => {
  const [index, setIndex] = useState(0);
  const [blogList, setBlogList] = useState([]);
  const [blog, setBlog] = useState();

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
          {/* <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <span>{`~ ${blog.author}`}</span>
          <p className="page">{`${blog.id + 1}/${blogList.length}`}</p> */}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;

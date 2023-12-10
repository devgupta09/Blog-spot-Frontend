import { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../common/Notification";

const AddBlog = () => {
  const [validated, setValidated] = useState(false);
  const addNewBlog = useStoreActions((action) => action.blog.addNewBlog);
  const updateBlogDetails = useStoreActions(
    (action) => action.blog.updateBlogDetails
  );
  let { id } = useParams();
  const navigate = useNavigate();
  const getBlogDetails = useStoreActions(
    (action) => action.blog.getBlogDetails
  );
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const addBlog = () => {
    try {
      addNewBlog(data)
        .then(() => {
          Notification.success("Blog Added Successfully!");
          navigate("/allBlogs");
        })
        .catch(() => {
          Notification.error("Failed to Adding Blog!");
        });
    } catch (err) {
      Notification.warning("Error occured while Adding Blog!");
    }
  };

  const updateBlog = () => {
    try {
      updateBlogDetails({id,data})
        .then(() => {
          Notification.success("Blog Updated Successfully!");
          navigate('/myBlogs')
        })
        .catch(() => {
          Notification.error("Failed to Adding Blog!");
        });
    } catch (err) {
      Notification.warning("Error occured while Adding Blog!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.title == "" || data.description == "") {
      setValidated(true);
      return;
    }
    id?updateBlog():addBlog()
  };

  useEffect(() => {
    if (id) {
      try {
        getBlogDetails({ id })
          .then((res) => {
            setData({
              ...data,
              title: res.title,
              description: res.description,
            });
          })
          .catch((err) => console.log(err));
      } catch (err) {}
    } else {
      setData({
        ...data,
        title: "",
        description: "",
      });
    }
  }, [id]);

  return (
    <div className="blog-form-container">
      <div className="blog-container">
        <h2>Add New Blog! </h2>
        <form
          onSubmit={handleSubmit}
          onChange={() => setValidated(false)}
          className={validated ? "was-validated" : ""}
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              placeholder="Enter Title"
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="7"
              placeholder="Start writing your description here..."
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../common/Notification";
import http from "../../http";
import "./style.scss";

const AddBlog = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const addBlog = async () => {
    setIsLoading(true);
    await http()
      .post("/addBlog", data)
      .then(() => {
        Notification.success("Blog Added Successfully!");
        setIsLoading(false);
        navigate("/allBlogs");
      })
      .catch(() => {
        setIsLoading(false);
        Notification.error("Failed to Adding Blog!");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.title == "" || data.description == "") {
      setValidated(true);
      return;
    }
    if (data.title?.length > 20) {
      Notification.warning("Title length should be less than 20 characters");
      return;
    }
    addBlog();
  };

  return (
    <div className="blog-form-container">
      <div className="blog-container">
        <h2>Add New Blog!</h2>
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
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Add Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

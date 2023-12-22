import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../common/Notification";
import Loader from "../common/Loader";
import http from "../../http";
import "./style.scss";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const updateBlog = async () => {
    setIsLoading(true);
    await http()
      .put(`/updateBlog/${id}`, data)
      .then(() => {
        Notification.success("Blog Updated Successfully!");
        setIsLoading(false);
        navigate("/myBlogs");
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
    updateBlog();
  };

  const getBlogDetails = async () => {
    setIsSpinning(true);
    await http()
      .put(`/getBlogDetails/${id}`)
      .then((res) => {
        setData({
          ...data,
          ...res.data,
        });
        setIsSpinning(false);
      })
      .catch(() => {
        setIsSpinning(false);
        Notification.error("Failed to fetching blog details!");
      });
  };

  useEffect(() => {
    getBlogDetails();
  }, []);

  return (
    <Loader isLoading={isSpinning}>
      <div className="blog-form-container">
        <div className="blog-container">
          <h2>Edit Blog!</h2>
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
                "Update Blog"
              )}
            </button>
          </form>
        </div>
      </div>
    </Loader>
  );
};

export default EditBlog;

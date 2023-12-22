import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../common/Notification";
import http from "../../http";
import "./style.scss";

const AddBlog = () => {
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const addBlog = async () => {
    try {
      await http()
        .post("/addBlog", data)
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

  const updateBlog = async () => {
    try {
      await http()
        .put(`/updateBlog/${id}`, data)
        .then(() => {
          Notification.success("Blog Updated Successfully!");
          navigate("/myBlogs");
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
    id ? updateBlog() : addBlog();
  };

  const getBlogDetails = async () => {
    try {
      await http()
        .put(`/getBlogDetails/${id}`)
        .then((res) => {
          setData({
            ...data,
            title: res.data.title,
            description: res.data.description,
          });
        })
        .catch(() => {
          Notification.error("Failed to fetching blog details!");
        });
    } catch {
      Notification.warning("Error occured while fetching blog details!");
    }
  };

  useEffect(() => {
    if (id) {
      getBlogDetails();
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
        <h2>{id ? "Edit Blog!" : "Add New Blog!"}</h2>
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
            {id ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(AddBlog);

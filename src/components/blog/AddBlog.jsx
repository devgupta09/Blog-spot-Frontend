import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const addNewBlog = useStoreActions((action) => action.blog.addNewBlog);
  const [data, setData] = useState({
    author: "",
    title: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.author == "" || data.description == "" || data.author == "") {
      setValidated(true);
      return;
    }
    setValidated(false);
    addNewBlog(data)
      .then((res) => {
        console.log("New blog added Successfully!", res);
        navigate("/allBlogs");
      })
      .catch((err) => {
        console.error("Error while adding new Blog!", err);
      });
  };

  return (
    <div className="blog-container">
      <h2>Add New Blog! </h2>
      <form
        onSubmit={handleSubmit}
        className={validated ? "was-validated" : ""}
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title*
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
          <div className="invalid-feedback">This field is required!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description*
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
          />
          <div className="invalid-feedback">This field is required!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author*
          </label>
          <input
            id="author"
            type="text"
            className="form-control"
            placeholder="Enter author name"
            value={data.author}
            onChange={(e) => setData({ ...data, author: e.target.value })}
            required
          />
          <div className="invalid-feedback">This field is required!</div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;

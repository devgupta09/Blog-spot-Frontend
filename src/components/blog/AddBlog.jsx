import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import "../../styles/style.scss";

const AddBlog = () => {
  const [validated, setValidated] = useState(false);
  const addNewBlog = useStoreActions((action) => action.blog.addNewBlog);
  const navigate = useNavigate();
  const [data, setData] = useState({
    author: "",
    title: "",
    description: "",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (data.author == "" || data.description == "" || data.author == "") {
      return;
    }
    setValidated(true);
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
      <Form validated={validated} onSubmit={handleSubmit} className="form-page">
        <Form.Group as={Col} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            aria-describedby="inputGroupPrepend"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="decription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Enter description..."
            aria-describedby="inputGroupPrepend"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
            style={{ height: "120px" }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            aria-describedby="inputGroupPrepend"
            value={data.author}
            onChange={(e) => setData({ ...data, author: e.target.value })}
            required
          />
        </Form.Group>
        <Button type="submit">SUBMIT</Button>
      </Form>
    </div>
  );
};

export default AddBlog;

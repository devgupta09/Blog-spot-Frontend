import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/style.scss";

const AddBlog = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    navigate("/allBlogs");
  };

  return (
    <div className="blog-container">
      <h2>Add New Blog! </h2>
      <Form
        validated={validated}
        onSubmit={handleSubmit}
        className="form-page"
      >
        <Form.Group as={Col} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            aria-describedby="inputGroupPrepend"
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
            required
            style={{height:"120px"}}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            aria-describedby="inputGroupPrepend"
            required
          />
        </Form.Group>
        <Button type="submit">SUBMIT</Button>
      </Form>
    </div>
  );
};

export default AddBlog;

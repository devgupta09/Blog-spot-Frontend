import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.scss";

const SignUp = () => {
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
    <>
      <h2>Create New Account!</h2>
      <Form
        validated={validated}
        onSubmit={handleSubmit}
        className="form-page"
        style={{ gap: "7%" }}
      >
        <Form.Group as={Col} controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid userName
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="Password" placeholder="Password" required />
        </Form.Group>
        <Form.Group className="link">
          <Form.Label>
            <Link to="/login">Already have an account?</Link>
          </Form.Label>
        </Form.Group>
        <Button type="submit">SIGNUP</Button>
      </Form>
    </>
  );
};

export default SignUp;

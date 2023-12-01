import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.scss";
import { useStoreActions } from "easy-peasy";

const SignUp = () => {
  const createNewAccount = useStoreActions((action) => action.user.signUp);
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (data.email == "" || data.password == "" || data.name == "") {
      return;
    }
    setValidated(true);
    createNewAccount(data)
      .then((res) => {
        console.log("Sign up SuccessFully!", res);
        navigate("/allBlogs");
      })
      .catch((err) => {
        console.error("Sign up Error!", err);
      });
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            aria-describedby="inputGroupPrepend"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
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
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="Password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="link">
          <Form.Label>
            <Link to="/signIn">Already have an account?</Link>
          </Form.Label>
        </Form.Group>
        <Button type="submit">SIGNUP</Button>
      </Form>
    </>
  );
};

export default SignUp;

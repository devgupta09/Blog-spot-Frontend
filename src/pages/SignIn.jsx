import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import "../styles/style.scss";

const SignIn = () => {
  const setToken = useStoreActions((action) => action.user.setToken);
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const host = "http://localhost:8000";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const signIn = (email, password) => {
    var payload = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
    };

    fetch(`${host}/auth/signIn`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/allBlogs");
        setToken(result.authToken);
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (data.email == "" || data.password == "") {
      return;
    }
    console.log(data);
    setValidated(true);
    signIn(data.email, data.password);
  };

  return (
    <>
      <h2>Welcome to Login Page! </h2>
      <Form
        validated={validated}
        onSubmit={handleSubmit}
        className="form-page"
        style={{ gap: "10%" }}
      >
        <Form.Group as={Col} controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid userName
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
        <Form.Group as={Col}>
          <Form.Check
            label="Remember me"
            feedback="You must agree before submitting."
            feedbackType="invalid"
            size="lg"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="link">
          <Form.Label>
            <Link to="/signup">Create new account?</Link>
          </Form.Label>
        </Form.Group>
        <Button type="submit">LOGIN</Button>
      </Form>
    </>
  );
};

export default SignIn;

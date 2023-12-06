import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (email == "") {
      return;
    }
    setValidated(true);
    navigate("/signIn");
  };

  return (
    <div className="form-container">
      <h2>Forget Password!</h2>
      <Form
        validated={validated}
        onSubmit={handleSubmit}
        className="form-page"
        style={{ gap: "7%" }}
      >
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">SUBMIT</Button>
      </Form>
    </div>
  );
};

export default ForgetPassword;

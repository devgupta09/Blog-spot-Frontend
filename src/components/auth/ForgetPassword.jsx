import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../common/Notification";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email == "") {
      setValidated(true);
      return;
    }
    Notification.success("OTP send Successfully!");
    setValidated(false);
    navigate("/signIn");
  };

  return (
    <div className="form-container">
      <h2>Forget Password!</h2>
      <form
        onSubmit={handleSubmit}
        onChange={() => setValidated(false)}
        className={validated ? "was-validated" : ""}
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;

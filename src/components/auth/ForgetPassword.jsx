import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    setValidated(false);
    navigate("/signIn");
  };

  return (
    <div className="form-container">
      <h2>Forget Password!</h2>
      <form
        onSubmit={handleSubmit}
        className={validated ? "was-validated" : ""}
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email*
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
          <div className="invalid-feedback">This field is required!</div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../common/Notification";
import http from "../../http";
import "./style.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const createNewAccount = async () => {
    setIsLoading(true);
    await http()
      .post("auth/signUp", data)
      .then(() => {
        Notification.success("Account Created Successfully!");
        setIsLoading(false);
        navigate("/signIn");
      })
      .catch(() => {
        setIsLoading(false);
        Notification.error("Account creation Failed!");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.email == "" ||
      data.password == "" ||
      data.name == "" ||
      data.confirmPassword == ""
    ) {
      setValidated(true);
      return;
    }
    if (data.password != data.confirmPassword) {
      Notification.error("Password does not matches!");
      return;
    }
    createNewAccount();
  };

  return (
    <div className="form-container" style={{ minWidth: "40%" }}>
      <h2>Create New Account!</h2>
      <form
        onSubmit={handleSubmit}
        onChange={() => setValidated(false)}
        className={validated ? "was-validated" : ""}
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            placeholder="Enter name"
            type="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="form-control"
            id="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            placeholder="Enter email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="form-control"
            id="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            placeholder="Enter password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="form-control"
            id="password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            placeholder="Enter password"
            type="password"
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            className="form-control"
            id="confirmPassword"
            required
          />
        </div>
        <div className="d-flex py-3 flex-column align-items-center">
          <Link to="/signIn">Already have an account?</Link>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp;

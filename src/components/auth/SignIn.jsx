import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../common/Notification";
import http from "../../http";
import "./style.scss";

const SignIn = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const signIn = async () => {
    setIsLoading(true);
    await http()
      .post("auth/signIn", data)
      .then((res) => {
        localStorage.setItem("auth", JSON.stringify(res.data));
        setIsLoading(false);
        navigate("/allBlogs");
      })
      .catch(() => {
        setIsLoading(false);
        Notification.error("Login Failed!");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.email == "" || data.password == "") {
      setValidated(true);
      return;
    }
    signIn();
  };

  return (
    <div className="form-container">
      <h2>Welcome to Login Page! </h2>
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
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="form-control"
            id="password"
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="showPassword"
            value={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label" htmlFor="showPassword">
            Show Password
          </label>
        </div>
        <div
          className="d-flex py-3 flex-column align-items-center"
          style={{ gap: "10px" }}
        >
          <Link to="/signUp">Create new account?</Link>
          <Link to="/forgetPassword">Forget password?</Link>
        </div>
        <button
          type="submit"
          className={`btn btn-primary w-100 ${validated ? "mt-2" : "mt-4"}`}
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignIn;

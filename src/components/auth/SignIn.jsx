import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

const SignIn = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const logIn = useStoreActions((action) => action.user.signIn);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.email == "" || data.password == "") {
      setValidated(true);
      return;
    }
    setValidated(false);
    try {
      logIn(data)
        .then((res) => {
          console.log("Login Successfully!", res);
          navigate("/allBlogs");
        })
        .catch((err) => console.error("Login Error!", err));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome to Login Page! </h2>
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
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="form-control"
            id="email"
            required
          />
          <div className="invalid-feedback">This field is required!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password*
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
          <div className="invalid-feedback">This field is required!</div>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
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
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;

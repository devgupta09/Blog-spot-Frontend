import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

const SignUp = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const createNewAccount = useStoreActions((action) => action.user.signUp);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.email == "" || data.password == "" || data.name == "") {
      setValidated(true);
      return;
    }
    setValidated(false);
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
    <div className="form-container">
      <h2>Create New Account!</h2>
      <form
        onSubmit={handleSubmit}
        className={validated ? "was-validated" : ""}
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name*
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
          <div className="invalid-feedback">This field is required!</div>
        </div>
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
        <div className="d-flex py-3 flex-column align-items-center">
          <Link to="/signIn">Already have an account?</Link>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

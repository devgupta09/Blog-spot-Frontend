import { useEffect, useState } from "react";
import userImage from "../../assets/user-profile-picture.avif";
import Notification from "../common/Notification";
import Loader from "../common/Loader";
import http from "../../http";
import "./style.scss";

const UserDetails = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    totalBlogs: 0,
  });

  const updateUserDetails = async () => {
    setIsLoading(true);
    await http()
      .post("auth/updateUserDetails", data)
      .then(() => {
        Notification.success("Profile Updated Successfully!");
        setIsLoading(false);
        setIsEdit(false);
      })
      .catch(() => {
        setIsLoading(false);
        Notification.error("Failed to Updated Profile!");
      });
  };

  const getUserDetails = async () => {
    setIsSpinning(true);
    await http()
      .get("auth/getUserDetails")
      .then((res) => {
        setData({ ...res.data });
        setIsSpinning(false);
      })
      .catch(() => {
        setIsSpinning(false);
        Notification.error("Failed to fetching User Details!");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserDetails();
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Loader isLoading={isSpinning}>
      <div className="profile-page-container">
        <div className="profile-container">
          <div className="profile-name-container">
            <img
              src={userImage}
              alt=""
              width={150}
              height={150}
              style={{
                borderRadius: "50%",
                border: "3px solid #787778",
                padding: "5px",
              }}
            />
            <h3 className="mt-4 text-center text-secondary">{data.name}</h3>

            <div className="my-5">
              <div className="total-blogs-container">
                Total Blogs Submitted <span>{data.totalBlogs}</span>
              </div>
            </div>
          </div>
          <div style={{ width: "70%" }}>
            {!isEdit && (
              <div
                className="edit-profile-btn"
                onClick={() => setIsEdit(!isEdit)}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  edit_square
                </span>
                Edit Profile
              </div>
            )}
            <form
              className="profile-details-container"
              onSubmit={handleSubmit}
              style={{ margin: "30px 100px" }}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  placeholder="Enter Title"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="form-control"
                  required
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter Title"
                  type="text"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="form-control"
                  required
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  placeholder="Enter password"
                  type="password"
                  value={isEdit ? data.password : "1234567890"}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="form-control"
                  id="password"
                  autoComplete="off"
                  disabled={!isEdit}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder={
                    isEdit
                      ? "Start writing your description here..."
                      : "No description available :("
                  }
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  disabled={!isEdit}
                />
              </div>
              {isEdit && (
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Save changes"
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default UserDetails;

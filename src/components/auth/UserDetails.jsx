import React, { useEffect, useState } from "react";
import userImage from "../../assets/user-profile-picture.avif";
import { useStoreActions } from "easy-peasy";
import Notification from "../common/Notification";

const UserDetails = () => {
  const [isEdit, setIsEdit] = useState(false);
  const updateUserDetails = useStoreActions(
    (action) => action.user.updateUserDetails
  );
  const getUserDetails = useStoreActions(
    (action) => action.user.getUserDetails
  );
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    totalBlogs: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateUserDetails(data)
        .then((res) => {
          Notification.success("Profile Updated Successfully!");
          setIsEdit(false);
        })
        .catch((err) => {
          Notification.error("Failed to Updated Profile!");
        });
    } catch (err) {
      Notification.warning("Error occured while Updating Profile!");
    }
  };

  useEffect(() => {
    try {
      getUserDetails()
        .then((res) => {
          setData({ ...res });
        })
        .catch(() => {
          Notification.error("Failed to fetching User Details!");
        });
    } catch (err) {
      Notification.warning("Error while fetching User Details!");
    }
  }, []);

  return (
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
        <div className=" " style={{ width: "70%" }}>
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
          <form className="profile-details-container" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Name
              </label>
              <input
                id="title"
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
              <label htmlFor="title" className="form-label">
                Email
              </label>
              <input
                id="title"
                placeholder="Enter Title"
                type="text"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="form-control"
                required
                disabled
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Blogs Submitted
              </label>
              <input
                id="title"
                placeholder="Enter Title"
                type="text"
                value={data.totalBlogs}
                className="form-control"
                disabled
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                placeholder="Enter password"
                type="password"
                value={isEdit ? data.password : "1234567890"}
                onChange={(e) => setData({ ...data, password: e.target.value })}
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
                Save changes
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

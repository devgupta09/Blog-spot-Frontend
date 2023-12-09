import Container from "react-bootstrap/Container";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image } from "antd";
import brandLogo from "../../assets/brand-logo.png";
import userImage from "../../assets/user-profile-picture.avif";
import Notification from "../common/Notification";
import { useStoreActions } from "easy-peasy";

const Header = (props) => {
  const { showLogoutPopup } = props;
  const path = window.location.pathname;
  const setToken = useStoreActions((action) => action.user.setToken);
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <div className="d-flex text-secondary" style={{ gap: "5px" }}>
          <span
            className="material-symbols-outlined"
            style={{ height: "15px" }}
          >
            person
          </span>
          <span>User Name</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="d-flex text-primary" style={{ gap: "5px" }}>
          <span
            className="material-symbols-outlined"
            style={{ height: "10px" }}
          >
            edit_square
          </span>
          <span>Edit Profile</span>
        </div>
      ),
    },
    {
      key: "3",
      onClick: () => {
        logout();
        // Notification.success("Log out Successfully!");
        // setToken(null);
        // navigate("/signIn");
      },
      label: (
        <div className="d-flex text-danger" style={{ gap: "5px" }}>
          <span
            className="material-symbols-outlined"
            style={{ height: "10px" }}
          >
            logout
          </span>
          <span>Log out</span>
        </div>
      ),
    },
  ];

  const logout = () => {
    showLogoutPopup();
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark" sticky="top" className="bg-theme">
      <Image
        src={brandLogo}
        width={40}
        height={40}
        preview={false}
        style={{ marginLeft: "30px", cursor: "pointer" }}
      />
      <Container>
        <Nav className="me-auto">
          <Nav.Link
            to="/allBlogs"
            as={Link}
            style={path.toLowerCase() === "/allblogs" ? { color: "white" } : {}}
          >
            All Blogs
          </Nav.Link>
          <Nav.Link
            to="/myBlogs"
            as={Link}
            style={path.toLowerCase() === "/myblogs" ? { color: "white" } : {}}
          >
            My Blogs
          </Nav.Link>
          <Nav.Link
            to="/addBlog"
            as={Link}
            style={path.toLowerCase() === "/addblog" ? { color: "white" } : {}}
          >
            Add Blog
          </Nav.Link>
        </Nav>
        <Nav>
          {/* <Button type="submit" onClick={logout}>
            Log out
          </Button> */}
          <Dropdown menu={{ items }} placement="bottomRight">
            <img
              src={userImage}
              width={40}
              height={40}
              style={{
                borderRadius: "50%",
                padding: "2px",
                border: "1px solid white",
              }}
            />
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

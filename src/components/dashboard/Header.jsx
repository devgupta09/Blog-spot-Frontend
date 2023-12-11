import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image } from "antd";
import brandLogo from "../../assets/brand-logo.png";
import userImage from "../../assets/user-profile-picture.avif";
import "./style.scss";

const Header = (props) => {
  const userName = JSON.parse(localStorage.getItem("auth")).name;
  const path = window.location.pathname;
  const { showLogoutPopup } = props;
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <div
          className="d-flex text-secondary"
          style={{ gap: "5px", fontWeight: "600" }}
        >
          <span
            className="material-symbols-outlined"
            style={{ height: "15px" }}
          >
            person
          </span>
          <span>{userName}</span>
        </div>
      ),
    },
    {
      key: "2",
      onClick: () => {
        navigate("/userDetails");
      },
      label: (
        <div className="d-flex text-primary" style={{ gap: "5px" }}>
          <span
            className="material-symbols-outlined"
            style={{ height: "10px" }}
          >
            edit_square
          </span>
          <span> Profile</span>
        </div>
      ),
    },
    {
      key: "3",
      onClick: () => {
        logout();
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
    <Navbar
      bg="primary"
      data-bs-theme="dark"
      sticky="top"
      className="header-theme"
    >
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

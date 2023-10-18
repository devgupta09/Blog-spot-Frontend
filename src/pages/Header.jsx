import Container from "react-bootstrap/Container";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "antd";
import { useEffect } from "react";
import brandLogo from "../assets/brand-logo.png";
import "../styles/style.scss";

const Header = (props) => {
  const { showLogoutPopup } = props;
  const path = window.location.pathname;

  const logout = () => {
    showLogoutPopup();
  };

  useEffect(() => {}, [path]);

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
            to="/addBlog"
            as={Link}
            style={path.toLowerCase() === "/addblog" ? { color: "white" } : {}}
          >
            Add Blog
          </Nav.Link>
          <Nav.Link
            to="/allBlogs"
            as={Link}
            style={path.toLowerCase() === "/allblogs" ? { color: "white" } : {}}
          >
            Blogs
          </Nav.Link>
        </Nav>
        <Nav>
          <Button type="submit" onClick={logout}>
            Log out
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

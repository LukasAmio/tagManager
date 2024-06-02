import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

// import Icon from "@mdi/react";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button style={brandStyle()} onClick={() => navigate("/")}>
            TAG MANAGER
          </Button>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "blue",
    border: 'none',
    padding: '10px',
	cursor: 'pointer',
    background: 'white'
  };
}

export default NavBar;
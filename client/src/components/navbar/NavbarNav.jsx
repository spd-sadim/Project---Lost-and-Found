import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Icon} from "@iconify-icon/react"

export default function NavbarNav() {
  const {user} = useContext(AuthContext);
  return (
    <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Bhetayoo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto py-2">
            <Nav.Link href="/" className="fw-bold">
              Home
            </Nav.Link>
            <Nav.Link href="/about-us" className="fw-bold">
              About us
            </Nav.Link>
            <Nav.Link href="/report-item" className="fw-bold">
              Report Item
            </Nav.Link>
            <Nav.Link href="/view-post" className="fw-bold">
              View Item
            </Nav.Link>
            <Nav.Link href="/help-advice" className="fw-bold">
              Help & Advice
            </Nav.Link>
          </Nav>
         
          {user ? <Link to={`/${user.role}`}> <Icon icon="mingcute:user-4-line" width="32" height="32" title="user" className="text-white"/> </Link> :
            <div className="auth-buttons d-flex gap-2 ">
              <Link to="/login">
                <Button
                  style={{
                    backgroundColor: "#dc796a",
                    border: "2px solid #e4978b",
                  }}
                >
                  Log In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button
                  className="px-4"
                  style={{
                    backgroundColor: "#365d6d",
                    border: "2px solid #dc796a",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

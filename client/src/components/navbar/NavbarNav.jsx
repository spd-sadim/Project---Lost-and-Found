
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap"


export default function NavbarNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Bhetayoo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto py-2">
          <Nav.Link href="/" className='fw-bold'>Home</Nav.Link>
          <Nav.Link href="/about-us" className='fw-bold'>About us</Nav.Link>
          <Nav.Link href="/report-item" className='fw-bold'>Report Item</Nav.Link>
          <Nav.Link href="/view-item" className='fw-bold'>View Item</Nav.Link>
          <Nav.Link href="/help-advice" className='fw-bold'>Help & Advice</Nav.Link>
          <div className="auth-buttons d-flex gap-2">
          <Button style={{backgroundColor: "#dc796a", border: "2px solid #e4978b"}}>Log In</Button>
          <Button className='px-3' style={{backgroundColor: "#365d6d", border: "1px solid #e4978b"}}>Sign Up</Button>
          </div>
     
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

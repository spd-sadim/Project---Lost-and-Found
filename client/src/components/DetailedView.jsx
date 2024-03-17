import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../assets/samsung.jpg";

export default function DetailedView() {
  return (
    <div>
      <Container>
        <Row>
          <Col lg={4}>
            <img src={image} alt="item image" className="img-fluid rounded" />
            <h4>Person's contact</h4>
            <p>Name : Sadim Mali</p>
            <p>phone : +123 456 789</p>
            <p>Location: Santa Rose Beach, Los Angeles, CA</p>
          </Col>
          <Col lg={8}>
            <button>status</button>
            <h5>Item details</h5>
            <span></span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

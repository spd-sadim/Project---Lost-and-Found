import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./hero.css";
import HeroLeft from "./HeroLeft";
import HeroForm from "./HeroForm";

export default function Hero() {
  return (
    <section className="hero position-relative">
        <div className="overlay w-100 h-100"></div>
      <Container className="h-100">
        <div className="hero-content  py-5 position-relative h-100">
          <Row className="align-items-center h-100">
            <Col lg={7}>
              <HeroLeft />
            </Col>
            <Col lg={5}>
              <HeroForm />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

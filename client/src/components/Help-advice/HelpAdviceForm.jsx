import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "@iconify/react";
import image from "../../assets/hero/lost.png"

export default function HelpAdviceForm() {
  return (
      <Container>
        <Row>
          <Col lg={6} md={4} className="align-self-center d-none d-md-block">
              <img src={image} alt="" className="w-100 h-100" />
          </Col>
          <Col lg={6} md={6}>
            <div className="contact-form p-md-5">
              <form className="d-flex flex-column gap-2 py-md-5">
                <label htmlFor="name">
                  Full Name <b>*</b>
                </label>
                <input
                  type="text"
                  name="name"
                  className="inputField border-0 p-2"
                  required
                  placeholder='Eg: "Joe Sama'
                />
                <label htmlFor="email">
                  Email <b>*</b>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="inputField border-0 p-2"
                  placeholder="youremail@example.com"
                  required
                />
                <label htmlFor="comments">
                  Tell us about it <b>*</b>
                </label>
                <textarea
                  name="comments"
                  id="comments"
                  cols="30"
                  rows="10"
                  className="inputField border-0 p-2"
                ></textarea>
                <Button variant="dark" className="d-flex align-items-center justify-content-center gap-1" size="lg" type="submit">
                  <Icon icon="line-md:telegram" />
                  Send Message
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
  );
}

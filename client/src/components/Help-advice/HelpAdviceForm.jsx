import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "@iconify/react";

export default function HelpAdviceForm() {
  return (
    <div>
      <Container>
        <Row>
          <Col lg={6}></Col>
          <Col lg={6}>
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
                <Button variant="dark" size="lg" type="submit">
                  <Icon icon="line-md:telegram" />
                  Send Message
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

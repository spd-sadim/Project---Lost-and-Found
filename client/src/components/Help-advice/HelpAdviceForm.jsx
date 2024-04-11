import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "@iconify/react";
import image from "../../assets/hero/lost.png";
import axios from "axios";
import { useState } from "react";

export default function HelpAdviceForm() {
  const [inquiry, setInquiry] = useState({
    fullname: undefined,
    email: undefined,
    number: undefined,
    message: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleMessage = (e) => {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    try {
      isLoading(true);
      const res = await axios.post("/api/inquiry/post", inquiry);
      isLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={6} md={4} className="align-self-center d-none d-md-block">
          <img src={image} alt="" className="w-100 h-100" />
        </Col>
        <Col lg={6} md={6}>
          <div className="contact-form p-md-5">
            <form className="d-flex flex-column gap-2 py-md-5">
              <label htmlFor="fullname">
                Full Name <b>*</b>
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
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
              <label htmlFor="phoneNumber">
                Phone number <b>*</b>
              </label>
              <input
                type="tel"
                name="number"
                id="phoneNumber"
                className="inputField border-0 p-2"
                maxLength={10}
                placeholder="Phone Number"
                required
              />
              <label htmlFor="message">
                Tell us about it <b>*</b>
              </label>
              <textarea
                name="message"
                id="message"
                cols="20"
                rows="8"
                placeholder="Message"
                className="inputField border-0 p-2"
              ></textarea>
              <Button
                variant="dark"
                className="d-flex align-items-center justify-content-center gap-1"
                size="lg"
                type="submit"
              >
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

import { Row, Col, Container } from "react-bootstrap";
import "./footer.css";
import { Link } from "react-router-dom";
import arrowImg from "../../assets/arrow-right.svg";

export default function Footer() {
  const footerIinks = [
    {
      id: 1,
      name: "Category",
      links: [
        {
          name: "Electronics",
          route: "/",
        },
        {
          name: "Clothing",
          route: "/",
        },
        {
          name: "Animal",
          route: "/",
        },
        {
          name: "Mobile phone",
          route: "/",
        },
      ],
    },
    {
      id: 2,
      name: "Help & Support",
      links: [
        {
          name: "FAQ",
          route: "/",
        },
        {
          name: "How to stay safe",
          route: "/",
        },
        {
          name: "Terms & Conditions",
          route: "/",
        },
        {
          name: "Help & Advice",
          route: "/help-advice",
        },
      ],
    },
    {
      id: 3,
      name: "Help & Support",
      links: [
        {
          name: "FAQ",
          route: "/",
        },
        {
          name: "How to stay safe",
          route: "/",
        },
        {
          name: "Terms & Conditions",
          route: "/",
        },
        {
          name: "Help & Advice",
          route: "/help-advice",
        },
      ],
    },
  ];
  return (
    <footer className="footer">
      <Container>
        {/* footer top */}
        <div className="footer-top">
          <Row>
            {/* footer links */}
            {footerIinks.map((footerlink) => (
              <Col key={footerlink.id} lg={footerlink.id == 1 ? 2 : 3}>
                <h5 className="text-white font-bold py-3">{footerlink.name}</h5>
                <div className="d-flex flex-column gap-3">
                  {footerlink.links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.route}
                      className="text-decoration-none footer-links"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </Col>
            ))}
            {/* footer newsletter */}
            <Col lg={4}>
              <div className="footer-newsletter">
                <div className="newsletter-form">
                  <div className="newsletter-content">
                    <div className="title">
                      <h5 className="text-white">
                        To get the latest sign up for the PList newsletter
                      </h5>
                    </div>
                    <div className="form mt-4 position-relative">
                      <input
                        type="email"
                        name="email"
                        className="border-0 py-2 px-3 w-100 rounded footerField"
                        placeholder="Email Address"
                      />
                      <button
                        className="position-absolute top-0 end-0 border-0 bg-transparent px-3"
                        style={{ height: "60px" }}
                      >
                        {" "}
                        <img
                          src={arrowImg}
                          alt="submit button"
                        />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      {/* footer bottom */}
      <div className="footer-bottom py-4 text-center">
        {" "}
        <p className="mb-0  font-bold">
          {" "}
          2024 © All right reserved by Lost & Found | Made with Love by Sadim
        </p>
      </div>
    </footer>
  );
}

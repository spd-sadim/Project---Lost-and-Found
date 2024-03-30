import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";
import bannerImg1 from "../../assets/app-banner/app-banner-1.png";
import { Col, Row } from "react-bootstrap";

export default function Banner() {
  return (
    <section className="banner pt-5 ">
      <div className="container mt-5">
        <Row>
          <Col lg={6}>
            <div className="banner-content text-white">
              <h1 className="font-bold ">World Number #1 Items Classidied</h1>
              <p className="h5">
                See more relevant listings, find what you’re looking for <br />
                quicker and more!
              </p>

              <div className="button-container pt-3">
                <Link
                  href="#"
                  className="text-decoration-none text-white bg-black px-3 py-2 rounded d-inline-flex gap-1 align-items-center"
                >
                  <Icon
                    icon="simple-icons:apple"
                    style={{ fontSize: "2.8rem" }}
                  />
                  <span
                    className="d-flex flex-column"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {" "}
                    Download on the
                    <b className="h4">App Store</b>
                  </span>
                </Link>
                <Link
                  href="#"
                  className=" mx-3 text-decoration-none text-white bg-black px-3 py-2 rounded d-inline-flex gap-1 align-items-center"
                >
                  <Icon
                    icon="simple-icons:googleplay"
                    style={{ fontSize: "2.8rem" }}
                  />
                  <span
                    className="d-flex flex-column"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {" "}
                    Get it on
                    <b className="h4">Play Store</b>
                  </span>
                </Link>
              </div>
            </div>
          </Col>
          <Col>
            <div className="banner-image text-right w-100 mt-2 pt-1">
              <img src={bannerImg1} alt="" />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

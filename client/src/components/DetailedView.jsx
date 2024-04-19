import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../assets/samsung.jpg";
import { useParams } from "react-router";
import { Icon } from "@iconify-icon/react";

const InfoItem = ({ icon, label, value }) => (
  
  <div className="d-flex align-items-center mb-3 gap-2 ">
    {" "}
    <Icon
      icon={icon}
      width="35"
      height="35"
      className="bg-pri text-white p-2 rounded"
    />{" "}
  
    <span className="d-flex flex-column m-0 list-unstyled">
      <span className="fw-bold">{label}</span>
      <span className="fs-6">{value}</span>
    </span>
  </div>
);

export default function DetailedView() {
  let { id } = useParams();
  const font = {
    fontSize: "0.9rem",
  };

  return (
    <div>
      <Container>
        <Row>
          <Col lg={4} md={5}>
            <img src={image} alt="item image" className="img-fluid rounded" />
            <h4>Person's contact</h4>
            <p>Name : Sadim Mali</p>
            <p>phone : +123 456 789</p>
            <p>Location: Santa Rose Beach, Los Angeles, CA</p>
          </Col> 
          <Col lg={8} md={7}>
            <button>status</button>
            <h5 className="d-flex  align-items-center gap-2 font-primary fw-bold">
              <Icon icon="game-icons:binoculars" width="35" height="35" />
              <span>Item details</span>
            </h5>

            <InfoItem icon="gg:nametag" label="Name" value={"Item"} />
            <InfoItem icon="tabler:category-filled" label="Category" value={"This is category"} />
            <InfoItem icon="system-uicons:location" label="Location" value={"Kirtipur - 07, Kathmandu"} />
            <InfoItem icon="lets-icons:date-today-light" label="Date" value={"2024 - 04 - 11"} />

          <div className="description shadow-lg bg-sec p-3 mt-5 border rounded ">
            <h5 className="d-flex align-items-center gap-2 font-primary fw-bold">
              {" "}
              <span>Description </span> 
              <Icon icon="ph:puzzle-piece-light" width="25" height="25" />{" "}
            </h5>

            <p>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              perferendis! Odio labore rerum adipisci autem. Totam quos
              perferendis nostrum obcaecati, saepe facilis amet excepturi.
            </p>
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
5;

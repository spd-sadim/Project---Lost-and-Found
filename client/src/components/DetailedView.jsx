import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Icon } from "@iconify-icon/react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    console.log(type);
  const font = {
    fontSize: "0.9rem",
  };

  const [item, setItem] = useState([]);

  useEffect(() => {
    // Fetch item details using the ID
    setItem([]);
    axios.get(`/api/${type}/view/${id}`)
      .then(response => {
        setItem(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [type, id]);
  return (
    <div>
      <Container>
        <Row>
          <Col lg={4} md={5}>
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <img src={`http://localhost:3000/Images/${item.image}`} alt="item image" className="img-fluid rounded" />
          </div>
          </Col> 
          <Col lg={8} md={7}>
            <button>status</button>
            <h5 className="d-flex  align-items-center gap-2 font-primary fw-bold">
              <Icon icon="game-icons:binoculars" width="35" height="35" />
              <span>Item details</span>
            </h5>

            <InfoItem icon="gg:nametag" label="Name" value={item.item_name} />
            <InfoItem icon="tabler:category-filled" label="Category" value={item.category} />
            <InfoItem icon="system-uicons:location" label="Location" value={item.location} />
            <InfoItem icon="lets-icons:date-today-light" label="Date" value={item.date} />

          <div className="description shadow-lg bg-sec p-3 mt-5 border rounded ">
            <h5 className="d-flex align-items-center gap-2 font-primary fw-bold">
              {" "}
              <span>Additional Info </span> 
              <Icon icon="ph:puzzle-piece-light" width="25" height="25" />{" "}
            </h5>

            <p>
              {" "}
              {item.additional_info}
            </p>
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

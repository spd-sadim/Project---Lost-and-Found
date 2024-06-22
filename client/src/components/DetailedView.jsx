import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify-icon/react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { categories } from "./category";

export const InfoItem = ({ icon, label, value }) => (
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  console.log(type);
  const font = {
    fontSize: "0.9rem",
  };

  const [isShow, setIsShow] = useState(false);

  const [item, setItem] = useState([]);

  console.log(item);
  const handleClaim = () => {
    navigate(`/claim/${id}`, { state: { item, type } });
  };

  useEffect(() => {
    // Fetch item details using the ID
    setItem([]);
    axios
      .get(`/api/${type}/view/${id}`)
      .then((response) => {
        setItem(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [type, id]);
  return (
    <section>
      <Container>
        <div className="breadcrumb">
          <p>Home / Lost / {item.item_name}</p>
        </div>
        <div className="item-heading border-bottom mb-3">
          <h3>{item.item_name}</h3>
          <p className="d-flex item-center gap-2">
            {" "}
            <Icon icon="subway:location" width="25" height="25" />{" "}
            {item.location}
          </p>
        </div>
        <Row>
          <Col lg={8}>
            <div className="image-wrapper w-100 d-flex align-items-center justify-content-center">
              <img
                src={`http://localhost:3000/Images/${item.image}`}
                className="img-fluid"
                alt={item.item_name + " image"}
              />
            </div>

           

            <div className="mt-5">
              <h4 className="border-bottom py-2">Item description</h4>

              <p className="fs-6">{item.additional_info}</p>
            </div>


            <iframe
        className="mt-5"
        width="100%"
        height="400"
        allowFullScreen=""
        loading="lazy"
        id="gmap_canvas"
        samesite="Strict"
        src={`https://maps.google.com/maps?q=${item.location}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
      ></iframe>
          </Col>
          <Col lg={4} className="border-start sticky-top">
            <div className="p-2 border shadow-sm bg-white">
              <div className="d-flex align-items-center justify-content-between">
                <span>Info</span>
                <span>
                  <Icon
                    icon="bxs:down-arrow"
                    width="16"
                    height="16"
                    className="pointer"
                    onClick={() => setIsShow(!isShow)}
                  />
                </span>
              </div>
              <hr />

              <div
                className={`d-flex flex-column w-100 justify-content-center ${
                  isShow ? "d-none" : ""
                } `}
              >
                <span>
                  <span>Cateogry</span>
                  <span> {categories[item.category_id - 1]}</span>
                </span>

                <span>
                  <span>Location</span>
                  <span> {item.location} </span>
                </span>
                <span>
                  <span>Date Posted</span>
                  <span> {item.date} </span>
                </span>
              </div>
            </div>

            <div className="p-2 border shadow-sm bg-white mt-2 text-uppercase ">
              <p>{item.type}</p>
              <button className="btn btn-primary fw-bold">
                This item is mine!
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      
    </section>
  );
}

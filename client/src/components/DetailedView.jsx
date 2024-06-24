import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify-icon/react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { categories } from "./category";
import ClaimModal from "./modal/ClaimModal";
import { AuthContext } from "../context/AuthContext";

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
  const { user } = useContext(AuthContext);

  console.log(user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  console.log(type);
  const font = {
    fontSize: "0.9rem",
  };

  const [isShow, setIsShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [item, setItem] = useState([]);

  console.log(item);
  const handleClaimModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    // Fetch item details using the ID
    setItem({});
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
          <p>
            {" "}
            <a href="/">Home</a> / {item.item_name}
          </p>
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
              <h4 className="border-bottom py-2 fw-bold">Item description</h4>

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
          <Col lg={4} className="sticky-top">
            <div className="border-start px-5">
              <div className="py-2 px-4 border shadow-sm bg-white">
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
                  <table>
                    <tbody>
                      <tr>
                        <td>Category</td>
                        <td> {categories[item.category_id - 1]}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>{item.location}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>{item.location}</td>
                      </tr>
                      <tr>
                        <td>Date posted</td>
                        <td>{item.date ? item.date.split("T")[0] : "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="py-2 px-4 border shadow-sm bg-white mt-2 text-uppercase ">
                <p>{item.type}</p>
                <button
                  className="btn btn-primary fw-bold"
                  type="button"
                  onClick={handleClaimModal}
                >
                  This item is mine!
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <ClaimModal
          handleClaimModal={handleClaimModal}
          show={showModal}
          itemType={item.type}
          itemId={item.id}
          userId={user.user_id}
          userName={user.user_firstname + " " + user.user_lastname}
        />
      </Container>
    </section>
  );
}

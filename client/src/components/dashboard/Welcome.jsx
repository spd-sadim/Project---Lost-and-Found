import React, { useContext, useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { AuthContext } from "../../context/AuthContext";
import { Col, Row } from "react-bootstrap";
import illuImage from "../../assets/customer-support.png";
import axios from "axios";
import "./welcome.css";

const WelcomeCard = ({ data, label }) => {
  return (
    <Col lg="6" className=" py-3 mb-3"> {/* Added mb-3 for margin-bottom */}
      <Row className="g-0 w-100">
        <Col lg="6">
          <div className="illustrated-text p-1 m-1">
            <h3>{label}</h3>
          </div>
        </Col>
        <Col lg="6" className="align-self-end text-end">
          <p className="fw-bold">{data}</p>
        </Col>
      </Row>
    </Col>
  );
};

const Welcome = () => {
  const [data, setData] = useState({
    lost: "",
    found: "",
    users: "",
    inquiry: "",
    claims: ""
  });

  const [uData, setUData] = useState({
    lost: "",
    found: "",
    claims: ""
  });

  const { user } = useContext(AuthContext);
  let userId = user.user_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/lost");
        const fresponse = await axios.get("/api/found");
        const inquiryResponse = await axios.get("/api/inquiry");
        const claims = await axios.get("/api/claim/all");

        setData({
          lost: response.data.length,
          found: fresponse.data.length,
          inquiry: inquiryResponse.data.length,
          claims: claims.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUserData = async () => {
      try {
        const found = await axios.get(`/api/found/${user.user_id}`);
        const lost = await axios.get(`/api/lost/${userId}`);
        console.log(lost)
        // const myClaims = await axios.get(`/api/claim/`);

        setUData({
          lost: lost.data.length,
          found: found.data.length,
        //   claims: myClaims.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (user.role === "admin") {
      fetchData();
    } 

    if (user.role === "user"){
        fetchUserData();
    }
  }, [user.role, userId]);

  return (
    <Wrapper className="main">
      <div className="mt-3">
        <h3 className="text-secondary">Dashboard</h3>
      </div>

      <Row className="gx-3">
        <Col lg="6" className="illustration py-3 mb-3"> {/* Added mb-3 for margin-bottom */}
          <Row className="g-0 w-100">
            <Col lg="6">
              <div className="illustrated-text p-1 m-1">
                <h4>Welcome back, {user.user_firstname}!</h4>
                <p className="mb-0 fw-semibold">Lost & Found Dashboard</p>
              </div>
            </Col>
            <Col lg="6" className="align-self-end text-end"> {/* Added mr-3 for margin-right */}
              <img
                src={illuImage}
                alt="illustrated image"
                className="img-fluid w-100"
                style={{ maxWidth: "150px" }}
              />
            </Col>
          </Row>
        </Col>

        {user.role === "admin" ? (
          <>
            <WelcomeCard data={data.found} label="Found posts" />
            <WelcomeCard data={data.lost} label="Lost posts" />
            <WelcomeCard data={data.claims} label="Claims posts" />
            <WelcomeCard data={data.inquiry} label="Inquiry messages" />
          </>
        ) : (
          <>
            <WelcomeCard data={uData.found} label="Found posts" />
            <WelcomeCard data={uData.lost} label="Lost posts" />
            {/* <WelcomeCard data={uData.claims} label="Claims posts" /> */}
          </>
        )}
      </Row>
    </Wrapper>
  );
};

export default Welcome;

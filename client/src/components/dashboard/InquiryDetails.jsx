import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import FormWrapper from "./FormWrapper";
import { Row,Col, Container } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";

export default function InquiryDetails() {
  const [inquiry, setInquiy] = useState({});

  const { id } = useParams();
  useEffect(() => {
      const fetchData = async () => {
          try {
        const res = await axios.get(`/api/inquiry/${id}`);
        console.log(res.data);
        setInquiy(res.data);
    } catch (err) {
        alert(err);
      };
    }
    fetchData();
  },[]);
  return (
    <Wrapper>
      <div className="px-3">
        <h3>Inquiry </h3>
      </div>
      <FormWrapper>
        <Container>
          <Row>
            <Col>
              <h6>Full Name</h6>
              <span> {inquiry.fullname}</span>
            </Col>
            <Col>
              <h6>Contact</h6>
              <span> {inquiry.contact}</span>
            </Col>
            <Col>
              <h6>Email</h6>
              <span> {inquiry.email}</span>
            </Col>
            <Col>
              <h6>Message</h6>
              <span> {inquiry.message}</span>
            </Col>
            <Col>
              <h6>Date</h6>
              <span> {inquiry.created_at}</span>
            </Col>
          </Row>
            <button className="bg-danger">Delete</button>
        </Container>
      </FormWrapper>
    </Wrapper>
  );
}

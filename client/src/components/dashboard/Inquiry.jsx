import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Wrapper from "./Wrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import DeleteModal from "../modal/DeleteModal";

export default function Inquiry() {
  const [inquires, setInquires] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleModal = (id) => {
    setDeleteId(id);
    setShow(!show);
  };

  const deleteInquiry = async (id) => {
    try {
      console.log("api id", id);
      await axios.delete(`/api/inquiry/${id}`);
      setInquires(inquires.filter((inquiry) => inquiry.id !== id));
      setShow(false);
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  const handleDeleteItem = () => {
    if (deleteId) {
      deleteInquiry(deleteId);
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const res = await axios.get("/api/inquiry/");
        console.log(res.data);
        setInquires(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInquiry();
  }, []);
  return (
    <Wrapper>
      <div>
        <h3>Inquiry</h3>
      </div>
      <Table responsive bordered hover size="lg">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Contact Details</th>
            <th>Email address </th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inquires.length > 0 ? (
            inquires.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{inquiry.fullname}</td>
                <td>{inquiry.contact}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.created_at}</td>
                <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Link
                    to={`/admin/inquiry/${inquiry.id}`}
                    className="text-decoration-none text-secondary"
                  >
                    <Icon icon="tabler:edit" /> View
                  </Link>
                  <Link
                    className="text-decoration-none text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModal(inquiry.id);
                    }}
                  >
                    <Icon icon="fluent:delete-24-regular" /> Delete
                  </Link>
                  </div> 
                </td>
              </tr>
            ))
          ) : (
              <tr colSpan="8" >There is no data</tr>
          )}
        </tbody>
      </Table>
      <DeleteModal
        handleModal={handleModal}
        handleDeleteItem={handleDeleteItem}
        show={show}
      />
    </Wrapper>
  );
}

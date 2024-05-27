import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Wrapper from "./Wrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import {Icon} from '@iconify-icon/react'

export default function Inquiry() {
  const [inquires, setInquires] = useState([]);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const res = await axios.get("/api/inquiry/");
        console.log(res.data);
        setInquires(res.data);
      } catch (err) {
        console.error(err);
        alert(err);
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
            <th>Message</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {inquires.map((inquiry)=>(
              <tr key={inquiry.id} >
                <td>{inquiry.fullname}</td>
                <td>{inquiry.contact}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.message}</td>
                <td>{inquiry.created_at}</td>
                <td>
                <Link to={`/admin/inquiry/${inquiry.id}`} className="text-decoration-none text-secondary">
                      <Icon icon="tabler:edit" /> View
                    </Link>
                    <Link
                      className="text-decoration-none text-danger"
                      // onClick={() => handleModal(item.id)}
                    >
                      <Icon icon="fluent:delete-24-regular" /> Delete
                    </Link>
                </td>
              </tr>
            ))}
        
        </tbody>
      </Table>
    </Wrapper>
  );
}

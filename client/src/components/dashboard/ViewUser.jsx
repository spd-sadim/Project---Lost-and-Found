import { Icon } from "@iconify-icon/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";

export default function ViewUser() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user/");
        console.log(response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  },[]);

  console.log(userDetails);
  return (
    <Wrapper>
      <h3>Users</h3>

      <Table responsive bordered hover size="lg">
        <thead>
          <tr>
            <th>User-ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email address </th>
            <th>Phone Number</th>
            <th>Created at</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {userDetails.map((userDetail)=>(
              <tr key={userDetail.user_id}>
                <td>{userDetail.user_id}</td>
                <td>{userDetail.user_firstname}</td>
                <td>{userDetail.user_lastname}</td>
                <td>{userDetail.user_email}</td>
                <td>{userDetail.user_phonenumber}</td>
                <td>{userDetail.created_at}</td>
                <td>{userDetail.role}</td>
                <td>
                <Link to={`/admin/users/${userDetail.user_id}`} className="text-decoration-none text-success">
                      <Icon icon="tabler:edit" /> Edit
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

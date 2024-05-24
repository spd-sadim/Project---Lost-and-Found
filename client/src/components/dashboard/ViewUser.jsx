import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

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
    <div>
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
              <tr key={userDetail.name}>
                <td>{userDetail.user_id}</td>
                <td>{userDetail.user_firstname}</td>
                <td>{userDetail.user_lastname}</td>
                <td>{userDetail.user_email}</td>
                <td>{userDetail.user_phonenumber}</td>
                <td>{userDetail.created_at}</td>
                <td>{userDetail.role}</td>
                <td>
                  <div>
                    View
                    delete
                  </div>
                </td>
              </tr>
            ))}
        
        </tbody>
      </Table>
    </div>
  );
}

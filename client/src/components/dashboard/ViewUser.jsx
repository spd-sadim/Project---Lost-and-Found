import { Icon } from "@iconify-icon/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import { AuthContext } from "../../context/AuthContext";
import DeleteModal from "../modal/DeleteModal";

export default function ViewUser() {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleModal = (id) => {
    setDeleteId(id);
    setShow(!show);
    console.log(show);
  };

  const deletePost = async (id) => {
    try {
      console.log("api id", id);
      await axios.delete(`/api/user/${id}`);
      setUserDetails(
        userDetails.filter((userDetail) => userDetail.user_id !== id)
      );
      setShow(false);
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  const handleDeleteItem = () => {
    if (deleteId) {
      deletePost(deleteId);
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/user?id=${user.user_id}`);
        console.log(response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [user.user_id]);

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
            <th>Email address</th>
            <th>Phone Number</th>
            <th>Created at</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((userDetail) => (
            <tr key={userDetail.user_id}>
              <td>{userDetail.user_id.slice(0, 8) + "..."}</td>
              <td>{userDetail.user_firstname}</td>
              <td>{userDetail.user_lastname}</td>
              <td>{userDetail.user_email}</td>
              <td>{userDetail.user_phonenumber}</td>
              <td>{userDetail.created_at}</td>
              <td>{userDetail.role}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Link
                    to={`/admin/users/${userDetail.user_id}`}
                    className="text-decoration-none d-inline-flex align-items-center text-success"
                  >
                    <Icon icon="tabler:edit" /> Edit
                  </Link>
                  <Link
                    className="text-decoration-none d-inline-flex align-items-center mx-md-1 text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModal(userDetail.user_id);
                    }}
                  >
                    <Icon icon="fluent:delete-24-regular" /> Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
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

import Table from "react-bootstrap/Table";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Wrapper from "./dashboard/Wrapper";
import DeleteModal from "./modal/DeleteModal";
import { categories } from "./category";

export default function ViewItem({ type }) {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const handleModal = (id) => {
    setDeleteId(id);
    setShow(!show);
  };

  useEffect(() => {
    // Define an async function to fetch data
    setItems([]);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${type}/${user.user_id}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Call the async function to fetch data
    fetchData();
  }, [type, user.user_id]);

  const deletePost = async (id) => {
    try {
      console.log("api id", id);
      await axios.delete(`/api/${type}/delete/${id}`);
      setItems(items.filter((item) => item.id != id));
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

  const handleRowClick = (id) => {
    navigate(`/${user.role}/${type}/${id}?type=${type}`);
  };

  const handleEditClick = (id) => {
    navigate(`/${user.role}/${type}/edit/${id}?type=${type}`);
  };

  return (
    <Wrapper>
      <div className=" d-flex justify-content-between w-100 my-3">
        <h4 className="">View {type} Items</h4>
        <button className="btn btn-dark">+ New Item</button>
      </div>
      <Table responsive bordered hover size="lg">
        <thead>
          <tr>
            <th>Item-ID</th>
            <th>Item image</th>
            <th>Item name</th>
            <th>Location {type}</th>
            <th>Date {type}</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                className="pointer"
              >
                <td>{item.id}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/${item.image}`}
                    style={{ width: "4em", height: "4em" }}
                    alt=""
                  />
                </td>
                <td>{item.item_name}</td>
                <td>{item.location}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{  categories[item.category_id - 1]}</td>
                <td>
                  <button className="btn btn-secondary rounded-pill">
                    Reported
                  </button>
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    {/* <Link
                      to={`/${user.role}/${type}/${item.id}?type=${type}`}
                      className="text-decoration-none"
                    >
                      <Icon icon="lets-icons:view-alt" />
                      View
                    </Link> */}
                    <div
                      className="text-decoration-none d-inline-flex align-items-center text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item.id);
                      }}
                    >
                      <Icon icon="tabler:edit" /> Edit
                    </div>
                    <Link
                      className="text-decoration-none d-inline-flex align-items-center text-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModal(item.id);
                      }}
                    >
                      <Icon icon="fluent:delete-24-regular" /> Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {" "}
              <td colSpan="8">There is no data</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* modal to delete Item*/}
      {/* <Modal
        show={show}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>Do you want to delete the item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <DeleteModal
        handleModal={handleModal}
        handleDeleteItem={handleDeleteItem}
        show={show}
      />
    </Wrapper>
  );
}

import Table from "react-bootstrap/Table";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function ViewItem({type}) {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const {user} = useContext(AuthContext); 
  const handleModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    // Define an async function to fetch data
    setItems([])
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${type}/${user.user_id}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Call the async function to fetch data
    fetchData();
  }, [type, user.user_id]);

  return (
    <div className="px-lg-5">
      <div className=" d-flex justify-content-between w-100 my-3">
        <h4 className="">View {type} Items</h4>
        <button className="btn btn-dark">+ New Item</button>
      </div>
      <Table responsive bordered hover size="lg">
        <thead>
          <tr>
            <th>Item-ID</th>
            <th>Item name</th>
            <th>Location {type}</th>
            <th>Date {type}</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
         items.length > 0 ? items.map((item)=>(
            <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.item_name}</td>
            <td>{item.location}</td>
            <td>{item.date.split("T")[0]}</td>
            <td>{item.category_id}</td>
            <td>
              <button className="btn btn-secondary">Reported</button>
            </td>
            <td>
              <div className="d-flex gap-2"> 
                <Link to={`/user/lost/${item.id}?type=${type}`} className="text-decoration-none" >
                  <Icon icon="lets-icons:view-alt" /> View
                </Link>
                <Link className="text-decoration-none" >
                  <Icon icon="tabler:edit" /> Edit
                </Link>
                <Link  className="text-decoration-none" onClick={handleModal}>
                  <Icon icon="fluent:delete-24-regular"/> Delete
                </Link>
              </div>
            </td>
            </tr>
         )) : (<tr> <td colSpan='7'>There is no data</td></tr>)
        }
        
        </tbody>
      </Table>

      {/* modal */}
      <Modal  
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
          <Button variant="danger">Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

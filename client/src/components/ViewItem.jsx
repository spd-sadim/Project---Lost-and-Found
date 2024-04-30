import Table from "react-bootstrap/Table";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ViewItem() {
  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(!show);
  };

  return (
    <div>
      <div className=" d-flex justify-content-between w-100 mb-3">
        <h4>View Lost Items</h4>
        <button className="btn btn-dark">+ New Item</button>
      </div>
      <Table responsive bordered hover size="lg">
        <thead>
          <tr>
            <th>Item-ID</th>
            <th>Item name</th>
            <th>Category</th>
            <th>Date lost</th>
            <th>Location lost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Samsung</td>
            <td>Mobile phone</td>
            <td>2024-02-22</td>
            <td>Barcelona, Spain</td>
            <td>
              <button className="btn btn-secondary">Reported</button>
            </td>
            <td>
              <div className="d-flex gap-2">
                <Link to={`/user/view-item/dfaf`} className="text-decoration-none" >
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

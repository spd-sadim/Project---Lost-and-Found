import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteModal({handleModal, handleDeleteItem, show}) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
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
      <Button variant="danger" onClick={handleDeleteItem}>
        Yes
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

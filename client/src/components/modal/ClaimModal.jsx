import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ClaimModal({ show, handleClaimModal, itemId, itemType, userId, userName }) {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
//   const [userName, setUserName] = useState('');
//   const [userId, setUserId] = useState('');

console.log(userName)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', image);
    formData.append('postId', itemId);
    formData.append('postType', itemType);
    formData.append('userId', userId);
    formData.append('userName', userName);

    try {
      await axios.post('/api/claim/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleClaimModal();
      alert('Claim submitted successfully');
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Failed to submit claim');
    }
  };

  return (
    <Modal show={show} onHide={handleClaimModal}>
      <Modal.Header closeButton>
        <Modal.Title className='fw-bold'>Claim details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="claimMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder='Type a message' 
              autoFocus 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="claimImage">
            <Form.Label>Add image proof</Form.Label>
            <Form.Control
              type="file"
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Form.Group>
       
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClaimModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ClaimModal;

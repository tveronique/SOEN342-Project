import React, { useState } from 'react';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OfferingCrudModal = () => {
  // State to control modal visibility
  const [show, setShow] = useState(false); 
  const navigate = useNavigate();

  // Functions to open and close the modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Navigation function for each CRUD operation
  const navigateTo = (path) => {
    navigate(path);
    handleClose(); // Close the modal after navigating
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <Button variant="primary" onClick={handleShow}>
        Manage Offerings
      </Button>

      {/* Modal Component */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Offerings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Buttons for each CRUD operation */}
          <ButtonGroup vertical>
            <Button variant="primary" onClick={() => navigateTo('/offerings/create')}>Create Offering</Button>
            <Button variant="secondary" onClick={() => navigateTo('/offerings')}>View Offerings</Button>
            <Button variant="warning" onClick={() => navigateTo('/offerings/update')}>Update Offering</Button>
            <Button variant="danger" onClick={() => navigateTo('/offerings/delete')}>Delete Offering</Button>
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OfferingCrudModal;
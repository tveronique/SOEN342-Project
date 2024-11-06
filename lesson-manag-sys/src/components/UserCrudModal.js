import React, { useState } from 'react';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserCrudModal = () => {
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
        Manage User Profiles
      </Button>

      {/* Modal Component */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage User Profiles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonGroup vertical>
            <Button variant="primary" onClick={() => navigateTo('/user-profiles')}>View Profiles</Button>
            <Button variant="danger" onClick={() => navigateTo('/user-profiles/delete')}>Delete Profiles</Button>
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCrudModal;
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function ConfirmModal(props) {
  const {
    title = "Confirm Action",
    children = "you're sure about Action!",
    isShow,
    handleClose,
    handleSubmit
  } = props;

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

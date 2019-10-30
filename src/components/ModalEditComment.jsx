import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";

const ModalEditComment = props => {
  const { currentpost, loggedUser, handleEdit, ...rest } = props; //to avoid  unknown-prop warning error
  const [textvalue, setTextValue] = useState("");
  useEffect(() => {
    setTextValue(currentpost != null ? currentpost.text : "");
  }, [currentpost]);

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Media as="li">
            <Image
              width={60}
              height={60}
              className="mr-3"
              roundedCircle
              src={loggedUser.image}
              alt="Generic placeholder"
            />
            <Media.Body>
              <div className="d-flex pt-2 justify-content-between align-items-baseline ">
                <h5 style={{ lineHeight: 0.5 }} className="mb-0 pb-0 d-block">
                  {loggedUser.name}
                </h5>
                {/* <div>     
                </div> */}
              </div>
              <p className="mb-0" style={{ fontSize: "13px" }}>
                {loggedUser.title}{" "}
              </p>
            </Media.Body>
          </Media>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Edit your comment</h4>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            placeholder="Start a new post..."
            as="textarea"
            rows="3"
            onChange={e => {
              setTextValue(e.target.value);
            }}
            value={textvalue}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleEdit(currentpost._id, textvalue);
            rest.onHide();
          }}
        >
          Edit
        </Button>
        <Button onClick={rest.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditComment;

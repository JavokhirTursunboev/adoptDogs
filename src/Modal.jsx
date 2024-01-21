import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { adopt } from "./adopterPetSlice";
import { useNavigate } from "react-router-dom";
export default function MyVerticallyCenteredModal({ show, onHide, petName, pet }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>
          Would you like to adopt <span className="text-red-600">{petName}</span> 😊
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch(adopt(pet));
            navigate("/");
          }}
        >
          Yes
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
// Add PropTypes to validate the props
MyVerticallyCenteredModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  petName: PropTypes.string.isRequired,
  pet: PropTypes.object.isRequired,
};

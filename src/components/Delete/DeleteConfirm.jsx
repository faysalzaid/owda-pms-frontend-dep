import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';

function DeleteModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Confirm Action</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to perform this action?</p>
      </ModalBody>
      <ModalFooter>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={onClose}>
          Confirm
        </button>
      </ModalFooter>
    </Modal>
  );
}


export default DeleteModal
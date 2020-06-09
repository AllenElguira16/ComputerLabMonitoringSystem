import React from "react";
import {Modal, ModalBody} from "reactstrap";

interface Props {
  isOpen: boolean;
}

const Popup: React.FC<Props> = ({isOpen, children}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  );
};

export default Popup;
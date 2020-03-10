import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  Alert
} from "reactstrap";
import StudentStore from "../../../Store/StudentStore";

interface Props {
  id: string;
  modal: boolean;
  toggle: () => void;
}

const DeleteStudent: React.FC<Props> = ({ modal, toggle, id }) => {
  const { deleteStudent, getStudents } = React.useContext(StudentStore);
  const [response, setResponse] = React.useState<ServerResponse>();

  const onDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("GG");
    setResponse(await deleteStudent(id));
    await getStudents();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Confirmation</ModalHeader>
      <ModalBody>
        {response?.error && <Alert color="danger">{response?.error}</Alert>}
        {response?.success && (
          <Alert color="success">{response?.success}</Alert>
        )}
        <div>Are you sure you want to delete?</div>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="primary" onClick={onDelete}>
          Submit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteStudent;

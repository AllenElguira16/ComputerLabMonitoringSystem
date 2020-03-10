import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Alert
} from "reactstrap";
import StudentStore from "../../../Store/StudentStore";

interface Props {
  modal: boolean;
  toggle: () => void;
  formInputs: StudentForm;
  onInputChange(event: React.FormEvent<HTMLInputElement>): void;
}

const EditStudent: React.FC<Props> = ({
  modal,
  toggle,
  formInputs,
  onInputChange
}) => {
  const { editStudent, getStudents } = React.useContext(StudentStore);
  const [response, setResponse] = React.useState<ServerResponse>();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("GG");
    setResponse(await editStudent(formInputs));
    await getStudents();
  };

  return (
    <>
      {/* <Button onClick={toggle}>Add Student</Button> */}
      <Modal isOpen={modal} toggle={toggle}>
        <Form tag={Form} onSubmit={onSubmit}>
          <ModalHeader toggle={toggle}>Edit Student</ModalHeader>
          <ModalBody>
            {response?.error && <Alert color="danger">{response?.error}</Alert>}
            {response?.success && (
              <Alert color="success">{response?.success}</Alert>
            )}
            <FormGroup>
              <Input
                onChange={onInputChange}
                value={formInputs.schoolID}
                name="schoolID"
                placeholder="SchoolID"
              />
            </FormGroup>
            <FormGroup>
              <Input
                onChange={onInputChange}
                value={formInputs.firstname}
                name="firstname"
                placeholder="Firstname"
              />
            </FormGroup>
            <FormGroup>
              <Input
                onChange={onInputChange}
                value={formInputs.lastname}
                name="lastname"
                placeholder="Lastname"
              />
            </FormGroup>
            <FormGroup>
              <Input
                onChange={onInputChange}
                value={formInputs.course}
                name="course"
                placeholder="Course"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default EditStudent;

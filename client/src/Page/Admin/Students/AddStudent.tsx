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

const AddStudents: React.FC = () => {
  const { addStudent, getStudents } = React.useContext(StudentStore);
  const [modal, setModal] = React.useState(false);
  const [response, setResponse] = React.useState<ServerResponse>();
  const [formInputs, setFormInputs] = React.useState<StudentForm>({
    schoolID: "",
    firstname: "",
    lastname: "",
    course: ""
  });

  const toggle = () => setModal(!modal);

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    setFormInputs({
      ...formInputs,
      [key]: value
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("GG");
    setResponse(await addStudent(formInputs));
    await getStudents();
  };

  return (
    <>
      <Button onClick={toggle}>Add Student</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <Form tag={Form} onSubmit={onSubmit}>
          <ModalHeader toggle={toggle}>Add Student</ModalHeader>
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

export default AddStudents;

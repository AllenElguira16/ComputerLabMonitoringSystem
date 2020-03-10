import React from "react";
import { Table, Button } from "reactstrap";
import { observer } from "mobx-react-lite";
import StudentStore from "../../../Store/StudentStore";
import EditStudent from "./EditStudent";
import DeleteStudent from "./DeleteStudent";

const StudentLists: React.FC = () => {
  const { students, getStudents } = React.useContext(StudentStore);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState();

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const [formInputs, setFormInputs] = React.useState<Student>({
    schoolID: "",
    firstname: "",
    lastname: "",
    course: ""
  });

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    setFormInputs({
      ...formInputs,
      [key]: value
    });
  };

  React.useEffect(() => {
    async function getStudentsAsync() {
      await getStudents();
    }
    getStudentsAsync();
  }, [getStudents]);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>SchoolID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student, key) => (
              <tr key={key}>
                <td>{student.schoolID}</td>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>{student.course}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => {
                      setFormInputs(student);
                      toggleEditModal();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      setIdToDelete(student.id);
                      toggleDeleteModal();
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <DeleteStudent
        id={idToDelete}
        toggle={toggleDeleteModal}
        modal={deleteModal}
      />
      <EditStudent
        toggle={toggleEditModal}
        modal={editModal}
        formInputs={formInputs}
        onInputChange={onInputChange}
      />
    </>
  );
};

export default observer(StudentLists);

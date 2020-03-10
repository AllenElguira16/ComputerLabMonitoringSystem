import React from "react";
import StudentLists from "./StudentLists";
import { CardTitle } from "reactstrap";
import AddStudents from "./AddStudent";

const Students: React.FC = () => {
  return (
    <>
      <CardTitle>Students Dashboard</CardTitle>
      <AddStudents />
      <StudentLists />
    </>
  );
};

export default Students;

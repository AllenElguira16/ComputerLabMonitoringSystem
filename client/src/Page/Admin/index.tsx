import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import NavItemLink from "../../Components/NavItemLink";
import { Route } from "react-router-dom";
import Students from "./Students";

const Admin: React.FC = () => {
  return (
    <Container>
      <Card>
        <CardHeader>
          <Nav pills card>
            <NavItemLink to="/admin/students">Students</NavItemLink>
            <NavItemLink to="/admin/history">History</NavItemLink>
          </Nav>
        </CardHeader>
        <CardBody>
          <Route path="/admin/students" component={Students} />
        </CardBody>
      </Card>
    </Container>
  );
};

export default Admin;

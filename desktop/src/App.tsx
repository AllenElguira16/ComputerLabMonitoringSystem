import React from "react";
// import logo from './logo.svg';
import "./App.css";
// import "bootstrap/dist/css/bootstrap";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

const App: React.FC = () => {
  return (
    <div className="App full-page">
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Card>
            <CardBody>
              <CardTitle>Computer Lab Monitoring System</CardTitle>
              <Form>
                <FormGroup>
                  <Label></Label>
                  <Input placeholder="SchoolID" />
                </FormGroup>
                <Button>Go</Button>
              </Form>
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default App;

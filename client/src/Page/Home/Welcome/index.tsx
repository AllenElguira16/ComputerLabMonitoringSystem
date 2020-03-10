import React from "react";
import { Container, Row, Card, CardBody, CardTitle } from "reactstrap";

const Welcome: React.FC = () => {
  // return <>;
  return (
    <Container className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Card>
          <CardBody>
            <CardTitle>Computer Lab Monitoring System</CardTitle>
            <div>Welcome, please wait before using this computer</div>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

export default Welcome;

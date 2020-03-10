import React from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
  Alert
} from "reactstrap";
import StudentStore from "../../../Store/StudentStore";

const Login: React.FC = () => {
  const [schoolID, setSchoolID] = React.useState("");
  const [response, setResponse] = React.useState<ServerResponse>();
  const { login, setAsLoggedIn } = React.useContext(StudentStore);

  const authenticate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await login(schoolID);
    setResponse(response);
    if (response.success) {
      setAsLoggedIn(true);
    }
  };

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSchoolID(event.currentTarget.value);
  };

  return (
    <Container className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Card>
          <CardBody>
            <CardTitle>Computer Lab Monitoring System</CardTitle>
            {response?.error && <Alert color="danger">{response?.error}</Alert>}

            <Form onSubmit={authenticate}>
              <FormGroup>
                {/* <Label></Label> */}
                <Input
                  placeholder="SchoolID"
                  onChange={onInputChange}
                  value={schoolID}
                />
              </FormGroup>
              <Button type="submit">ENTER</Button>
            </Form>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

export default Login;

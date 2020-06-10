import React from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Form,
  Input,
  Button,
  Alert
} from "reactstrap";
import StudentStore from "../../../Store/StudentStore";
import PCStore from "../../../Store/PCStore";
import logo from "../../../Assets/Logo.png";
import {observer} from "mobx-react-lite";
import Popup from "../../../Components/Popup";

const Login: React.FC = () => {
  const [schoolID, setSchoolID] = React.useState("");
  const [pcNoInput, setPcNoInput] = React.useState("");
  const [response, setResponse] = React.useState<ServerResponse>();
  const { login, setAsLoggedIn } = React.useContext(StudentStore);
  const {isSet, pc_no, getPCNo, setPCNo} = React.useContext(PCStore);

  React.useEffect(function () {
    (async () => await getPCNo())();
  }, [getPCNo]);

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

  const sendPCNo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pcNoInput !== null && pcNoInput.length !== 0) {
      await setPCNo(pcNoInput);
    }
  };

  return (
    <Container className="h-100">
      {isSet !== undefined && (
        <Popup isOpen={isSet}>
          <Form onSubmit={sendPCNo}>
            <Input
              onChange={({currentTarget}) => setPcNoInput(currentTarget.value)}
              placeholder="Set PC Number"
            />
          </Form>
        </Popup>
      )}
      <Row className="h-100 justify-content-center align-items-center">
        <Card>
          <CardBody>
            <div className="h-75 w-75 mx-auto">
              <img src={logo} alt="Logo" className="img-fluid"/>
            </div>
            <div style={{marginTop: -90}}>
              {(isSet === false) && <h4 className="display-4 text-center">PC-{pc_no}</h4>}
              <Card>
                <CardBody tag={Form} onSubmit={authenticate}>
                  {response?.error && <Alert color="danger">{response?.error}</Alert>}
                  <div className="form-row">
                    <div className="col">
                      <Input
                        placeholder="School ID"
                        onChange={onInputChange}
                        value={schoolID}
                      />
                    </div>
                    <div className="col-2">
                      <Button type="submit">ENTER</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

export default observer(Login);

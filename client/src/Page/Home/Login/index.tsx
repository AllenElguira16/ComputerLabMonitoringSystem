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
  Alert, Col
} from "reactstrap";
import StudentStore from "../../../Store/StudentStore";
import PCStore from "../../../Store/PCStore";
import logo from "../../../Assets/Logo.png";
import {observer} from "mobx-react-lite";

const Login: React.FC = () => {
  const [schoolID, setSchoolID] = React.useState("");
  const [response, setResponse] = React.useState<ServerResponse>();
  const { login, setAsLoggedIn } = React.useContext(StudentStore);
  const {pc_no, getPCNo, setPCNo} = React.useContext(PCStore);

  React.useEffect(function () {
    async function doSetup(): Promise<void> {
      if (!await getPCNo()) {
        return;
      }

      const newPcNo = window.prompt('Set PC Number', '');

      if (newPcNo === null || newPcNo.length === 0) {
        return doSetup();
      }
      await setPCNo(newPcNo);
      await getPCNo();
    }
    (async () => doSetup())();
  }, [getPCNo, setPCNo]);

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
            <div className="h-75 w-75 mx-auto">
              <img src={logo} alt="Logo" className="img-fluid"/>
              {/*<h4>Computer Lab Monitoring System</h4>*/}
            </div>
            <div style={{marginTop: -90}}>
              {pc_no !== undefined && <h4 className="display-4 text-center">PC-{pc_no}</h4>}
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

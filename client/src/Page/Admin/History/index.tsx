import React from "react";
import HistoryStore from "../../../Store/HistoryStore";
import {Table} from "reactstrap";
import {observer} from "mobx-react-lite";
import moment from "moment";

const History: React.FC = () => {
  const {histories, getHistories} = React.useContext(HistoryStore);

  React.useEffect(() => {
    (async () => await getHistories())();
  }, [getHistories]);

  return (
    <Table>
      <thead>
      <tr>
        <th>SchoolID</th>
        <th>Name</th>
        <th>Course</th>
        <th>PC Number</th>
        <th>Time Entered</th>
      </tr>
      </thead>
      <tbody>
      {histories.map(({pcNo, student, timeEntered}, key) => (
          <tr key={key}>
            <td>{student.id}</td>
            <td>{student.firstname} {student.lastname}</td>
            <td>{student.course}</td>
            <td>{pcNo}</td>
            <td>{moment(timeEntered).format('MMMM Do YYYY, h:mm a')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

export default observer(History);

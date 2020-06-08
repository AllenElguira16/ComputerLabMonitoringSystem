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
        <th>Time Entered</th>
      </tr>
      </thead>
      <tbody>
      {histories.map((history, key) => (
          <tr key={key}>
            <td>{history.student.id}</td>
            <td>{history.student.firstname} {history.student.lastname}</td>
            <td>{history.student.course}</td>
            <td>{moment(history.timeEntered).format('MMMM Do YYYY, h:mm a')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

export default observer(History);

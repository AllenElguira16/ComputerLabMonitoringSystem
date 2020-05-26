import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

// Page Imports
import Welcome from "./Page/Home/Welcome";
import Login from "./Page/Home/Login";
import Admin from "./Page/Admin";
import { observer } from "mobx-react-lite";
import StudentStore from "./Store/StudentStore";

const App: React.FC = () => {
  const { isLoggedIn } = React.useContext(StudentStore);

  return (
    <div className="App full-page">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/admin/students"/>} />
          <Route exact path="/home" component={isLoggedIn === true ? Welcome : Login} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default observer(App);

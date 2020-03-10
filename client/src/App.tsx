import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
// Page Imports
import Welcome from "./Page/Home/Welcome";
import Login from "./Page/Home/Login";
import Admin from "./Page/Admin";
import { observer } from "mobx-react-lite";
import StudentStore from "./Store/StudentStore";

const App: React.FC = () => {
  const { isLoggedIn } = React.useContext(StudentStore);
  // const [userStore, setUserStore] = React.useState({
  //   isLoggedIn: false
  // });

  return (
    <div className="App full-page">
      <BrowserRouter>
        <Switch>
          {isLoggedIn === true ? (
            <Route exact path="/" component={Welcome} />
          ) : (
            <Route exact path="/" component={Login} />
          )}
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default observer(App);

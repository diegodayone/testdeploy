import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import Profile from "./components/Profile";
import {
  handleGetProfile,
  handleGetLoggedUser,
  handleGetAllPost
} from "../src/actions/profileActions";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Feeds from "./components/Feeds";
import RegistrationPage from "./components/RegistrationPage";

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  getProfileInfo: () => dispatch(handleGetProfile()),
  getAllPost: () => dispatch(handleGetAllPost()),
  getLoggedUser: () => dispatch(handleGetLoggedUser())
});
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    await this.props.getProfileInfo();
    await this.props.getAllPost();
    await this.props.getLoggedUser();
  };

  render() {
    return (
      <Router>
        <Route path="/">
          <NavBar />
        </Route>
        <Switch>
          <Route path="/register">
            <RegistrationPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/feeds/" />
          </Route>
          <Route path="/profile/:user">
            <Profile />
          </Route>
          <Route path="/feeds/">
            <Feeds />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

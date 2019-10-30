import React, { Component } from "react";
import { LocalForm, Control, Errors } from "react-redux-form";
import Form from "react-bootstrap/Form";
import Tooltip from "react-bootstrap/Tooltip";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { MdInfoOutline } from "react-icons/md";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = state => state;

const requiredValidator = val => val && val.length;
const emailValidator = val =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  );
const maxLengthValidator = len => val => !val || val.length <= len;
const minLengthValidator = len => val => !val || val.length >= len;
const passwordValidator = val =>
  /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/.test(val);

class RegistrationPage extends Component {
  constructor(params) {
    super(params);

    this.state = {
      isLoading: false,
      errMess: null,
      tooltipOpen: false,
      tooltipOpenEmail: false,
      registeredUser: "",
      redirect: false
    };
  }

  handleRegistration = async values => {
    try {
      var resp = await fetch("http://localhost:3090/user/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json"
        }
      });
      if (resp.ok) {
        var json = await resp.json();
        this.setState({ registeredUser: json.user.email, isLoading: false });
      } else {
        this.setState({ errMess: resp.status, isLoading: false });
      }
    } catch (err) {
      console.log(err.status);
      this.setState({ errMess: err });
    }
  };

  handleSubmit = async values => {
    this.setState({
      isLoading: true
    });
    await this.handleRegistration(values);
  };

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };
  toggleEmail = () => {
    this.setState({
      tooltipOpenEmail: !this.state.tooltipOpenEmail
    });
  };

  redirectFunction = () => {
    console.log("i'm inside redirectfunction");
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 1500);
  };

  handleRefresh = async token => {
    try {
      var resp = await fetch("http://localhost:3088/user/refresh", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token
        }
      });
      if (resp.ok) {
        var json = await resp.json();
        localStorage.setItem("token", json.token);
      }
    } catch (err) {
      console.log(err);
      this.setState({ errMess: err, redirect: true });
    } finally {
      this.setState({ redirect: true });
    }
  };

  componentDidMount = async () => {
    if (localStorage.getItem("token") !== null)
      await this.handleRefresh(localStorage.getItem("token"));
  };

  componentWillUnmount = () => {
    clearTimeout();
  };

  render() {
    return (
      <div className="container pt-4">
        <div className="container-fluid w-50" style={{ marginBottom: "80px" }}>
          {this.state.registeredUser === "" && !this.state.redirect && (
            <>
              <LocalForm
                style={{ width: "80%" }}
                onSubmit={values => this.handleSubmit(values)}
              >
                {/* EMAIL */}
                <Form.Group>
                  <Form.Label htmlFor="email">Email &#32; </Form.Label>
                  <Control.text
                    id="email"
                    model=".email"
                    className="form-control mb-1"
                    placeholder="Your email"
                    validators={{
                      emailValidator
                    }}
                  />

                  <Errors
                    model=".email"
                    show={{ touched: true, focus: false }}
                    className="form-error-message"
                    component="li"
                    messages={{
                      emailValidator: "The email should be a proper email "
                    }}
                  />
                </Form.Group>

                {/* PASSWORD */}
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Control.text
                    id="password"
                    model=".password"
                    className="form-control mb-1"
                    placeholder="Your password"
                    validators={{
                      passwordValidator,
                      minLengthValidator: minLengthValidator(8)
                    }}
                  />

                  <Errors
                    model=".password"
                    show={{ touched: true, focus: false }}
                    className="form-error-message"
                    component="li"
                    messages={{
                      minLengthValidator:
                        "Password should contain at least 8 character!",
                      passwordValidator:
                        "Password should contain at least 1 digit and at least 1 letter!"
                    }}
                  />
                </Form.Group>

                {/* NAME */}
                <Form.Group>
                  <Form.Label htmlFor="name">Name</Form.Label>

                  <Control.text
                    id="name"
                    model=".name"
                    className="form-control mb-1 mb-1"
                    placeholder="Your name"
                    validators={{
                      requiredValidator,
                      minLengthValidator: minLengthValidator(2),
                      maxLengthValidator: maxLengthValidator(20)
                    }}
                  />

                  <Errors
                    model=".name"
                    show={{ touched: true, focus: false }}
                    className="form-error-message"
                    component="li"
                    messages={{
                      requiredValidator: "Required",
                      minLengthValidator:
                        "The name field should have at least 2 chars",
                      maxLengthValidator:
                        "The name field should have max 20 chars"
                    }}
                  />
                </Form.Group>

                {/* SURNAME */}
                <Form.Group>
                  <Form.Label htmlFor="surname">Surname</Form.Label>
                  <Control.text
                    id="surname"
                    model=".surname"
                    className="form-control mb-1"
                    placeholder="Your Surname"
                    validators={{
                      requiredValidator,
                      minLengthValidator: minLengthValidator(3),
                      maxLengthValidator: maxLengthValidator(15)
                    }}
                  />

                  <Errors
                    model=".surname"
                    show={{ touched: true, focus: false }}
                    className="form-error-message"
                    component="li"
                    messages={{
                      requiredValidator: "Required",
                      minLengthValidator:
                        "The surname field should have at least 3 chars",
                      maxLengthValidator:
                        "The surname field should have max 15 chars"
                    }}
                  />
                </Form.Group>

                {/* BIO */}
                <Form.Group>
                  <Form.Label htmlFor="bio">A bio about yourself</Form.Label>
                  <Control.text
                    id=".bio"
                    model=".bio"
                    className="form-control mb-1"
                    placeholder="Biography"
                    validators={{
                      requiredValidator
                    }}
                  />
                  <Errors
                    model=".bio"
                    show={{ touched: true, focus: false }}
                    className="form-error-message"
                    component="li"
                    messages={{
                      requiredValidator: "Required!"
                    }}
                  />
                </Form.Group>

                {/* title */}
                <Form.Group>
                  <Form.Label htmlFor="title">Your title </Form.Label>
                  <Control.text
                    id=".title"
                    model=".title"
                    className="form-control mb-1"
                    placeholder="CTO at strive"
                    validators={{
                      requiredValidator
                    }}
                  />
                  <Errors
                    model=".title"
                    show={{ touched: true, focus: false }}
                    className="form-error-message"
                    component="li"
                    messages={{
                      requiredValidator: "Required!"
                    }}
                  />
                </Form.Group>

                {/* company */}
                <Form.Group>
                  <Form.Label htmlFor="company">Your Company </Form.Label>
                  <Control.text
                    id=".company"
                    model=".company"
                    className="form-control mb-1"
                    placeholder="Google.com"
                    validators={{
                      requiredValidator
                    }}
                  />
                  <Errors
                    model=".company"
                    show={{ touched: true, focus: false }}
                    className="form-error-message"
                    component="li"
                    messages={{
                      requiredValidator: "Required!"
                    }}
                  />
                </Form.Group>

                {/* area */}
                <Form.Group>
                  <Form.Label htmlFor="area">You're based at </Form.Label>
                  <Control.text
                    id=".area"
                    model=".area"
                    className="form-control mb-1"
                    placeholder="Berlin"
                    validators={{
                      requiredValidator
                    }}
                  />
                  <Errors
                    model=".area"
                    show={{ touched: true, focus: false }}
                    className="form-error-message"
                    component="li"
                    messages={{
                      requiredValidator: "Required!"
                    }}
                  />
                </Form.Group>

                {/* SUBMIT */}
                <Control.button
                  className="btn btn-secondary mr-2"
                  model="local"
                  disabled={{ valid: false }}
                >
                  Submit
                </Control.button>

                {/* RESET */}
                <Control.reset
                  className="btn btn-outline-secondary"
                  model="local"
                  type="reset"
                >
                  Reset
                </Control.reset>
              </LocalForm>
              {this.state.isLoading && (
                <Spinner className="d-inline" size="md" color="success" />
              )}
            </>
          )}
          {this.state.registeredUser !== "" && !this.state.redirect && (
            <Alert color="success">
              <h1 className="text-center">REGISTERED SUCCESSFULLY</h1>
              <h5>Being redirected to login page...</h5>
              {this.redirectFunction()}
              <Link to="/" className="alert-link">
                Press here if not redirected
              </Link>
            </Alert>
          )}
          {this.state.redirect && <Redirect to="/login" />}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(RegistrationPage));

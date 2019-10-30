import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import { TiPencil } from "react-icons/ti";
import Nav from "react-bootstrap/Nav";
import Experience from "./Experience";
import BioInformations from "./BioInformations";
import { GoPrimitiveDot } from "react-icons/go";
import { withRouter } from "react-router-dom";
import { handleSelectedProfile } from "../actions/profileActions";
import { handleSelectedExperience } from "../actions/experienceActions";
import { connect } from "react-redux";
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  selectProfile: user => dispatch(handleSelectedProfile(user)),
  selectExperience: user => dispatch(handleSelectedExperience(user))
});
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }
  componentDidMount = async () => {
    await this.props.selectProfile(this.props.match.params.user);
    await this.props.selectExperience(this.props.match.params.user);
  };
  render() {
    return (
      this.props.selectedProfile && (
        <>
          <Container className="pt-5 my-2 mb-3">
            <Row>
              <Col
                className="border border-dark px-0 shadow-sm"
                xs={12}
                md={{ span: 8 }}
              >
                <Container className="px-0" fluid>
                  <Row>
                    <Col xs={12}>
                      <Image
                        src="https://media.licdn.com/dms/image/C4E1BAQHYntWhqQpfhg/company-background_10000/0?e=2159024400&v=beta&t=OK0hCojam1ipjvPqyqfKmydfAgofinBUDSr0VZ79Y_U"
                        style={{ maxHeight: "180px" }}
                        className="w-100"
                      />
                    </Col>
                  </Row>
                </Container>
                <Container className="pl-0" style={{ backgroundColor: "#fff" }}>
                  <div className="d-flex justify-content-between">
                    <div className="py-2 px-4">
                      <Image
                        src={this.props.selectedProfile.image}
                        roundedCircle
                        alt=""
                        style={{
                          marginTop: "-100px",
                          position: "relative",
                          width: "150px",
                          height: "155px"
                        }}
                      />
                    </div>
                    {/* RIGHT BUTTONS */}

                    <div className="py-2">
                      <ButtonToolbar className="pt-2">
                        <DropdownButton
                          id="dropdown-item-button"
                          title={
                            this.props.selectedProfile.username === "user4"
                              ? "Add More Section"
                              : "Message"
                          }
                        >
                          <Dropdown.Item as="button">Action</Dropdown.Item>
                          <Dropdown.Item as="button">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item as="button">
                            Something else
                          </Dropdown.Item>
                        </DropdownButton>
                        <Button
                          variant="outline-primary "
                          className="mx-2 mr-3"
                        >
                          Others...
                        </Button>
                        {this.props.selectedProfile.username === "user4" && (
                          <TiPencil
                            size="35px"
                            style={{ cursor: "pointer" }}
                            className="mr-0"
                          />
                        )}
                      </ButtonToolbar>
                    </div>
                  </div>

                  {/* BIO INFO */}
                  <Container fluid className="px-0">
                    {this.props.selectedProfile.name !== undefined &&
                      this.props.error.message === "" && (
                        <div className="d-flex justify-content-start">
                          <ul className="list-unstyled pl-4 py-0 my-0">
                            <li>
                              <h5>{`${this.props.selectedProfile.name} ${this.props.selectedProfile.surname}`}</h5>
                            </li>
                            <li>{this.props.selectedProfile.title}</li>
                            <Row>
                              <Col xs={12}>
                                <Nav className="pl-0 ml-0">
                                  <Nav.Item className="px-0 ml-0 pl-0">
                                    <Nav.Link
                                      className="px-0 ml-0 pl-0"
                                      style={{
                                        letterSpacing: "0.4px",
                                        fontWeight: 300,
                                        color: "black"
                                      }}
                                    >
                                      {this.props.selectedProfile.area}
                                    </Nav.Link>
                                  </Nav.Item>
                                  <GoPrimitiveDot
                                    className="pt-3 text-muted"
                                    size="25px"
                                  />
                                  <Nav.Item className="px-0">
                                    <Nav.Link
                                      className="px-0 ml-0 pl-0"
                                      style={{
                                        letterSpacing: "0.4px",
                                        fontWeight: 500
                                      }}
                                    >
                                      500 + Links
                                    </Nav.Link>
                                  </Nav.Item>
                                  <GoPrimitiveDot
                                    className="pt-3 text-muted"
                                    size="25px"
                                  />
                                  <Nav.Item className="px-0">
                                    <Nav.Link
                                      className="px-0 ml-0 pl-0"
                                      style={{
                                        letterSpacing: "0.4px",
                                        fontWeight: 500
                                      }}
                                    >
                                      Other Info
                                    </Nav.Link>
                                  </Nav.Item>
                                </Nav>
                              </Col>
                            </Row>
                          </ul>
                        </div>
                      )}
                    {this.props.error.fetchError && (
                      <p>{this.props.error.message}</p>
                    )}
                  </Container>
                </Container>
              </Col>
              <Col
                className="border border-dark"
                xs={6}
                md={{ span: 3, offset: 1 }}
              >
                some other text
              </Col>
            </Row>
          </Container>
          <BioInformations />
          <Experience />
        </>
      )
    );
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);

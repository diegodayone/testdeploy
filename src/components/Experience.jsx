import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import MediaListItem from "./MediaListItem";
import { FiPlus } from "react-icons/fi";

const mapStateToProps = state => state;
class Experience extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Container className="mb-5 px-3">
          <Row>
            <Col
              xs={12}
              md={{ span: 8 }}
              style={{ backgroundColor: "#fff" }}
              className="border border-dark py-3 shadow-sm d-flex justify-content-start"
            >
              <Container className="px-0 mx-0" fluid>
                <Row>
                  <Col xs={12}>
                    <div className="d-flex justify-content-between align-items-middle pb-3">
                      <div>
                        <h5>Experience</h5>
                      </div>
                      <span className="d-block">
                        {this.props.selectedProfile.username ===
                          this.props.loggedUser.username && (
                          <FiPlus
                            size="35px"
                            className="pb-1"
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </span>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <ul className="list-unstyled">
                      {this.props.experience.length > 0 &&
                        this.props.experience.map((current, index) => (
                          <>
                            <MediaListItem key={index} experience={current} />;
                            <hr
                              className="pl-2 mt-0 pt-0"
                              style={{ color: "black" }}
                            />
                          </>
                        ))}
                    </ul>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps)(Experience);

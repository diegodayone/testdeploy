import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TiPencil } from "react-icons/ti";
import ReadMoreReact from "read-more-react";

const mapStateToProps = state => state;
class BioInformations extends Component {
  render() {
    return (
      <Container className="my-3 pb-1">
        <Row>
          <Col
            xs={12}
            md={{ span: 8 }}
            style={{ backgroundColor: "#fff" }}
            className="border border-dark px-0 pb-3 shadow-sm"
          >
            <div className="d-flex justify-content-between align-items-baseline px-3 py-2">
              <div className="pl-1">
                <h5>About</h5>
              </div>
              <div>
                {this.props.selectedProfile.username === "user4" && (
                  <TiPencil
                    size="35px"
                    style={{ cursor: "pointer" }}
                    className="mr-0 pb-1"
                  />
                )}
              </div>
            </div>
            <div className="justify-content-start pl-4 pr-auto py-2">
              {this.props.selectedProfile.bio && (
                <ReadMoreReact
                  text={this.props.selectedProfile.bio}
                  min={100}
                  ideal={130}
                  max={250}
                  readMoreText={"... read more"}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(BioInformations);

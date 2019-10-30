import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostSection from "./PostSection";

export default class Feeds extends Component {
  render() {
    return (
      <Container fluid className="mt-3">
        <Container>
          <Row>
            <Col
              xs={0}
              style={{ maxHeight: "300px" }}
              md={{ span: 2 }}
              className="border border-dark"
            >
              Aside overview
            </Col>
            <Col xs={12} md={{ span: 6 }}>
              <PostSection />
            </Col>
            <Col xs={3} md={{ span: 2, offset: 1 }}></Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

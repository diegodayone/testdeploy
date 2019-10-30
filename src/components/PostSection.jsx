import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  handlePostComment,
  handleDeleteComment,
  handleEditComment
} from "../actions/postActions";

import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import Moment from "react-moment";
import { TiPencil } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import ModalEditComment from "./ModalEditComment";

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  handleSubmit: message => dispatch(handlePostComment(message)),
  handleDelete: id => dispatch(handleDeleteComment(id)),
  handleEdit: (id, text) => dispatch(handleEditComment(id, text))
});

class PostSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      modalShow: false,
      currentPost: null
    };
  }

  componentDidUpdate;

  handleChange = ({ currentTarget: { value } }) => {
    this.setState({ message: value });
  };

  handleSubmitLocal = async event => {
    event.preventDefault();
    try {
      await this.props.handleSubmit(this.state.message);
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ message: "" });
    }
  };

  getImage = username => {
    const profile = this.props.profiles.find(el => el.username === username);
    return profile !== undefined && profile.image !== undefined
      ? profile.image
      : "https://via.placeholder.com/130";
  };

  getNameAndSurname = username => {
    const profile = this.props.profiles.find(el => el.username === username);
    return profile !== undefined &&
      profile.name !== undefined &&
      profile.surname !== undefined
      ? `${profile.name} ${profile.surname}`
      : "User not found";
  };

  getTitle = username => {
    const profile = this.props.profiles.find(el => el.username === username);
    return profile !== undefined && profile.title !== undefined
      ? profile.title
      : "";
  };

  render() {
    return (
      <>
        <ModalEditComment
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false, currentPost: null })}
          currentpost={this.state.currentPost}
          loggedUser={this.props.loggedUser}
          handleEdit={this.props.handleEdit}
        />
        <Container fluid className="border border-dark ml-4 mb-2 pt-3">
          <Form className="pb-3" onSubmit={this.handleSubmitLocal}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                placeholder="Start a new post..."
                as="textarea"
                rows="3"
                onChange={e => this.handleChange(e)}
                value={this.state.message}
              />
            </Form.Group>
            <Button type="submit">Send comment</Button>
          </Form>
        </Container>
        {this.props.postlist.length &&
          this.props.postlist.map((currentPost, index) => (
            <Container
              key={index}
              fluid
              className="border border-dark ml-4 mb-2 pt-3"
            >
              <Media as="li" key={index}>
                <Image
                  width={60}
                  height={60}
                  className="mr-3"
                  roundedCircle
                  src={this.getImage(currentPost.username)}
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <div className="d-flex mb-0 pb-0 justify-content-between align-items-baseline ">
                    <h6
                      style={{ lineHeight: 0.5 }}
                      className="mb-0 pb-0 d-block"
                    >
                      {this.getNameAndSurname(currentPost.username)}
                    </h6>
                    <div>
                      {" "}
                      {currentPost.username ===
                        this.props.loggedUser.username && (
                        <>
                          <TiPencil
                            size="25px"
                            style={{ cursor: "pointer" }}
                            className="mr-0 mb-0"
                            onClick={() =>
                              this.setState({
                                modalShow: true,
                                currentPost: currentPost
                              })
                            }
                          />
                          <MdDelete
                            onClick={() =>
                              this.props.handleDelete(currentPost._id)
                            }
                            size="25px"
                            style={{ cursor: "pointer" }}
                            className="mr-0 mb-0"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <p className="mb-0" style={{ fontSize: "14px" }}>
                    {this.getTitle(currentPost.username)}{" "}
                  </p>
                  <p className="text-muted " style={{ fontSize: "14px" }}>
                    {currentPost.createdAt === currentPost.updatedAt ? (
                      <Moment fromNow>{currentPost.createdAt}</Moment>
                    ) : (
                      currentPost.createdAt !== currentPost.updatedAt && (
                        <>
                          Edited{" "}
                          <Moment fromNow>{currentPost.updatedAt}</Moment>
                        </>
                      )
                    )}
                  </p>
                  <p className="pt-0" style={{ fontSize: "14px" }}>
                    {currentPost.text}
                  </p>
                </Media.Body>
              </Media>
            </Container>
          ))}
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSection);

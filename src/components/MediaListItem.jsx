import React, { Component } from "react";
import Media from "react-bootstrap/Media";
import Moment from "react-moment";
import { GoPrimitiveDot } from "react-icons/go";
import { TiPencil } from "react-icons/ti";

export default class MediaListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Media as="li">
        <img
          width={60}
          height={60}
          className="mr-3"
          src={this.props.experience.image || "https://via.placeholder.com/130"}
          alt="Generic placeholder"
        />
        <Media.Body>
          <div className="d-flex mb-0 pb-0 justify-content-between align-items-baseline ">
            <h6 style={{ lineHeight: 0.5 }} className="mb-0 pb-0 d-block">
              {this.props.experience.role}
            </h6>
            <div>
              {" "}
              {this.props.experience.username === "user4" && (
                <TiPencil
                  size="25px"
                  style={{ cursor: "pointer" }}
                  className="mr-0 mb-0"
                />
              )}
            </div>
          </div>
          <p className="mb-0" style={{ fontSize: "14px" }}>
            {this.props.experience.company}{" "}
          </p>
          <p className="text-muted " style={{ fontSize: "14px" }}>
            <Moment format="YYYY MMM">{this.props.experience.startDate}</Moment>
            {" - "}
            {this.props.experience.endDate !== undefined ? (
              <>
                <Moment format="YYYY MMM">
                  {this.props.experience.startDate}
                </Moment>
              </>
            ) : (
              "Present  "
            )}
            <GoPrimitiveDot className="pb-1 px-1 pr-1" size="11px" />
            <Moment fromNow ago>
              {this.props.experience.startDate}
            </Moment>
            <br />
            {this.props.experience.area}
          </p>
          <p className="pt-0" style={{ fontSize: "14px" }}>
            {this.props.experience.description}
          </p>
        </Media.Body>
      </Media>
    );
  }
}

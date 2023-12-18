import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import NVD3Chart from "react-nvd3";
import { connect } from "react-redux";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datum: [],
      NoOfStudents: 0,
      SchoolName: "",
      PendingInvoiceValue: 0,
      SettledPaymentValue: 0,
      StudentRegistrationsToday: 0,
      ApplicationsTodayViaPortal: 0,
      CourseRegList: [],
      chartData: [],
      chartObject: [],
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col md={6} xl={6}>
            <h2 className="f-w-300">{this.state.SchoolName}</h2>
            <p>Showing information for your default </p>
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={4}>

          </Col>
          <Col md={6} xl={4}>

          </Col>
          <Col xl={4}>

          </Col>
          <Col md={6} xl={4}>

          </Col>
          <Col md={6} xl={4}>

          </Col>

          <Col md={12} xl={12}>

          </Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.loggedReducer,
  };
};

export default connect(mapStateToProps)(Dashboard);

import React from "react";
import { Container, Row, Col } from "reactstrap";
import VerticalBar from "./PaymentByCategory";
import EarningsPerCategory from "./EarningsPerCategory";
import ApplicantsCountPerCategory from "./ApplicantsCountPerCategory";
import RatingsByCategory from "./RatingsByCategory";
import TasksByCategory from "./TasksByCategory";
import TaskCountbyCategory from "./TaskCountbyCategory";
import PaymentByCategory from "./PaymentByCategory";
class SponsorAnalytics extends React.Component {
  render() {
    return (
      <Container className="border p-5">
        <hr />
        <Row xs="2" style={{ marginTop: "1%" }}>
          <Col
            style={{ height: "400px", width: "500px" }}
            className="border-right"
          >
            <h3 className="mt-2 "> Average Payment by category </h3>
            <hr />
            <PaymentByCategory />
          </Col>
          <Col style={{ height: "400px", width: "500px" }}>
            <h3 className="mt-2 ">Applicants count per category</h3>

            <hr />
            <ApplicantsCountPerCategory />
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <hr />
        <Row xs="2" style={{ marginTop: "4%" }}>
          <Col style={{ height: "400px" }} className="border-right">
            <h3 className="mt-2 "> All Tasks by Category </h3>
            <hr />
            <TasksByCategory />
          </Col>
          <Col style={{ height: "400px" }}>
            <h3 className="mt-2">Completed Tasks by Category </h3>
            <hr />
            <TasksByCategory />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SponsorAnalytics;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import VerticalBar from "./PaymentByCategory";
import EarningsPerCategory from "./EarningsPerCategory";
import ApplicantsCountPerCategory from "./ApplicantsCountPerCategory";
import RatingsByCategory from "./RatingsByCategory";
import TasksByCategory from "./TasksByCategory";
import TaskCountbyCategory from "./TaskCountbyCategory";
import PaymentByCategory from "./PaymentByCategory";
import CompletedTasksByCategory from "./CompletedTasksByCategory";
class SponsorAnalytics extends React.Component {
  render() {
    return (
      <Container className="border p-5">
        <hr />
        <Row xs="2" style={{ marginTop: "1%" }}>
          <Col style={{ height: "50%", width: "40%" }} className="border-right">
            <h3 className="mt-2 "> Average Payment by category </h3>
            <hr />
            <PaymentByCategory />
          </Col>
          <Col>
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
          <Col className="border-right">
            <h3 className="mt-2 "> All Tasks by Category </h3>
            <hr />
            <TasksByCategory />
          </Col>
          <Col>
            <h3 className="mt-2">Completed Tasks by Category </h3>
            <hr />
            <CompletedTasksByCategory />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SponsorAnalytics;

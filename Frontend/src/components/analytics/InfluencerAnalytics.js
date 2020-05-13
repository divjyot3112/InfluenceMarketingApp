import React from "react";
import {Container, Row, Col} from "reactstrap";
import EarningsPerCategory from "./EarningsPerCategory";
import RatingsByCategory from "./RatingsByCategory";
import TaskCountbyCategory from "./TaskCountbyCategory";

class InfluencerAnalytics extends React.Component {
    render() {
        return (
            <Container className="border p-5">
                <hr/>
                <Row xs="2" style={{marginTop: "1%"}}>
                    <Col>
                        <h3 className="mt-2 " style={{color: "red"}}>
                            {" "}
                            Total Earnings by Category{" "}
                        </h3>
                        <hr/>
                        <EarningsPerCategory/>
                    </Col>
                </Row>
                <br/>
                <hr/>
                <Row xs="2" style={{marginTop: "2%"}}>
                    <Col className="border-right">
                        <h3 className="mt-2 " style={{color: "blue"}}>
                            Average Ratings by Category{" "}
                        </h3>
                        <hr/>
                        <RatingsByCategory/>
                    </Col>
                    <Col>
                        <h3 className="mt-2" style={{color: "green"}}>
                            Tasks Completed by Category{" "}
                        </h3>
                        <hr/>
                        <TaskCountbyCategory/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default InfluencerAnalytics;

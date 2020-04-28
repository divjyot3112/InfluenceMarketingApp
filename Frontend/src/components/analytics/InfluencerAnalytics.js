import React from "react";
import { Container, Row, Col } from 'reactstrap';
import VerticalBar from "./VerticalBar";
import HorizontalBarG from "./HorizontalBar";

class InfluencerAnalytics extends React.Component{
    render() {
        return (
            <Container>
                <h4>Influencer Analytics</h4>
            <Row xs="2" style={{marginTop:"5%"}}>
                <Col style={{ height: "300px" }}><VerticalBar></VerticalBar></Col>
                <Col style={{ height: "400px" }}><HorizontalBarG></HorizontalBarG></Col>
                    
            </Row>
               
            <Row xs="2" style={{marginTop:"5%"}}>
                <Col style={{ height: "400px" }}><VerticalBar></VerticalBar></Col>
                <Col style={{ height: "400px" }}><VerticalBar></VerticalBar></Col>
            </Row>
            </Container>
        )
    }
}

export default InfluencerAnalytics;
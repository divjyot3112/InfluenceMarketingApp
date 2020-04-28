import React from "react";
import TopSymptoms from './VerticalBar';
import ProfileViews from './HorizontalBar';
import { Container, Row, Col } from 'reactstrap';

class SponsorAnalytics extends React.Component{
    render() {
        return (
            <Container>
                <h4>Sponsor Analytics</h4>
            <Row xs="2" style={{marginTop:"5%"}}>
                <Col style={{ height: "300px" }}><TopSymptoms></TopSymptoms></Col>
                <Col style={{ height: "400px" }}><ProfileViews></ProfileViews></Col>
                    
            </Row>
               
            <Row xs="2" style={{marginTop:"5%"}}>
                <Col style={{ height: "400px" }}><TopSymptoms></TopSymptoms></Col>
                <Col style={{ height: "400px" }}><TopSymptoms></TopSymptoms></Col>
            </Row>
            </Container>
        )
    }
}

export default SponsorAnalytics;
import React from 'react';
import './App.css';
import Exchange from "./Components/Content/Exchange";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
    return (
        <Container fluid="md">
            <Row>
                <Col><Exchange/></Col>
            </Row>
        </Container>
    );
}

export default App;

import React from 'react';
import { Navbar, Nav, Container, Row, Col, Card} from 'react-bootstrap';
import LogoutButton from '../components/handleLogout';
import { useState } from 'react';
import Display from '../components/Display';

const Homepage = (props) => {
    const { setUser } = props;
    const [eventList, setEventList] = useState([]);

    return (
        <div>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">iSport</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link href="/create-event">Create Event</Nav.Link>
                        </Nav>
                        <LogoutButton setUser={setUser} />
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <Container className="mt-4">
                <Row>
                    <Col md={8}>
                        <h2>Upcoming Pickup Games</h2>
                        <Display eventList={eventList} setEventList={setEventList} /> 
                    </Col>
                    <Col md={4}>
                        <h2>My Pick Games</h2>
                        {/* List of My Sports */}
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Sport Name</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/* Repeat Card component for other sports */}
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className="bg-dark text-white mt-5 p-4 text-center">
                Copyright © 2023 iSport
            </footer>
        </div>
    );
};

export default Homepage;

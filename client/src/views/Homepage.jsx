import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Display from '../components/EventDisplay';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const [eventList, setEventList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const userToken = Cookies.get('userToken');
        if (!userToken) {
            navigate('/login');
        } else {
            fetch('http://localhost:8000/api/events/')
                .then(response => response.json())
                .then(data => setEventList(data))
                .catch(error => console.log(error));
        }
    }, [navigate]);

    return (
        <div>
            <Container className="mt-4">
                <Row>
                    <Col md={8}>
                        <h2>Upcoming Pickup Games</h2>
                        <Display eventList={eventList.events}/>
                    </Col>
                    <Col md={4}>
                        <h2>My Pickup Games</h2>
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
        </div>
    );
};

export default Homepage;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Display from '../components/EventDisplay';
import UserDisplay from '../components/UserDisplay';
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
                .then(data => setEventList(data.events))
                .catch(error => console.log(error));
        }
    }, [navigate]);

    return (
        <div>
            <Container className="mt-4">
                <Row>
                    <Col md={8}>
                        <h2>Upcoming Pickup Games</h2>
                        <Display eventList={eventList}/>
                    </Col>
                    <Col md={4}>
                        <h2>My Pickup Games</h2>
                        <UserDisplay eventList={eventList} setEventList={setEventList}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Homepage;

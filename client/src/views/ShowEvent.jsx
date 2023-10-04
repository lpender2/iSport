import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Form, Button, Alert, Card } from 'react-bootstrap';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const ShowEvent = () => {
    const [event, setEvent] = useState(null); // Initialize event state to null
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    const { id } = useParams();
    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return new Date(1970, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    useEffect(() => {
        const userToken = Cookies.get('userToken');
        if (!userToken) {
            navigate('/login');
        }
    });

    // Fetch event details from the API
    useEffect(() => {
        if (!id) return;  // If the event ID is undefined, return early and do nothing
        axios.get(`http://localhost:8000/api/events/${id}`)
            .then(response => {
                console.log("Event Data:", response.data);
                setEvent(response.data);

            })
            .catch(error => {
                console.error('Error fetching event details:', error.response.status, error.response.data);
            });            
    }, [id]);

    const handleNewMessageSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!newMessage.trim()) {
            setError('Please enter a message');
            return;
        }

        // Retrieve user's data from the cookies
        const userData = Cookies.get('user');

        if (!userData) {
            setError('User data not found. Please login again.');
            return;
        }

        // Parse the user data to get the first name
        const userFirstName = JSON.parse(decodeURIComponent(userData)).firstName;

        try {
            const updatedMessages = [
                ...(event.event.messages || []),
                {
                    text: newMessage,
                    userFirstName: userFirstName
                }
            ];

            // Update the backend
            await axios.put(`http://localhost:8000/api/events/${id}`, {
                messages: updatedMessages
            });

            // Update the local state
            setEvent((prevEvent) => ({
                ...prevEvent,
                event: {
                    ...prevEvent.event,
                    messages: updatedMessages
                }
            }));

            console.log('New message added:', newMessage);

            // Clear the message input box
            setNewMessage('');
        } catch (error) {
            setError(error.message);
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header as="h2">{event.event.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Date:</strong> {formatDate(event.event.date)}<br />
                        <strong>Time:</strong> {formatTime(event.event.time)}<br />
                        <strong>Location:</strong> {event.event.location}
                    </Card.Text>

                    {/* Google Maps View */}
                    <div className="mb-4">
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '400px' }}
                            center={{ lat: event.event.coordinates.latitude, lng: event.event.coordinates.longitude }}
                            zoom={15}
                        >
                            <Marker position={{ lat: event.event.coordinates.latitude, lng: event.event.coordinates.longitude }} />
                        </GoogleMap>
                    </div>

                    <h3 className="mt-4">Messages</h3>
                    <ListGroup className="mb-3">
                        {event.event.messages.map((messageObj, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{messageObj.userFirstName}:</strong> {messageObj.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleNewMessageSubmit}>
                        <Form.Group controlId="newMessage">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={handleNewMessageChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send Message
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ShowEvent;
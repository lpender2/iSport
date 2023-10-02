import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateEventPage = (props) => {
    const { user } = props;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        userId: user?._id || '',
        
    });
    // Check to see if user is logged in
    console.log('User Prop:', user);

    const [error, setError] = useState(''); // State to handle error messages

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    useEffect(() => {
        const userToken = Cookies.get('userToken');
        if (!userToken) {
            navigate('/login');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Form validation before sending to backend
        if (!formData.title || !formData.date || !formData.time || !formData.location) {
        setError('Please fill in all fields');
        return;
        }

        try {
        // Send POST request to backend to create event
        console.log('Sending formData:', formData);
        await axios.post('http://localhost:8000/api/events', formData);

        // Redirect to homepage
        console.log('Event created:', formData);
        navigate('/dashboard');
        } catch (error) {
        console.error(error.response?.data || error);
        setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <Container className="mt-5">
        <h2>Create Event</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="userId" className="d-none">
            <Form.Control type="hidden" name="userId" value={formData.userId || ''} readOnly />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
            Create Event
            </Button>
        </Form>
        </Container>
    );
};

export default CreateEventPage;
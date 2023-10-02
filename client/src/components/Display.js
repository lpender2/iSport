import React, { useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const Display = (props) => {
    const { eventList, setEventList } = props;

    useEffect(() => {
        axios.get('/api/events')
            .then(res => setEventList(res.data))
            .catch(err => console.log(err));
    }, [setEventList]);

    return (
        <div>
            {eventList.map((event, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>{event.description}</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Display;


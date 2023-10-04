import { Card, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Display = (props) => {
    const { eventList} = props;

    const userData = Cookies.get('user');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const loggedInUserId = parsedUserData ? parsedUserData._id : null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return new Date(1970, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    if (!eventList || !Array.isArray(eventList)) {
        return <div>Error: eventList is not an array.</div>;
    }

    // Filter out events created by the logged-in user
    const filteredEvents = eventList.filter(event => event.userId !== loggedInUserId);

    // Sort events based on how soon they are to today's date
    const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div>
            {sortedEvents.map((event, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body className="d-flex align-items-center justify-content-between">
                        <div>
                            <Card.Title>{event.title}</Card.Title>
                            <Card.Text>
                                <strong>Date:</strong> {formatDate(event.date)} <br />
                                <strong>Time:</strong> {formatTime(event.time)} <br />
                                <strong>Location:</strong> {event.location} <br />
                            </Card.Text>
                            <Link to={`/events/${event._id}`}>
                                <Button variant="primary">Go to Event Page!</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Display;



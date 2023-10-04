import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


const Display = (props) => {
    const { eventList, setEventList } = props;
    
    const userData = Cookies.get('user');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const loggedInUserId = parsedUserData ? parsedUserData._id : null;
    console.log('loggedInUserId:', loggedInUserId);
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
    
    return (
        <div>
            {eventList.map((event, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>
                            <strong>Date:</strong> {formatDate(event.date)} <br />
                            <strong>Time:</strong> {formatTime(event.time)} <br />
                            <strong>Location:</strong> {event.location} <br />
                            {/* You can continue to add more fields as needed */}
                        </Card.Text>
                        <Link to={`/events/${event._id}`}>Go to Event Page!</Link>
                        {event.userId === loggedInUserId && (
                            <Button variant="danger" onClick={() => handleDelete(event._id.$oid)}>
                                Delete
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );

    function handleDelete(eventId) {
        axios.delete(`/api/events/${eventId}`)
            .then(response => {
                console.log('Event deleted successfully:', response.data);
                setEventList(prevEventList => prevEventList.filter(event => event._id.$oid !== eventId));
            })
            .catch(error => {
                console.error('Error deleting event:', error);
            });
    }

}

export default Display;


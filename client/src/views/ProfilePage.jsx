import React, { useState, useEffect } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import LogoutButton from '../components/handleLogout';
import defaultAvatar from '../components/images/defaultAvatar.png';
import axios from 'axios';
import Display from '../components/EventDisplay';

const ProfilePage = ({ user }) => {
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        // Fetch all events
        axios.get('http://localhost:8000/api/events/')
            .then(response => {
                // Filter events based on userId
                const filteredEvents = response.data.events.filter(event => event.userId === user._id);
                setUserEvents(filteredEvents);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [user._id]);

    const handleEditProfile = () => {
        // Logic to edit profile
        console.log('Edit Profile');
    };

    return (
        <Container className="mt-5">
            <div className="align-items-center text-center">
                {/* User Avatar */}
                <Image src={user.avatar || defaultAvatar} roundedCircle width="150" alt="User Avatar" />
                
                <h2 className="mt-3">{user.firstName} {user.lastName}</h2> {/* User's Name */}
                <p>Email: {user.email}</p> {/* Email */}
                <div className="d-flex justify-content-center mt-3 mb-3"> {/* Added this div to center the button */}
                    <Button variant="primary" onClick={handleEditProfile} className="mr-3">
                        Edit Profile
                    </Button>
                </div>
                <LogoutButton user={user} />
            </div>
            <h3 className="mt-5">My Events</h3>
            <Display eventList={userEvents} />
        </Container>
    );
};

export default ProfilePage;


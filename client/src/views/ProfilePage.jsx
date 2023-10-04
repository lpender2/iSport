import React, { useState, useEffect } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import LogoutButton from '../components/handleLogout';
import defaultAvatar from '../components/images/defaultAvatar.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserDisplay from '../components/UserDisplay'; // Import UserDisplay

const ProfilePage = ({ user }) => {
    const [userEvents, setUserEvents] = useState([]);

    // Fetch user data from cookies
    const userData = Cookies.get('user');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const loggedInUserId = parsedUserData ? parsedUserData._id : null;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/')
            .then(response => {
                // Filter events based on userId
                const filteredEvents = response.data.events.filter(event => event.userId === loggedInUserId);
                setUserEvents(filteredEvents);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [loggedInUserId]);

    const handleEditProfile = () => {
        // Logic to edit profile
        console.log('Edit Profile');
    };

    return (
        <Container className="mt-5">
            <div className="align-items-center text-center">
                {/* User Avatar */}
                <Image src={parsedUserData.avatar || defaultAvatar} roundedCircle width="150" alt="User Avatar" />
                
                <h2 className="mt-3">{parsedUserData.firstName} {parsedUserData.lastName}</h2> {/* User's Name */}
                <p>Email: {parsedUserData.email}</p> {/* Email */}
                <div className="d-flex justify-content-center mt-3 mb-3"> {/* Added this div to center the button */}
                    <Button variant="primary" onClick={handleEditProfile} className="mr-3">
                        Edit Profile
                    </Button>
                </div>
                <LogoutButton user={parsedUserData} />
            </div>
            <h3 className="mt-5">My Events</h3>
            <UserDisplay eventList={userEvents} setEventList={setUserEvents} />
        </Container>
    );
};

export default ProfilePage;



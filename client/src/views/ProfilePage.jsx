import React, { useState } from 'react';
import { Container, ListGroup, Button, Image } from 'react-bootstrap';


const ProfilePage = (props) => {
    // Sample user data, replace it with actual user data from your state or API
    const [user] = props;

    const handleEditProfile = () => {
        // Logic to edit profile
        console.log('Edit Profile');
    };

    const handleLogout = () => {
        // Logic to logout
        console.log('Logged Out');
    };

    return (
        <Container className="mt-5">
        <div className="text-center">
            <h2 className="mt-3">{user.name}</h2> {/* Username */}
            <p>{user.email}</p> {/* Email */}
            <Button variant="primary" onClick={handleEditProfile} className="mr-3">
            Edit Profile
            </Button>
        </div>
        <h3 className="mt-5">My Events</h3>
        <ListGroup>
            {user.events.map((event, index) => (
            <ListGroup.Item key={index}>{event}</ListGroup.Item> 
            ))}
        </ListGroup>
        </Container>
    );
};

export default ProfilePage;
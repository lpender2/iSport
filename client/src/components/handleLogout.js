import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogoutButton = (props) => {
    const { setUser } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user cookies
        Cookies.remove('user');
        Cookies.remove('userToken');

        // Clear user state
        setUser({});

        // Navigate back to login page
        navigate('/');
    };

    return (
        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
    );
};

export default LogoutButton;

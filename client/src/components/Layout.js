// Layout.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LogoutButton from './handleLogout';

const Layout = ({ children, user, setUser }) => {
    return (
        <>
        {user && Object.keys(user).length > 0 &&(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="#home">iSport</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/create-event">Create Pickup Game</Nav.Link>
                </Nav>
                <LogoutButton setUser={setUser} />
            </Navbar.Collapse>
            </Container>
        </Navbar>
        )}
        {children}
        <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright © 2023 iSport
        </footer>
        </>
    );
};

export default Layout;

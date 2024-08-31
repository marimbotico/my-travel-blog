import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import CreatePostModal from "../modals/CreatePostModal";
import "./Navbar.css";

function CustomNavbar({ addPost }) {// passes the function addPost to the navbar from the parent
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-4 shadow-sm">
            {/* Bootstrap navigation bar set up copied from react-bootstrap*/}
            <Container>
                <Navbar.Brand as={Link} to="/" className="logo">
                    MyBlog
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Me</Nav.Link>
                    </Nav>
                    <Nav>
                        {/* A modal is a component that overlays other content on a webpage. It's used as 
                        a UI element to prompt user interaction */}
                        <CreatePostModal addPost={addPost} />
                        {/* passing the addPost function as a prop. 
                        This allows the modal to call addPost when a new post is created, updating the 
                        state in the parent App component. */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;

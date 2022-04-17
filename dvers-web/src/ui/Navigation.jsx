import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Navigation extends Component {
    
    showUserPage() {
        let logged = sessionStorage.getItem("logged");
        if (logged) {
            return (
                <Nav.Link as={Link} to="/profile">Профил</Nav.Link>
            );
        }
        else {
            return (
                [
                    <Nav.Link as={Link} to="/login">Вход</Nav.Link>,
                    <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
                ]
            );
        }
    }

    render() {
        return(
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Dvers</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Стоки</Nav.Link>
                        </Nav>
                        <Nav>
                            {this.showUserPage()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
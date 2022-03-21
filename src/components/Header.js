import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { auth } from '../utils/firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate()

    const logout = async () => {
        await signOut(auth)
        navigate('/login')
    }

  return (

    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="/">MBNDigital-bookstore</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {auth.currentUser && <>
                <LinkContainer to='/books'>
                    <Nav.Link>Books</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/newbook'>
                    <Nav.Link>New Book</Nav.Link>
                </LinkContainer>
                </>}
            </Nav>
            <Nav>
               {!auth.currentUser && <LinkContainer to='/register'>
                <Nav.Link>Register</Nav.Link>
                </LinkContainer>} 
                {!auth.currentUser && <LinkContainer to='/login'>
                <Nav.Link> Log In</Nav.Link>
                </LinkContainer>}
                {auth.currentUser && 
                <Nav.Link>{auth.currentUser.email}</Nav.Link>
                }
                {auth.currentUser && 
                <Nav.Link onClick={logout}>Log out</Nav.Link>}
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = (props) => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/" className="nav-link">
            <Navbar.Brand>
              <img
                className="img-responsive"
                src="/ZingImages/logo.png"
                alt="Chania"
                style={{ width: '60px' }}
              ></img>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" style={{ float: 'right' }}>
              <LinkContainer to="/shop" className="nav-link">
                <Nav.Link>
                  <i className="fas fa-shopping-bag"></i> Shop
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signin" className="nav-link">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup" className="nav-link">
                <Nav.Link>
                  <i className="fas fa-user-plus"></i> Sign Up
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart" className="nav-link">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

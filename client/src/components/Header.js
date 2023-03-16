import React,{useState, useEffect} from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {CART_RESET} from "../actions/cart/cart.types"
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { getUserDetails, logout } from '../actions/user/user.action'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const { cartItems,shippingAddress } = cart;
  const [count, setCount] = useState(0);

  //we got useInfo from the userLogin state.
  const { userInfo } = userLogin

  useEffect(() => {
		if ( userInfo) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(getUserDetails(user.email));
		}
	}, [dispatch, userInfo]);

  useEffect(() => {
		setCount(cartItems.reduce((acc, item) => acc + item.qty, 0));
	}, [cartItems]);

  const logoutHandler = () => {
    dispatch(logout())
    window.location.href = '/';
  }

  return (
    <header>
      <Navbar className='py-1' bg="dark" variant="dark" expand="lg" collapseOnSelect fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                className="img-responsive"
                src="/logo512.png"
                alt="Chania"
                style={{ width: '60px' }}
              ></img>
              <h3 className='text-white'>Yoga Store</h3>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />

            <Nav className="ml-auto" style={{ textAlign: 'right' }}>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown className='mr-0' title={userInfo.name} id="username">
                  <LinkContainer to="/user/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productList">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderList">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

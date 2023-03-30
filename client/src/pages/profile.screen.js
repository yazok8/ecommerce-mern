import React, { useState, useEffect } from 'react'

import { Table, Row, Col, Button, Form, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile } from '../actions/user/user.action'
import { listMyOrders } from '../actions/order/order.action'
import { LinkContainer } from 'react-router-bootstrap'
import ToDateString from '../utils/ToDateString';

const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showSubmitButton, setShowSubmitButton] = useState(false); // sisable the submit button unless some user detail is changed by user
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null);
  const [allOrders, setAllOrders] = useState([]);

  const dispatch = useDispatch()

  //userLogin from the root reducer.
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderMyList = useSelector((state) => state.orderMyList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList
  
  useEffect(() => {
		if (orders && orders.length) {
			setAllOrders([...orders]);
		}
	}, [orders]);

  useEffect(() => {
    if (userInfo) {
			if (name && userInfo.name !== name) setShowSubmitButton(true);
			else if (email && userInfo.email !== email)
				setShowSubmitButton(true);
			else if (password || confirmPassword) setShowSubmitButton(true);
			else setShowSubmitButton(false);
		}
	}, [name, email, password, confirmPassword, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match. Please retry.');
		} else {
			dispatch(
				updateUserProfile({
					id: user.id,
					name,
					email,
					password,
					confirmPassword,
				})
			);
		}
  }

  useEffect(() => {
		dispatch(listMyOrders());
	}, [dispatch]);

  return (
    <Row>
      <Col md={3}>
        <h5>User Profile</h5>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="Email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>

            <Form.Group onSubmit={submitHandler}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group onSubmit={submitHandler}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form.Group>
          <Button disabled={!showSubmitButton} type="submit" variant="primary">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        
      {allOrders.length ? (
					<>
						<h2 className='text-center'>My Orders</h2>
						{loadingOrders ? (
							<Loader />
						) : errorOrders ? (
							<Message dismissible variant='danger' duration={10}>
								{errorOrders}
							</Message>
						) : (
							<Table
								striped
								bordered
								responsive
								className='table-sm text-center'>
								<thead>
									<tr>
										<th>DATE</th>
										<th>TOTAL</th>
										<th>PAID</th>
										<th>DELIVERED</th>
										<th>ACTION</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order, idx) => (
										<tr
											key={idx}
											style={{
												textAlign: 'center',
												padding: '0',
											}}>
											<td>
												{ToDateString(order.createdAt)}
											</td>
											<td>
												{order.totalPrice}
											</td>
											<td>
												{order.isPaid ? (
													order.paidAt.substring(0, 10)
												) : (
													<i
														className='fas fa-times'
														style={{
															color: 'red',
														}}
													/>
												)}
											</td>
          
											<td>
												{order.isDelivered ? (
													order.deliveredAt.subString(0,10)
												) : (
													<i
														className='fas fa-times'
														style={{
															color: 'red',
														}}
													/>
												)}
											</td>
											<td>
												<LinkContainer
													to={`/order/${order._id}`}>
													<Button
														variant='link'
														className='btn-sm'
														style={{ margin: '0' }}>
														Details
													</Button>
												</LinkContainer>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						)}
					</>
				) : (
					<Card style={{ border: 'none', margin: '0 auto' }}>
						<Card.Body>
							<Card.Title>No Orders Yet!</Card.Title>
							<Card.Text>
								Details about all your orders will show up here.{' '}
								<Link to='/'>Continue Shopping</Link>
							</Card.Text>
						</Card.Body>
					</Card>
				)}     
        </Col>
    </Row>
  )
}

export default ProfileScreen

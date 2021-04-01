import React, { useState } from 'react'

import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cart/cart.action'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h5>Shipping Information</h5>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              text="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="city">
            <Form.Label>city:</Form.Label>
            <Form.Control
              text="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control
              text="postalCode"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="country">
            <Form.Label>country:</Form.Label>
            <Form.Control
              text="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ShippingScreen

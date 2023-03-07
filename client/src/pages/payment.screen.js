import React, { useState } from 'react'

import { Button, Form, Col, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cart/cart.action'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label as="legend">Select Method</Form.Label>

          {/* add here other payment methods such as pay by visa or master card */}
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="stripe"
              id="stripe"
              name="paymentMethod"
              value="stripe"
              onChange={(e) => setPaymentMethod}
            ></Form.Check> */}
          </Col>
        </FormGroup>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen

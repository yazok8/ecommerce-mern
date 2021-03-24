import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Card, Button, ListGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/shop/${match.params.id}`)

      setProduct(data)
    }

    fetchProduct()
  }, [])

  return (
    <div>
      <Link className="btn btn-dark my-3">Go back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              ></Rating>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>Price: ${product.price}</ListGroup>
          <ListGroup>description: {product.description}</ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen

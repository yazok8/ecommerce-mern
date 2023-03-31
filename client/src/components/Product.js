import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} fluid={true} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <strong>${product.price}</strong>
        </Link>

        <Card.Text as="div" style={{paddingBlock:'1.2rem'}}>
          <Rating
            value={product.rating}
            text={`(${product.numReviews})`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product

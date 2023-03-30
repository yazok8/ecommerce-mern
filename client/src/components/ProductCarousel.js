import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Image, Carousel } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopRatedProducts } from '../actions/shop/shop.action'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const TopRatedProducts = useSelector((state) => state.topProducts)
  const { loading, error, products } = TopRatedProducts

  useEffect(() => {
    dispatch(listTopRatedProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" 
    style={{ marginTop: '0.5em' }}
    className='bg-dark'
    indicators={false}
    interval={10000}>
      {products && products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid></Image>
            <Carousel.Caption className="carousel-caption">
              
                {product.name}({product.price})
              
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel

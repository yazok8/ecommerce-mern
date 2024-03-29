import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = (props) => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Yazan Kherfan
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

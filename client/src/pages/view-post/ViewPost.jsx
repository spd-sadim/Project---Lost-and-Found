import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function ViewPost() {
  return (
    <div>
        <section className='breacrumb'></section>
        <main>
               <Container>
                <Row>
                    <Col lg='3'>list</Col>
                    <Col lg='9'>content</Col>
                </Row>
               </Container> 
        </main>
    </div>
  )
}

import React from 'react'
import { Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer>
                <Row>
                    <Col className="text-center py-3" style={{marginLeft: "5rem"}}>Copyright &copy; TECH<i class="fab fa-artstation"></i>SHOP</Col>
                </Row>
        </footer>
    )
}

export default Footer

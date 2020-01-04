import React from 'react';
import Container from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SignIn from '../SignIn';

import './LandingPage.css';

function LandingPage(props) {
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/chat' } };

    return (
      <Container className="LandingPage">
          <Row className="justify-content-md-center">
              <Col sm={8}>
                  <SignIn from={from}/>
              </Col>
          </Row>
      </Container>
    );
}

export default LandingPage;

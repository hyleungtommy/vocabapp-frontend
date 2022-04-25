import React from 'react';
import ReactDOM from 'react-dom';

import { Outlet, Link } from "react-router-dom";
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/login.css';

const Signup= () =>{
  return(
  <>
    <Container>
      <Row className='justify-content-center'>
        <Col md={7} lg={5} id="login-panel">
          <h2>Sign In</h2>
          <Form>
            <Form.Group controlId='formUserName'>
              <Form.Control placeholder='Input username'></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId='formPassword'>
              <Form.Control type='password' placeholder='Input password'></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId='formPasswordConfirm'>
              <Form.Control type='password' placeholder='Confirm password'></Form.Control>
            </Form.Group>
            <br/>
            <Button className='btn btn-success btn-login'>Sign Up</Button>
            <br/>
          </Form>
        </Col>
      </Row>
    </Container>
  </>
	
)};

export default Signup;
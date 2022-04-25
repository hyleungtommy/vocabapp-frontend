import React from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Container, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/login.css';

const Login= () =>{
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
            <Button className='btn btn-success btn-login'>Login</Button>
            <br/>
            <Form.Group controlId='formRemeberMe'>
              <Form.Check type='checkbox' label='Remeber me'>
              </Form.Check>
            </Form.Group>
          </Form>
          <p><a href="#">Forget password</a><span className="float-right">Not a member? <a href="/signup" className="signup-link">Sign up</a></span></p>
        </Col>
      </Row>
    </Container>
  </>
	
)};

export default Login;

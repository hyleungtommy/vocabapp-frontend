import React from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Container, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/login.css';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import url from '../awsurl'

const Login= (item) =>{
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg,setErrorMsg]= useState(false);
  const loginWithPassword = ()=>{
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      username: username,
      password: password
    };
    axios
      .post(url + "/user/login", body, {
        headers: headers
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data && resp.data.token && resp.data.token.length > 0) {
          item.setToken(resp.data.token)
          item.setUserId(resp.data.userId)
          window.location = window.location.origin + "/vocab"
        }else{
          setErrorMsg("Username or password incorrect")
        }
      });
  }
  return(
  <>
    <Container>
      <Row className='justify-content-center'>
        <Col md={7} lg={5} id="login-panel">
          <h2>Sign In</h2>
          <Form>
            <Form.Group controlId='formUserName'>
              <Form.Control placeholder='Input username' onChange={(e)=>setUserName(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId='formPassword'>
              <Form.Control type='password' placeholder='Input password' onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Button className='btn btn-success btn-login' onClick={loginWithPassword}>Login</Button>
            <br/>
            <Form.Group controlId='formRemeberMe'>
              <Form.Check type='checkbox' label='Remeber me'>
              </Form.Check>
            </Form.Group>
            <p>{errorMsg}</p>
          </Form>
          <p><a href="#">Forget password</a><span className="float-right">Not a member? <a href="/signup" className="signup-link">Sign up</a></span></p>
        </Col>
      </Row>
    </Container>
  </>
	
)};

export default Login;

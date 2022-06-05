import React from 'react';
import ReactDOM from 'react-dom';

import { Outlet, Link } from "react-router-dom";
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/login.css';
import url from '../awsurl'

const Signup= ()=>{
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg,setErrorMsg]= useState('');

  const signupAccount=async function(){
    const valid = await validateInput()
    console.log(valid)
    if(valid){
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      const body = {
        username: username,
        password: password,
        firstLang: '',
        motherLang:'en'
      };
      axios
        .post(url + "/user/create", body, {
          headers: headers
        })
        .then((resp) => {
          window.location = window.location.origin + "/login"
        });
    }
  }

  const validateInput = async function(){
    if(username == ''){
      setErrorMsg("Username cannot be empty")
      return false;
    }else if(password == '' ){
      setErrorMsg("Password cannot be empty")
      return false;
    }else if(confirmPassword == '' ){
      setErrorMsg("Comfirm password cannot be empty")
      return false;
    }else if(confirmPassword != password){
      setErrorMsg("Password mismatch")
      return false
    }else{
      const nameExist = await checkUserNameExist()
      if(nameExist){
        setErrorMsg('Username already exist')
        return false
      }else{
        setErrorMsg('')
        return true
      }
    }
  }

  const checkUserNameExist = async function(){
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      username: username
    };
    axios
      .post( url + "/user/check-exist", body, {
        headers: headers
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data && resp.data.length > 0) {
          setErrorMsg("Username exist")
          return false;
        }else{
          setErrorMsg("")
          return true
        }
      });
  }

  return(
  <>
    <Container>
      <Row className='justify-content-center'>
        <Col md={7} lg={5} id="login-panel">
          <h2>Sign Up</h2>
          <Form>
            <Form.Group controlId='formUserName'>
              <Form.Control placeholder='Input username' onChange={(e)=>setUserName(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId='formPassword'>
              <Form.Control type='password' placeholder='Input password' onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId='formPasswordConfirm'>
              <Form.Control type='password' placeholder='Confirm password' onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <p>{errorMsg}</p>
            <br/>
            <Button className='btn btn-success btn-login' onClick={signupAccount}>Sign Up</Button>
            <br/>
          </Form>
        </Col>
      </Row>
    </Container>
  </>
	
)};

export default Signup;

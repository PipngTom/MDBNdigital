import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase-config';
import { Link, useNavigate } from 'react-router-dom';


const LoginScreen = () => {


  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const [confirmPass, setConfirmPassword] = useState('')

  const submitHandler = async (e) => {
      e.preventDefault()
      try {
        const user = await signInWithEmailAndPassword(auth, email , password)
        console.log(user)
      } catch (error) {
        console.log(error.message)
      }
      navigate('/books')
  }

  return (
    <FormContainer>
       <Card>
      <Card.Body>
        <h2 className='text-center mb-4'>Log In</h2>
      <Form onSubmit={submitHandler} >
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </Form.Group>
      <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPassword(e.target.value)} required/>
      </Form.Group> */}
      <Button type='submit' className='w-100'>
        Log In
      </Button>
    </Form>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-5'>
      Need to register ? <Link to='/register'>Register</Link>
    </div>
    </FormContainer>
  )
}

export default LoginScreen
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase-config';
import { Link, useNavigate } from 'react-router-dom';


const RegisterScreen = () => {


  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 

  const submitHandler = async (e) => {
      e.preventDefault()
      try {
        const user = await createUserWithEmailAndPassword(auth, email , password)
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
        <h2 className='text-center mb-4'>Sign Up</h2>
      <Form onSubmit={submitHandler} >
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </Form.Group>
      <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </Form.Group>
      <Button type='submit' className='w-100 mt-5'>
        Register
      </Button>
    </Form>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
      Already have an account ? <Link to='/login'>Log In</Link>
    </div>
    </FormContainer>
  )
}

export default RegisterScreen
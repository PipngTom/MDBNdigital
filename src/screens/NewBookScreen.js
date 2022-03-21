import React, { useState } from 'react'
import { Form, Button, FormGroup, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { app, storage } from '../utils/firebase-config';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { getFirestore, setDoc, doc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const db = getFirestore(app)

const metadata = {
    contentType: 'image/jpeg'
}

const NewBookScreen = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')


    const handleChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            const storageRef = ref(storage, 'images/' + image.name)
            const uploadImage = uploadBytesResumable(storageRef, image, metadata)

        uploadImage.on('state_changed',
        snapshot => {},
        error => {},
        () => {
            getDownloadURL(uploadImage.snapshot.ref).then((downloadUrl) => {
                setUrl(downloadUrl)
                console.log('File available', downloadUrl)
            })
        })
        }
    }

    const submitHandler = async (e) => {
        
        e.preventDefault()
        const uid = uuidv4()
        const savedPackage = {
            name: name,
            author: author,
            uid: uid,
            url: url,
            syno: synopsis,
            price: price,
            date: date
        }
        await setDoc(doc(db, 'books', uid), savedPackage)
        navigate('/books')
    }

  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
        <h2 className='text-center mb-5'>Create a New Book</h2>
            <FormGroup className='mb-4' controlId='nameOfBook'>
                <h6>Name of a Book</h6>
                <Form.Control type='name' value={name} placeholder='Name of a Book' onChange={(e) => setName(e.target.value)} required />
            </FormGroup>
            <FormGroup className='mb-4' controlId='author'>
                <h6>Author</h6>
                <Form.Control type='name' value={author} placeholder='Author' onChange={(e) => setAuthor(e.target.value)} required />
                </FormGroup>
                <FormGroup className='mb-4' controlId='image'>
                <h6>Image</h6>
                <Form.Control type='file' placeholder='Image' onChange={handleChange} required />
            </FormGroup>
            <FormGroup className='mb-4' controlId='synopsis'>
                <h6>Synopsis</h6>
                <Form.Control as='textarea' rows={6} value={synopsis} onChange={e => setSynopsis(e.target.value)} />
            </FormGroup>
            <FormGroup className='mb-4' controlId='price'>
                <h6>Price</h6>
                <Form.Control type='text' value={price} onChange={e => setPrice(e.target.value)} />
            </FormGroup>
            <FormGroup className='mb-4' controlId='date'>
                <h6>Published on:</h6>
                <Form.Control type='date' value={date} onChange={e => setDate(e.target.value)} />
            </FormGroup>
            <Row>
                <Col>
                    <Button type='submit' size='lg' className='mt-4' disabled={url === ''}>Create</Button>
                </Col>
                <Col>
                    <Button type='button' size='lg' className='mt-4' onClick={() => navigate('/books')}>Go back</Button>
                </Col>
            </Row>
        </Form>
    </FormContainer>  
  )
}

export default NewBookScreen
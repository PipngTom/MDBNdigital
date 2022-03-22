import React, { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore, setDoc, deleteDoc } from 'firebase/firestore';
import { app, storage } from '../utils/firebase-config';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, Row, Col, Modal, Image } from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';


const db = getFirestore(app)

const metadata = {
    contentType: 'image/jpeg'
}

const EditBookScreen = () => {

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      getSingleBook()
    }, [])


     const getSingleBook = async () => {
        const docRef = doc(db, 'books', params.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log(docSnap.data())
            setName(docSnap.data()?.name)
            setAuthor(docSnap.data()?.author)
            setUrl(docSnap.data()?.url)
            setSynopsis(docSnap.data()?.syno)
            setUrl(docSnap.data()?.url)
            setPrice(docSnap.data()?.price)
            setDate(docSnap.data()?.date)
        }
        setLoading(false)
    } 

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    }
    const takeImageName = (imgUrl) => {
        console.log(imgUrl)
        if(imgUrl) {
            const startIndex = imgUrl.indexOf('%2F') + 3;
            const endIndex = imgUrl.indexOf('?alt');
            const imgName = imgUrl.slice(startIndex, endIndex).replaceAll('%20', ' ')
            return imgName;

        } else {
            return ''
        }

     

    }

    const imageHandler = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            const storageRef = ref(storage, 'images/' + image.name)
            const uploadImage = uploadBytesResumable(storageRef, image, metadata)

        uploadImage.on('state_changed',
        snapshot => {},
        error => {},
        () => {
            getDownloadURL(uploadImage.snapshot.ref).then((downloadUrl) => {

                if(url){
                        const desertRef =  ref(storage, 'images/' + takeImageName(url))
                    deleteObject(desertRef).then(()=>{
                        console.log('file deleted')
                    }).catch (error=>{
                        console.log('failed')
                })

                }  
                
                setUrl(downloadUrl)
                console.log('File available', downloadUrl)
            })
        })
        }
    }

    const updateHandler = async (e) => {
        e.preventDefault()
          const savedPackage = {
            name: name,
            author: author,
            syno: synopsis,
            url: url,
            uid: params.id,
            price: price,
            date: date
        }
        await setDoc(doc(db, 'books', params.id), savedPackage)
        navigate('/books')
    }

    const deleteHandler = async () => {

        await deleteDoc(doc(db, 'books', params.id))

        const desertRef =  ref(storage, 'images/' + takeImageName(url))
                deleteObject(desertRef).then(()=>{
                    console.log('file deleted')
                }).catch (error=>{
                    console.log('failed')
                })

        navigate('/books')
    }

  return (
    <>
    {loading ? <Loader/> : (<>
        <FormContainer>
        <Button type='button' onClick={() => navigate('/books')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
        </Button>
        <Form onSubmit={updateHandler}>
        <h2 className='text-center mb-5'>Edit a book</h2>
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
                <Form.Control type='file' placeholder='Image' onChange={imageHandler} required />
                </FormGroup>

                <Image src={url} style={{ width: '200px', height: '200px' }} className='mb-4' fluid />
                
            <FormGroup className='mb-4' controlId='synopsis'>
                <h6>Synopsis</h6>
                <Form.Control as='textarea' rows={8} value={synopsis} onChange={e => setSynopsis(e.target.value)} />
            </FormGroup>
            <FormGroup className='mb-4' controlId='price'>
                <h6>Price</h6>
                <Form.Control type='text' value={price} onChange={e => setPrice(e.target.value)} />
            </FormGroup>
            <FormGroup className='mb-4' controlId='date'>
                <h6>Date published on:</h6>
                <Form.Control type='date' value={date} onChange={e => setDate(e.target.value)} />
            </FormGroup>
            <Row>
                <Col>
                <Button type='submit' size='lg' className='mt-4'>Save</Button>
                </Col>
                <Col>
                <Button type='button' size='lg' className='mt-4' onClick={handleShow}>Delete</Button>
                </Col>
            </Row>
            </Form>
        </FormContainer>  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Deleting...</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete a book ?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                    Close
            </Button>
            <Button variant="primary" onClick={deleteHandler}>
                   Delete a book
            </Button>
            </Modal.Footer>
         </Modal> 
  </>
    )}
    </>
  )
}

export default EditBookScreen
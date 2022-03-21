import React, { useState, useEffect, useRef} from 'react';
import { collection, getDocs, getFirestore, query, orderBy, limit, startAfter } from 'firebase/firestore/lite';
import { app } from '../utils/firebase-config';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import './BooksScreen.css'


const db = getFirestore(app)

const BooksScreen = () => {
  const elementRef = useRef();

  const navigate = useNavigate()

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastBook, setLastBook] = useState()
 

  useEffect(() => {
    if (books.length === 0) {
      setLoading(true)
      getBooks()
    }
  }, [books])

 

  const getBooks = async () => {
    
    const first = query(collection(db, 'books'), orderBy('name', 'asc'), limit(5));
    const documentSnapshots = await getDocs(first);
    const resList = documentSnapshots.docs.map((item) => item.data())
    setBooks(resList)

    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    setLastBook(lastVisible)
    console.log("last", lastVisible);

    setLoading(false)
  }

  const getNextBooks = async () => {
    
    if(lastBook) {
      
      const next = query(collection(db, "books"),
     orderBy("name"),
    startAfter(lastBook),
     limit(5));

     const documentSnapshots = await getDocs(next);
     const resList = documentSnapshots.docs.map((item) => item.data())

     const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    setLastBook(lastVisible)

     setBooks([...books, ...resList])

    }
    


  }
const onScrollHandler = (e) => {
  let triggerHeight = elementRef.current.scrollTop + elementRef.current.offsetHeight
  if(triggerHeight < elementRef.current.scrollHeight){
    getNextBooks()
  }
 // console.log(elementRef.current.scrollTop)
}
  

  return (
    <>
    {loading ? <Loader/> : (<div style={{height: '100%'}}>
      
    <div  className='container' ref={elementRef} onScroll={onScrollHandler} style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '1rem' }}>

    {books.map((item) => (
      <Card border='light' style={{ cursor: 'pointer' }} onClick={() => navigate(`/editbook/${item?.uid}`)}>
      <Card.Img variant="top" style={{ width: '400px', height: '400px' }} src={item?.url} />
      <Card.Body>
        <Card.Text className='text-center'>
          <h6>{item.author}</h6>
          <h6>{item.name}</h6>
          <p>{item.price}</p>
        </Card.Text>
      </Card.Body>
    </Card>
    ))}
    </div>
    </div>
    )}
      
    </>
  )
}

export default BooksScreen
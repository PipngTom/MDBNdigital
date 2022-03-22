import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import Header from './components/Header';
import BooksScreen from './screens/BooksScreen';
import NewBookScreen from './screens/NewBookScreen';
import EditBookScreen from './screens/EditBookScreen';

const App = () => {
  return (
      <BrowserRouter>
      <Header/>
      <Routes>
          <Route path='/register' element={<RegisterScreen/>} />
          <Route path='/login' element={<LoginScreen/>} />
          <Route element={<ProtectedRoutes/>}>
          <Route path='/books' element={<BooksScreen/>} />
          <Route path='/editbook/:id' element={<EditBookScreen/>}/>
          <Route path='/newbook' element={<NewBookScreen/>} />
          </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App

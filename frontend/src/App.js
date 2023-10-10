import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Product from './Product'
import Addproduct from './Addproduct'
import Updateproduct from './Updateproduct'
// import Logout from './Logout'
import Profile from './Profile'
import Navbar from './Navbar'
import Footer from './Footer'
import Signup from './Signup'
import Private from './Private'
import Login from './Login'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route element={<Private/>}>
        <Route path='/' element={<Product />} />
        <Route path='/add' element={<Addproduct />} />
        <Route path='/update/:id' element={<Updateproduct />} />
        {/* <Route path='/' element={<Logout />} /> */}
        <Route path='/profile' element={<Profile /> } />
        </Route>

        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer />

    </>
  )
}

export default App

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from './images/logo.png'

const Navbar = () => {

  const auth =localStorage.getItem('newuser');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup')
  }

  return (
    <>

      {
        auth ?
          <div className="navbar">
            <NavLink to="/">Products</NavLink>
            <NavLink to="/add">Add Product</NavLink>
            <NavLink to="/update">Update Product</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/signup" onClick={logout} >Logout {JSON.parse(auth).name}  </NavLink>
            {/* {JSON.parse(auth).name} */}
          </div>
          :
          <div className="navbar display">
            
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            <div className='menu_items'>
            <NavLink className="nav" to="/signup">Sign Up</NavLink>
            <NavLink className="nav" to="/login">Login</NavLink>
            </div>
          </div>

      }

      {/* <div className="navbar">
        <NavLink to="/">Products</NavLink>
        <NavLink to="/add">Add Product</NavLink>
        <NavLink to="/update">Update Product</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        {
          auth ?
            <NavLink to="/signup" onClick={logout} >Logout</NavLink> :
            <>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>

        }

      </div> */}

    </>
  )
}

export default Navbar

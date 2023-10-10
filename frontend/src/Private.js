import React from 'react'

import { Outlet,Navigate } from 'react-router-dom'

const Private = () => {

    const auth = localStorage.getItem('newuser');

  return auth ?  <Outlet/> : <Navigate to="/signup" />

}

export default Private

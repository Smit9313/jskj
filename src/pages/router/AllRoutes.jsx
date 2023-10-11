import React from 'react'
import { Route, Routes} from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import Home from '../Home';
import Navbar from '../../Layout/Navbar';

function AllRoutes() {
  return (
    <>
   <Navbar/>
   <Routes> 
     <Route path='/' element={<Home/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/register' element={<Register/>}></Route>
   </Routes>
  </>
    
  )
}

export default AllRoutes
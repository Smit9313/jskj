import React from 'react'
import { Route, Routes} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Navbar from '../Layout/Navbar';
import Product from '../pages/products/Product';
import Cart from '../pages/logged/Cart/Cart'
import NotFound from '../pages/NotFound';
import Order from '../pages/logged/Order/order'
import ViewProduct from '../pages/products/ViewProduct';

function AllRoutes() {
  return (
   <>
   <Navbar/>
   <Routes> 
     <Route path='/' element={<Home/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/register' element={<Register/>}></Route>
     <Route path='/products' element={<Product/>}></Route>
     <Route path='/products/id' element={<ViewProduct/>}></Route>
     <Route path='/cart' element={<Cart/>}></Route>
     <Route path='/order' element={<Order/>}></Route>
     <Route path='/*' element={<NotFound/>}></Route>
   </Routes>
   </>
)}

export default AllRoutes
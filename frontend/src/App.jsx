import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import PrivateRoute from './pages/auth/PrivateRoute';


function App() {
  return (
    <Router>
      <div className='w-screen h-auto bg-white text-zinc-900'>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />

          {/*----------------------------- Private Routes---------------------- */}
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App

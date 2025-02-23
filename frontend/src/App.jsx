import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <div className='w-screen h-auto bg-white text-zinc-900'>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

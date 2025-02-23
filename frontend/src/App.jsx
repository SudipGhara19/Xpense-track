import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';


function App() {
  return (
    <Router>
      <div className='w-screen h-auto bg-white text-zinc-900'>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

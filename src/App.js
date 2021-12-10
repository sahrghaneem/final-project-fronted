import './App.css';
import React from 'react';
import { Redirect, Route, Routes } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Rigistr';
import CarGame from './components/BoardGame'
 import './Login.css';
function App() {
  return (
    <BrowserRouter>
            <Routes>
                 <Route exact path='/' element={<Login/>} />
                 <Route exact path='/register' element={<Register/>} />
                 <Route path='/CarGame' element={<CarGame/>} />
             </Routes>
       </BrowserRouter>
  );
}

export default App;




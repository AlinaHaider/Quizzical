import './App.css';
import { Questions } from './Components/Questions/Questions';
import { Home } from './Components/Home/Home';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
// import { Button } from './Components/Button/Button';
// import React, { useState, useEffect } from 'react';


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/questions" element={<Questions/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

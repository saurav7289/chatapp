import React from 'react'
import Homepage from './pages/Homepage'
import Chatpage from './pages/Chatpage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
const App = () => {
  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="/chats" element={<Chatpage />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
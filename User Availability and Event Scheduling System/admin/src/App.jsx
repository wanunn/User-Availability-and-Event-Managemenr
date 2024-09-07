import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Views/Home/Home';
import Login from './Views/Auth/Login';
import Nav from './components/Nav';
import Event from './Views/Event/Event';
import Private from './routes/Private';
import Users from './Views/Admin/Users';
import Schedule from './Views/Event/schedule';
import Events from './Views/Event/Events';
import Profile from './Views/Admin/Profile';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Private><Home /></Private>} />
        <Route path='/users' element={<Private><Users /></Private>} />
        <Route path='/login' element={<Login />} />
        <Route path='/events/:id' element={<Private><Event /></Private>} />
        <Route path='/events' element={<Private><Events /></Private>} />

        <Route path='/schedule/:id' element={<Private><Schedule /></Private>}/>
        
        <Route path='/profile' element={<Private><Profile/></Private>}/>
       
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

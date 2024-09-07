import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Views/Home/Home';
import Login from './Views/Auth/Login';
import Register from './Views/Auth/Register';
import Nav from './components/Nav';
import Add from './Views/Event/Add';
import Edit from './Views/Event/Edit';
import Details from './Views/Event/Details';
import Private from './routes/Private';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Private><Home /></Private>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add' element={<Private><Add /></Private>} />
        <Route path='/edit/:id' element={<Private><Edit /></Private>} />
        <Route path='/details/:id' element={<Private><Details /></Private>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

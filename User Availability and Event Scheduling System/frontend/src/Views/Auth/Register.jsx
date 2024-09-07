import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', formData);

      if (response.status === 201) { 
        toast.success("Registration successful! Redirecting...",{
          autoClose:100
        });

        // Save the JWT token to localStorage
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', response.data.role);

        // Navigate to the homepage
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message,{
          autoClose:100
        });
      } else {
        toast.error("Server error. Please try again.",{
          autoClose:100
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const {user} = useSelector(state=>state.user)

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  })

  return (
    <div className='flex flex-col justify-center items-center gap-5 p-10 bg-blue-100 bg-opacity-20 w-[90%] sm:w-[80%] md:w-[80%] lg:[60%] xl:w-[50%] m-auto mt-5 rounded-lg'>
      <div className='flex justify-center items-start px-2 py-1.5 text-2xl bg-blue-600 text-white rounded-full'>
        <Link to='/login'>
          <h1 className='px-10 py-1.5 rounded-full cursor-pointer'>Login</h1>
        </Link>
        <h1 className='bg-[#f0ac2f] px-5 py-1.5 rounded-full cursor-pointer'>Register</h1>
      </div>
      <form className='flex flex-col gap-5 text-xl' onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div className='flex flex-col gap-2 justify-center items-start'>
          <label htmlFor="name">Name</label> 
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder='Enter your name' 
            className='px-5 py-2 rounded-xl focus:outline-none border-2 border-blue-600' 
            value={formData.name}
            onChange={handleInputChange}
            autoComplete='off'
          />
        </div>
        <div className='flex flex-col gap-2 justify-center items-start'>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='Enter your email' 
            className='px-5 py-2 rounded-xl focus:outline-none focus:ring-2 ring-green-600 border-2 border-blue-600' 
            value={formData.email}
            onChange={handleInputChange}
            autoComplete='off'
          />
        </div>
        <div className='flex flex-col gap-2 justify-center items-start'>
          <label htmlFor="password">Create Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder='Create your password' 
            className='px-5 py-2 rounded-xl focus:outline-none focus:ring-2 ring-green-600 border-2 border-blue-600' 
            value={formData.password}
            onChange={handleInputChange}
            autoComplete='off'
          />
        </div>
        <button 
          type="submit" 
          className={`px-5 py-2 rounded-xl focus:outline-none bg-blue-600 text-white text-center ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:ring-2 ring-white'}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;

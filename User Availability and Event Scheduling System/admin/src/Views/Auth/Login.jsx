import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProfile } from '../../redux/Admin/User';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.role !== 'admin') {
        toast.error('Invalid credentials. Please try again.', {
          autoClose: 3000,
        });
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.role);

        toast.success('Login successful!', {
          autoClose: 1500,
        });

        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again later.', {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-5 p-10 bg-[#1008a9] w-[90%] sm:w-[80%] md:w-[80%] lg:w-[60%] xl:w-[50%] m-auto mt-5 rounded-lg text-white'>
      <div>
        <div className='flex justify-center items-start px-1 py-1.5 text-xl bg-[#0d078d] text-white rounded-full'>
          <h1 className='font-semibold font-sans bg-yellow-300 px-5 py-2 rounded-full w-full text-center drop-shadow-lg text-gray-800'>
            Admin Login
          </h1>
        </div>
        <form onSubmit={handleLogin} className='flex flex-col gap-5 text-xl'>
          <div className='flex flex-col gap-2 justify-center items-start'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='Enter your email'
              className='px-8 py-2 rounded-xl focus:outline-none border-2 border-blue-600'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col gap-2 justify-center items-start'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder='Enter your password'
              className='px-8 py-2 rounded-xl focus:outline-none'
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className='px-5 py-2 rounded-xl focus:outline-none bg-blue-600 text-white hover:ring-2 ring-white text-center cursor-pointer'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

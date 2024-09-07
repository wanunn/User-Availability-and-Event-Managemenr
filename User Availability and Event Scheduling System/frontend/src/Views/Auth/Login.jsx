import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { fetchProfile } from '../../redux/User/User';
import { useDispatch, useSelector } from 'react-redux';

function Login() {

  const navigate = useNavigate();
 const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  useEffect(() => {
    dispatch(fetchProfile())
  },[])
 const {user} = useSelector(state=>state.user)
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);

        // Optionally, store user data
        localStorage.setItem('user', data.role);

        // Navigate to the home page or dashboard
        navigate('/');
        toast.success('Login successful!', {
          autoClose:100
        });
      } else {
        // Handle login errors
        toast.error(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  })

  return (
    <div className='flex flex-col justify-center items-center gap-5 p-10 bg-blue-100 bg-opacity-20 w-[90%] sm:w-[80%] md:w-[80%] lg:[60%] xl:w-[50%] m-auto mt-5 rounded-lg'>
      <div>
        <div className='flex justify-center items-start px-2 py-1.5 text-2xl bg-blue-600 text-white rounded-full'>
          <h1 className='bg-[#f0ac2f] px-10 py-1.5 rounded-full cursor-pointer'>Login</h1>
          <Link to={'/register'}>
            <h1 className='px-5 py-1.5 rounded-full cursor-pointer'>Register</h1>
          </Link>
        </div>
        <form onChange={handleInputChange} className='flex flex-col gap-5 text-xl'>
          <div className='flex flex-col gap-2 justify-center items-start'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='Enter your email'
              className='px-8 py-2 rounded-xl focus:outline-none border-2 border-blue-600'
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
            />
          </div>
          <span
            className='px-5 py-2 rounded-xl focus:outline-none bg-blue-600 text-white hover:ring-2 ring-white text-center cursor-pointer'
            onClick={handleLogin}
          >
            Login
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;

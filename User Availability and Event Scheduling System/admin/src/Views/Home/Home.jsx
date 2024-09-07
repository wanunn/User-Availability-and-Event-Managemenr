import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Icons for decoration
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/Admin/Admin';
import { FaUsers } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // State for the current time
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  // Update time every second


  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter users by role
  const usersFilter = users.filter((user) => user.role === 'user');
  const totalUsers = usersFilter.length;

  const totalEvent = 1077

  return (
    <div className='flex flex-col justify-center items-center gap-4  p-10'>
    
      {/* Gradient Boxes */}
      <div className='text-white flex flex-wrap justify-ceneter items-center mt-5 gap-10 p-10'>
        <div className='bg-gradient-to-t from-[#cd851f] to-[#eb1a1a] w-[30vw] h-[30vh] rounded-lg drop-shadow-sm flex justify-start items-center flex-col px-10 py-5 gap-4 hover:scale-105 duration-100 hover:cursor-pointer'
        onClick={() => navigate('/users')}>
        <FaUsers className='text-6xl drop-shadow-lg '  />
        <p className='text-2xl text-nowrap font-bold font-mono'>Total Users</p>
        <h1 className='text-4xl text-nowrap font-bold font-mono'>{totalUsers}</h1>

        </div>
        <div className='bg-gradient-to-t from-[#0fb14a] to-[#0a7e2d] w-[30vw] h-[30vh] rounded-lg drop-shadow-sm flex flex-col justify-start items-center gap-4 px-10 py-5 hover:scale-105 duration-100 hover:cursor-pointer'
        onClick={() => navigate('/events')}
        >
        <MdEventAvailable className='text-6xl drop-shadow-lg ' />
        <p className='text-2xl text-nowrap font-bold font-mono'>Total Events</p>
        <h1 className='text-4xl text-nowrap font-bold font-mono'>{totalEvent}
            
        </h1>


        </div>
      </div>
    </div>
  );
};

export default Home;

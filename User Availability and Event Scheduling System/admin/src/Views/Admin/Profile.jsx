import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col items-center p-5'>
      <div className='bg-gray-800 p-5 w-full max-w-lg rounded-lg drop-shadow-lg'>
        <h1 className='text-3xl font-bold text-center mb-5 text-white'>Profile Information</h1>
        <div className='text-lg text-white'>
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>Role:</strong> {user.role || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

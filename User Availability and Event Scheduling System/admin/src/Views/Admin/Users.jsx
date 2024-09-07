import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/Admin/Admin';
import Button from '../../components/Button';

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.admin);
    const [view, setView] = useState('users'); // State to control the selection

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) {
        return <p className='text-white'>Loading users...</p>;
    }

    if (error) {
        return <p className='text-red-500'>Error fetching users: {error}</p>;
    }

    const filteredUsers = view === 'users' 
        ? users.filter((user) => user.role !== 'admin')
        : users.filter((user) => user.role === 'admin');

    return (
        <div className='flex flex-col items-center p-5'>
            <h1 className='text-2xl sm:text-3xl font-bold font-mono text-white mb-5'>View {view === 'users' ? 'Users' : 'Admins'}</h1>
            
            <select 
                value={view} 
                onChange={(e) => setView(e.target.value)} 
                className='mb-5 p-2 rounded bg-gray-700 text-white'
            >
                <option value="users">Users</option>
                <option value="admins">Admins</option>
            </select>

            <div className='w-full max-w-4xl'>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.id} className='bg-white p-5 mb-5 drop-shadow-lg rounded-lg'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div className='flex flex-col gap-3'>
                                    <h1 className='text-xl sm:text-2xl font-mono bg-gradient-to-r from-[#1e7914] to-[#05d443] p-2 rounded-lg text-white'>
                                        {user.name || 'N/A'}
                                    </h1>
                                    <p className='text-xl sm:text-2xl font-bold'>Email : {user.email || 'N/A'}</p>
                                    <p className='font-bold text-lg sm:text-xl'>{user.role.toUpperCase()}</p>
                                </div>
                                <div className='flex justify-end items-center'>
                                    {view === 'users' && (
                                        <Button
                                            color1='blue'
                                            color2='darkblue'
                                            name='View Availability'
                                            link={`/events/${btoa(user.email)}`}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-red-500'>No {view === 'users' ? 'users' : 'admins'} found.</p>
                )}
            </div>
        </div>
    );
};

export default Users;

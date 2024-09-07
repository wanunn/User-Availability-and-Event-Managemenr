import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { fetchProfile, logoutUser } from '../redux/User/User';
import { useDispatch, useSelector } from 'react-redux';

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
console.log("Hello",isLogin)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className='flex justify-between items-center sticky top-0 px-5 py-2 text-white z-10 bg-[#1008a9] bg-opacity-[0.1] rounded-b-lg'>
      <h1
        className='w-10 h-10 rounded-md bg-white flex justify-center items-center text-black cursor-pointer shadow-white drop-shadow-lg'
        onClick={() => navigate('/')}
      >
        <img className='w-10 h-10' src="https://cdn-icons-png.flaticon.com/512/174/174868.png" alt="" />
      </h1>
      <div className='flex gap-3 items-center'>
{
  user && isLogin ? (     <>   <h1 className='flex items-center'>
    {user?.name}
    <span className='relative -top-[12px] -left-[px] text-xl'>✨</span>
  </h1>
  <img
    className='w-10 h-10 rounded-full border-2 border-white'
    src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
    alt="User Avatar"
  /></>):''
}
        <div className='text-sm'>
          {user && isLogin ? (
            <div
              className='text-[10px] cursor-pointer'
              onClick={()=>{handleLogout()}}
            >
              <Button color1={"yellow"} color2={"red"} name={"Logout"} />
            </div>
          ) : (
           <div className='text-[10px] cursor-pointer'>
             <Button color1={"green"} color2={"#22c55e"} name={"Login"} link={"/login"} />
           </div>
          )}
       
        </div>
      </div>
    </div>
  );
};

export default Nav;

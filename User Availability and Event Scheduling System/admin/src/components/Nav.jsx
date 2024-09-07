import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { fetchProfile, logoutUser } from '../redux/Admin/User';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { FaBarsStaggered } from "react-icons/fa6";


const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLogin } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  console.log("Hello", isLogin)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className='flex justify-between items-center sticky top-0 p-2 text-white z-10 bg-[#1008a9] rounded-b-lg'>
      <div className='flex justify-between items-center gap-2'>
        
          {open ? <FaBarsStaggered className='w-[28px] h-[28px] cursor-pointer' onClick={() => handleOpen()}></FaBarsStaggered> : <FaBars className='w-[28px] h-[28px] cursor-pointer'
          onClick={() => handleOpen()}
        ></FaBars>}
        <h1
          className='w-fit p-1 h-8 rounded-tl-md bg-white flex justify-center items-center text-black cursor-pointer shadow-white drop-shadow-lg font-semibold text-lg'
          onClick={() => navigate('/')}
        >

          Dashboard
        </h1>
      </div>
  

    <section className={`absolute top-[52px] left-0 bg-[#1008a9] flex  w-full bg-opacity-0  ${open ? '' : 'hidden'}`}>
        <ul className='flex flex-col gap-5 bg-[#1008a9] items-center [100vh] p-2 w-[300px]'>
          {["Dashboard", "Users", "Events", "Profile"].map((item) => (
            <li
              onClick={() =>
          {
            if (item === "Dashboard") {
              navigate("/");
            }else{
              navigate(`/${item.toLowerCase()}`);
            }
            setOpen(false)

          }

            }
              className='hover:bg-[#e5e110] py-1 w-full hover:text-gray-900 cursor-pointe text-[25px] font-bold font-mono text-white rounded-xl text-center hover:scale-105 duration-100 hover:cursor-pointer'
            >
              {item}

            </li>

          ))}
        </ul>
        <div className='bg-white w-screen h-[100vh] bg-opacity-10'
        onClick={() => setOpen(false)}>

        </div>
      </section>

      <div className='flex gap-3 items-center'>
        <h1 className='flex items-center font-bold text-xl font-mono text-white'>
          {user?.name}

        </h1>

        <div className='text-sm'>
          {user && isLogin ? (
            <div
              className='text-[10px] cursor-pointer'
              onClick={() => { handleLogout() }}
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

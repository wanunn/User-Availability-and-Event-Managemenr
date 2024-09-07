import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../redux/User/User';
import { useNavigate } from 'react-router-dom';

const Private = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLogin } = useSelector((state) => state.user);
  const role = user?.role;

  useEffect(() => {
    dispatch(fetchProfile());

  }, [dispatch]);

  if (!user) {
   return navigate('/login');
  }

  return children;
};

export default Private;

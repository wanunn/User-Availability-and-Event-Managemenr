import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteEventAction, fetchEvents } from '../../redux/User/Event';
import Button from '../../components/Button';

const Card = ({ data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatDateTimeLocal = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16).split('T').join('  ');
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteEventAction(id));  // Dispatch the delete action
            toast.success('Event deleted successfully!',{
                autoClose:100
              });
           
        } catch (error) {
            toast.error(error.message || 'Server error. Please try again.',{
                autoClose:100
              });
        }
    };
    const truncateTitle = (title, maxLength = 10) => 
        title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
    
    return (
        <div className='bg-white flex flex-col justify-around items-start gap-3 p-5 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] drop-shadow-lg rounded-lg hover:scale-105 duration-300'>
            <h1 className='text-[2xl] sm:text-3xl font-bold font-mono text-nowrap'>{truncateTitle(data.title)}</h1>
            <h2 className='text-xl sm:text-2xl'>User availability</h2>
            <div className='flex flex-col gap-2 font-medium bg-yellow-500 p-2 rounded-lg bg-opacity-60 drop-shadow-md'>
                <h2 className='text-black font-bold text-nowrap text-sm'>Start: {formatDateTimeLocal(data.start)}</h2>
                <h2 className='text-black font-bold text-nowrap text-sm'>End: {formatDateTimeLocal(data.end)}</h2>
            </div>
            <p className='font-bold text-lg sm:text-xl'>Duration: {data.duration}</p>
            <div className='flex gap-3 justify-center items-center'>
                <Button color1='blue' color2='skyblue' name='View' link={`/details/${data._id}`} />
                <Button color1='green' color2='orange' name='Edit' link={`/edit/${data._id}`} />
                <div onClick={() => handleDelete(data._id)}>
                    <Button color1='red' color2='orange' name='Delete' />
                </div>
            </div>
        </div>
    );
};

export default Card;

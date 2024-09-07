import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, updateEventAction } from '../../redux/User/Event';
import Button from '../../components/Button';
import { toast } from 'react-toastify';

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    duration: '',
  });

  // Fetch events from Redux store
  const events = useSelector((state) => state.event.events);
  
  // Find the event by ID
  const data = events.find((event) => event._id === id);

  useEffect(() => {
    // Fetch events if not already loaded
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  
  useEffect(() => {
    // Set form data when event details are available
    if (data) {
      setFormData({
        title: data.title || '',
        start: formatDateTimeLocal(data.start),
        end: formatDateTimeLocal(data.end),
        duration: data.duration || '',
      });
    }
  }, [data]);

  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(updateEventAction(id, formData));
      
      if (res.error) {
        toast.error(res.error.message || 'Event not updated!', {
          autoClose: 1000
        });
      } else {
        toast.success(res.message || 'Event updated successfully!', {
          autoClose: 1000
        });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
        
      console.error('Error updating event:', error);
      toast.error('Error updating event!');
    }
  };

  if (!data) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className='p-5'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-5 p-10 sm:p-20 justify-center items-center shadow-md bg-gray-800 bg-opacity-60 mt-5 rounded-lg w-full max-w-3xl mx-auto'
      >
        <h1 className='text-3xl font-mono font-bold text-white mb-5'>Update Event</h1>

        <label className='flex flex-col text-white font-semibold text-xl w-full'>
          Title:
          <input
            className='p-3 mt-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-white bg-gray-800'
            type="text"
            name="title"
            placeholder='Enter Title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        {/* Start Time Input */}
        <label className='flex flex-col text-white font-semibold text-xl w-full'>
          Start:
          <input
            className='p-3 mt-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-white bg-gray-800'
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
          />
        </label>

        {/* End Time Input */}
        <label className='flex flex-col text-white font-semibold text-xl w-full'>
          End:
          <input
            className='p-3 mt-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-white bg-gray-800'
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
          />
        </label>

        {/* Duration Input */}
        <label className='flex flex-col text-white font-semibold text-xl w-full'>
          Duration:
          <input
            className='p-3 mt-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-white bg-gray-800'
            type="text"
            name="duration"
            placeholder='Enter Duration'
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </label>

        <Button name={"Update Event"} color1={"blue"} color2={"skyblue"} />
      </form>
    </div>
  );
};

export default Edit;

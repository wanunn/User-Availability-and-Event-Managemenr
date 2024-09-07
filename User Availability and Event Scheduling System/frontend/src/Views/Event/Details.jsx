import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEventAction, fetchEvents } from '../../redux/User/Event';
import Button from '../../components/Button';
import { toast } from 'react-toastify';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch events from Redux store
  const events = useSelector((state) => state.event.events);
  
  // Find the event by ID
  const data = events.find((event) => event._id === id);
  console.log(data);

  useEffect(() => {
    // Fetch events if not already loaded
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16).split('T').join('  ');
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEventAction(id));
      toast.success('Event deleted successfully', { autoClose: 100 });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error(error.message || 'Server error. Please try again.', { autoClose: 100 });
    }
  };

  if (!data) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className='flex justify-center items-center p-5'>
      <div className='bg-white p-5 w-full max-w-4xl mx-auto drop-shadow-lg rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-2xl sm:text-3xl font-bold font-mono'>{data.title || 'N/A'}</h1>
            <h2 className='text-xl sm:text-2xl'>User availability</h2>

            {data.start && data.end ? (
              <div className='flex flex-col gap-2 font-medium bg-yellow-500 p-2 rounded-lg bg-opacity-60 drop-shadow-md'>
                <h2 className='text-black font-bold text-nowrap text-sm'>Start: {formatDate(data.start)}</h2>
                <h2 className='text-black font-bold text-nowrap text-sm'>End: {formatDate(data.end)}</h2>
              </div>
            ) : (
              <p>No availability data available.</p>
            )}

            <p className='font-bold text-lg sm:text-xl'>Duration: {data.duration || 'N/A'}</p>

            <div className='flex flex-wrap gap-3 justify-start items-center'>
              <Button color1='green' color2='orange' name='Edit' link={`/edit/${data._id}`} />
              <Button color1='red' color2='orange' name='Delete' onClick={() => handleDelete(data._id)} />
            </div>
          </div>

          <div>
            <h1 className='text-xl font-semibold mb-2'>Scheduled Slots</h1>
            {data.scheduledSlots && data.scheduledSlots.length > 0 ? (
              data.scheduledSlots.map((slot, index) => (
                <div key={index} className='font-medium mb-4'>
                  <p>{formatDate(slot.start)} - {formatDate(slot.end)}</p>
                  <h3 className='font-semibold mt-2'>Attendees:</h3>
                  {slot.attendees.length > 0 ? (
                    slot.attendees.map((attendee, idx) => (
                      <p key={idx} className='text-sm text-gray-700'>{attendee.name} ({attendee.email})</p>
                    ))
                  ) : (
                    <p>No attendees available.</p>
                  )}
                </div>
              ))
            ) : (
              <p>No scheduled slots available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';

const Schedule = ({ onSuccess }) => {
  const { id } = useParams();
  const eventId = id;
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.event);
  const [slot, setSlot] = useState({
    start: '',
    end: '',
    attendees: [{ name: '', email: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = events?.find((event) => event._id === eventId);
    setEvent(foundEvent);
  }, [events, eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlot((prevSlot) => ({
      ...prevSlot,
      [name]: value,
    }));
  };

  const handleAttendeeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAttendees = slot.attendees.map((attendee, idx) =>
      idx === index ? { ...attendee, [name]: value } : attendee
    );
    setSlot((prevSlot) => ({
      ...prevSlot,
      attendees: updatedAttendees,
    }));
  };

  const addAttendee = () => {
    setSlot((prevSlot) => ({
      ...prevSlot,
      attendees: [...prevSlot.attendees, { name: '', email: '' }],
    }));
  };

  const removeAttendee = (index) => {
    const updatedAttendees = slot.attendees.filter((_, i) => i !== index);
    setSlot((prevSlot) => ({
      ...prevSlot,
      attendees: updatedAttendees,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`https://user-availability-and-event-managemenr-1.onrender.com/api/${eventId}`, {
        slot,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Slot added successfully!');
      navigate('/');

      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div className='flex flex-col items-center p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen'>
      {event && (
        <>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-gray-800'>Event Details</h2>
          <div className='bg-white p-5 mb-6 w-full max-w-4xl rounded-lg shadow-md'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Title: {event.title}</h3>
                <p className='mb-2'><strong>Start:</strong> {formatDate(event.start)}</p>
                <p className='mb-2'><strong>End:</strong> {formatDate(event.end)}</p>
                <p className='mb-2'><strong>Duration:</strong> {event.duration} minutes</p>
              </div>

              <div>
                <h3 className='text-lg font-semibold mb-2'>Existing Scheduled Slots</h3>
                {event.scheduledSlots.length > 0 ? (
                  event.scheduledSlots.map((slot, index) => (
                    <div key={index} className='bg-gray-50 p-4 mb-3 rounded-lg shadow-sm'>
                      <p><strong>Start:</strong> {formatDate(slot.start)}</p>
                      <p><strong>End:</strong> {formatDate(slot.end)}</p>
                      {slot.attendees && slot.attendees.length > 0 && (
                        <div>
                          <h4 className='font-semibold mt-2'>Attendees:</h4>
                          {slot.attendees.map((attendee, idx) => (
                            <p key={idx}>{attendee.name} ({attendee.email})</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No slots have been scheduled yet.</p>
                )}
              </div>
            </div>
          </div>

          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-gray-800'>Add a New Slot</h2>
          <form onSubmit={handleSubmit} className='bg-white p-5 w-full max-w-4xl rounded-lg shadow-md'>
            <div className='mb-4'>
              <label className='block text-lg font-medium mb-2'>Start Time:</label>
              <input
                type="datetime-local"
                name="start"
                value={slot.start}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg p-2'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-lg font-medium mb-2'>End Time:</label>
              <input
                type="datetime-local"
                name="end"
                value={slot.end}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg p-2'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-lg font-medium mb-2'>Attendees:</label>
              {slot.attendees.map((attendee, index) => (
                <div key={index} className='flex flex-col gap-2 mb-4'>
                  <div className='flex gap-2'>
                    <input
                      type="text"
                      name="name"
                      placeholder="Attendee Name"
                      value={attendee.name}
                      onChange={(e) => handleAttendeeChange(index, e)}
                      className='border border-gray-300 rounded-lg p-2 flex-1'
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Attendee Email"
                      value={attendee.email}
                      onChange={(e) => handleAttendeeChange(index, e)}
                      className='border border-gray-300 rounded-lg p-2 flex-1'
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeAttendee(index)}
                      className='bg-red-500 text-white rounded-lg p-2'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addAttendee}
                className='bg-blue-500 text-white rounded-lg p-2'
              >
                Add Attendee
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg ${loading ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
            >
              {loading ? 'Adding...' : 'Add Slot'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Schedule;

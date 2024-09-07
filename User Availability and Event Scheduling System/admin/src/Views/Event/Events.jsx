import React, { useEffect } from 'react';
import { fetchEvents } from '../../redux/Admin/Event';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';

const Events = () => {
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.event);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const formatDate = (date) => {
        return new Date(date).toLocaleString(); // Example formatting
    };

    return (
        <div className='flex flex-col items-center p-5'>
            <h1 className='text-2xl sm:text-3xl font-bold font-mono text-white mb-1'>All events</h1>
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event._id} className='bg-white p-5 w-full max-w-4xl mx-auto mb-5 drop-shadow-lg rounded-lg'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-xl sm:text-2xl font-mono bg-gradient-to-r from-[#1e7914] to-[#05d443] p-2 rounded-lg text-white'>
                                    {event.user || 'N/A'}
                                </h1>
                                <h1 className='text-2xl sm:text-3xl font-bold font-mono'>{event.title || 'N/A'}</h1>

                                <h2 className='text-xl sm:text-2xl'>User availability</h2>

                                {event.start && event.end ? (
                                    <div className='flex flex-col gap-2 font-medium bg-yellow-500 p-2 rounded-lg bg-opacity-60 drop-shadow-md'>
                                        <h2 className='text-black font-bold text-nowrap text-sm'>Start: {formatDate(event.start)}</h2>
                                        <h2 className='text-black font-bold text-nowrap text-sm'>End: {formatDate(event.end)}</h2>
                                    </div>
                                ) : (
                                    <p>No availability available.</p>
                                )}

                                <p className='font-bold text-lg sm:text-xl'>Duration: {event.duration || 'N/A'} minutes</p>

                                <div className='flex flex-wrap gap-3 justify-start items-center'>
                                    <Button color1='blue' color2='darkblue' name='schedule' link={`/schedule/${event._id}`} />
                                </div>
                            </div>

                            <div>
                                <h1 className='text-xl font-semibold mb-2'>Scheduled Slots</h1>
                                {event.scheduledSlots.length > 0 ? (
                                    event.scheduledSlots.map((slot, index) => (
                                        <div key={index} className='font-medium mb-2'>
                                            <p>{formatDate(slot.start)} - {formatDate(slot.end)}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No scheduled slots available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No events found for this user.</p>
            )}
        </div>
    );
}

export default Events;

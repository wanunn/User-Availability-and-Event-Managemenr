import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEventAction, updateEventAction, fetchEvents } from '../../redux/User/Event';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const Add = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // Local state for form data
    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: '',
        duration: '',
        scheduledSlots: [],
    });

    const [slot, setSlot] = useState({ slotStart: '', slotEnd: '' });

    // Fetch existing event if ID is present
    useEffect(() => {
        if (id) {
            const event = useSelector((state) =>
                state.event.events.find((event) => event._id === id)
            );
            if (event) {
                setFormData({
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    duration: event.duration,
                    scheduledSlots: event.scheduledSlots || [],
                });
            }
        }
    }, [id, useSelector((state) => state.event.events)]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSlotChange = (e) => {
        const { name, value } = e.target;
        setSlot(prevSlot => ({
            ...prevSlot,
            [name]: value
        }));
    };

    const addSlot = (e) => {
        e.preventDefault();
        setFormData(prevData => ({
            ...prevData,
            scheduledSlots: [...prevData.scheduledSlots, slot]
        }));
        setSlot({ slotStart: '', slotEnd: '' });
    };

    const removeSlot = (index) => {
        setFormData(prevData => ({
            ...prevData,
            scheduledSlots: prevData.scheduledSlots.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await dispatch(updateEventAction(id, formData));
                toast.success('Event Updated Successfully!',{
                    autoClose:100
                  });
            } else {
                await dispatch(addEventAction(formData));
                toast.success('Event Added Successfully!',{
                    autoClose:100
                  });
            }
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            toast.error(error.message || 'Server error. Please try again.',{
                autoClose:100
              });
        }
    };
    console.log(formData);

    return (
        <div className='p-5'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-5 p-10 sm:p-20 justify-center items-center shadow-md bg-gray-800 bg-opacity-60 mt-5 rounded-lg w-full max-w-3xl mx-auto'
            >
                <h1 className='text-3xl font-mono font-bold text-white mb-5'>
                    {id ? 'Update Availability' : 'Add Availability'}
                </h1>

                {/* Title Input */}
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

               
                {/* Submit Button */}
                <div>
                    <Button name={id ? "Update Availability" : "Add Availability"} color1={"blue"} color2={"skyblue"} />
                </div>
            </form>
        </div>
    );
};

export default Add;

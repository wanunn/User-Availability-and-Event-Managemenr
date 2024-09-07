import React, { useEffect, useState } from 'react';
import  {fetchEvents} from '../../redux/User/Event';
import Card from '../Event/Card'; 
import Button from '../../components/Button'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {events} = useSelector(state => state.event)

    useEffect(() => {
        dispatch(fetchEvents());
    }, []);

    return (
        <div className="p-2 min-h-screen flex flex-wrap gap-5 justify-center items-start mt-16">
           
            <div className="absolute top-[70px] right-[2%] md:right-[5%] text-[15px]">
                <Button 
                    color1={"blue"} 
                    color2={"skyblue"} 
                    name={"Add"} 
                    link={"/add"}
                />
            </div>
            {events.length > 0 ? (
                <div className="flex flex-wrap justify-around gap-10 items-center">
                    {events.map((event) => (
                        <Card key={event._id} data={event} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-2xl text-white font-bold font-mono animate-pulse hover:animate-none">No events found.</p>
            )}

        </div>
    );
};

export default Home;

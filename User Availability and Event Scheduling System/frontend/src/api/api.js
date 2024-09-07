import axios from 'axios';


const API_URL = 'https://user-availability-and-event-managemenr-1.onrender.com/api/';// Function to get the authentication token
const getAuthToken = () => {
    return localStorage.getItem('token');
};


// Get Events

export const getEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}event/get`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        return response.data.events;
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
}

//Get Event by Id

export const getEventbyId = async (id) =>
{
    try {
        const response = await axios.get(`${API_URL}event/${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        return response.data.event;
        
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.'
        
    }
     
}


// Add Event

export const addEvent = async (formData) => {
    try {
       
        const response = await axios.post(`${API_URL}event`, formData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        return response.data
        
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
}

// Update Event

export const updateEvent = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/event/update/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        return response.data
        
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
}

export const deleteEvent = async (id)=>{
    try {
        const response = await axios.delete(`${API_URL}/event/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data.message
        
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
}

export const getProfile = async ()=>{
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data
        
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
}
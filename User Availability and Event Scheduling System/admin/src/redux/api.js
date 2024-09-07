import axios from 'axios';

const API_URL = 'https://user-availability-and-event-managemenr-1.onrender.com/api/';

// Function to get the authentication token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Existing APIs

// Get Events
export const getEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}users/events`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });        

        return response.data;
        
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
};

export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
};






// Schedule Session (Admin)
export const scheduleSession = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}schedule`, formData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
};

// Get All Sessions
export const getSessions = async () => {
    try {
        const response = await axios.get(`${API_URL}sessions`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data.events;
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
};

// Update or Cancel Session
export const updateSession = async (formData) => {
    try {
        const response = await axios.put(`${API_URL}session/update`, formData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}users`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data.users;
    } catch (error) {
        return error.response.data.message || 'Server error. Please try again.';
    }
};

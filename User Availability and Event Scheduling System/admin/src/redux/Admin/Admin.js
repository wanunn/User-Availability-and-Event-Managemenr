import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api';

const initialState = {
    users: [],
    loading: false,
    error: null,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

        setUsers: (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        },

        setLoading: (state) => {
            state.loading = true;
        },  

        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
    }

});

export const fetchUsers = () => async (dispatch) => {

    dispatch(setLoading());
    try {
        const response = await getUsers();
        dispatch(setUsers(response));
    } catch (error) {
        dispatch(setError(error.message));
    }
    
}

export const {setUsers, setLoading, setError} = adminSlice.actions;

export default adminSlice.reducer;


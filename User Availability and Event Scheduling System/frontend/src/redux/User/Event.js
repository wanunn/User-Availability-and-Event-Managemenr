import { createSlice } from '@reduxjs/toolkit';
import { getEvents, deleteEvent,addEvent,updateEvent } from '../api';

const initialState = {
  events: [],
  loading: false,
  error: null,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
      state.loading = false;  // Reset loading state when events are successfully fetched
      state.error = null;     // Clear any existing error
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;  // Stop loading if an error occurs
    },
  },
});

export const fetchEvents = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await getEvents();
    dispatch(setEvents(res));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteEventAction = (id) => async (dispatch) => {
  try {
    await deleteEvent(id);
    dispatch(fetchEvents());  // Refetch events after deletion
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addEventAction = (data) => async (dispatch) => {
  try {
    const res = await addEvent(data);
    dispatch(fetchEvents());  // Refetch events after adding new
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateEventAction = (id, data) => async (dispatch) => {
  try {
    const res = await updateEvent(id, data);
    dispatch(fetchEvents()); 
    return res; // Refetch events after upading one event
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const { setEvents, setLoading, setError } = eventSlice.actions;
export default eventSlice.reducer;

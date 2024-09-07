import { createSlice } from '@reduxjs/toolkit';
import { getEvents } from '../api';

const initialState = {
  events: [],
  sessions: [],
  loading: false,
  error: null,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSessions: (state, action) => {
      state.sessions = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchEvents = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await getEvents();

    dispatch(setEvents(res.events));
    
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchSessions = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await getSessions();
    dispatch(setSessions(res));
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export const scheduleSessionAction = (data) => async (dispatch) => {
  try {
    await scheduleSession(data);
    dispatch(fetchSessions());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateSessionAction = (id, data) => async (dispatch) => {
  try {
    await updateSession(id, data);
    dispatch(fetchSessions());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const { setEvents, setSessions, setLoading, setError } = eventSlice.actions;
export default eventSlice.reducer;

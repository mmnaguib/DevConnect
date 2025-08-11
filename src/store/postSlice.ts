import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

const postSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export default postSlice.reducer;

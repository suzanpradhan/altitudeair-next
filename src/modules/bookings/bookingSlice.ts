// src/redux/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    packageSlug: undefined,
    packageName: '',
    departureDate: null,
    totalPerson: undefined,
    packagePrice: undefined,
    packageCover: '',
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingDetails: (state, action) => {
            state.packageSlug = action.payload.packageSlug;
            state.packageName = action.payload.packageName;
            state.packageCover = action.payload.packageCover;
            state.packagePrice = action.payload.packagePrice;
            state.departureDate = action.payload.departureDate;
            state.totalPerson = action.payload.totalPerson;
        },
    },
});

export const { setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;

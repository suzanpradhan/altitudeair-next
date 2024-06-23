// src/redux/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    packageId: null,
    packageName: '',
    departureDate: null,
    selectedOption: '',
    packagePrice: 0,
    packageCover: '',
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingDetails: (state, action) => {
            state.packageId = action.payload.packageId;
            state.packageName = action.payload.packageName;
            state.packageCover = action.payload.packageCover;
            state.packagePrice = action.payload.packagePrice;
            state.departureDate = action.payload.departureDate;
            state.selectedOption = action.payload.selectedOption;
        },
    },
});

export const { setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;

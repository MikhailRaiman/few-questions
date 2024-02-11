import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { userName: '', userId: '' },
    reducers: {
        setAuth(state, action) {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;
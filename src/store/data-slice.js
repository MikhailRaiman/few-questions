import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: { quizes: [], questions: [], selectedQuiz: {name: '', id: ''}, selectedQuestions: [] },
    reducers: {
        setSelectedQuiz(state, action) {
            state.selectedQuiz = action.payload;
        },
        addQuiz(state, action) {
            state.quizes.push(action.payload);
        }
    }
});

export const dataSliceActions = dataSlice.actions;

export default dataSlice;
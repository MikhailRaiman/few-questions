import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: { quizes: [], questions: [], selectedQuiz: {name: '', id: ''}, selectedQuestions: [] },
    reducers: {
        setSelectedQuiz(state, action) {
            const quiz = state.quizes.find(q => q.id === action.payload);
            state.selectedQuiz = quiz;
        },
        addQuiz(state, action) {
            state.quizes.push(action.payload);
        },
        setQuizes(state, action) {
            state.quizes = action.payload;
        },
        setCorrectVariant(state, action) {
            const quiz = state.quizes.find(q => q.id === action.payload.quizId);
            const question = quiz.questions.find(q => q.id === action.payload.questionId);
            const variant = question.variants.find(v => v.id === action.payload.variantId);
            variant.corect = action.payload.correct;
            state.selectedQuiz = quiz;
        }
    }
});

export const dataActions = dataSlice.actions;

export default dataSlice;
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { database } from './firebase';
import { authState } from 'rxfire/auth';
import { authActions } from "./auth-slice";
import { dataActions } from "./data-slice";

const auth = getAuth();

export function register(userData) {
    return async (dispatch) => {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        await database.ref('users/' + userCredential.user.uid).set({ ...userData, id: userCredential.user.uid }).then(() => {
            dispatch(authActions.setAuth({userId: userCredential.user.uid, userName: userData.name}));
        });
    }
}

export function checkAuth() {
    return async (dispatch) => {
        authState(auth).subscribe((user) => {
            if (user) {
                const userRef = database.ref('users/' + user.uid);
                userRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    const quizes = [];
                    for (const key in data.quizes) {
                        const quiz = data.quizes[key];
                        if (quiz.question) {
                            const questions = [];
                            for (const questionKey in quiz.question) {
                                const quizQuestion = quiz.question[questionKey];
                                if (quizQuestion.variant) {
                                    const variants = [];
                                    for (const variantKey in quizQuestion.variant) {
                                        const variant = quizQuestion.variant[variantKey];
                                        variant.id = variantKey;
                                        variants.push(variant);
                                    }
                                    quizQuestion.variants = variants;
                                }
                                quizQuestion.id = questionKey;
                                questions.push(quizQuestion);
                            }
                            quiz.questions = questions;
                        }
                        quiz.id = key;
                        quizes.push(quiz);
                    }
                    console.log(data);
                    dispatch(dataActions.setQuizes(quizes));
                    dispatch(authActions.setAuth({userId: data.id, userName: data.name}));
                });
            }
        })
    }
}

export function logout() {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(authActions.setAuth({userId: "", userName: ""}));
    }
}

export function addQuiz(quiz, userId) {
    return async () => {
        database.ref('users/' + userId).child('quizes').push(quiz);
    }
}

export function deleteQuiz(quizId, userId) {
    database.ref('users/' + userId + '/quizes/' + quizId).remove();
}

export function addQuestion(question, quizId, userId) {
    database.ref('users/' + userId + '/quizes/' + quizId + '/question').push(question);
}

export function addVariant(variant, questionId, quiz, userId) {
    return async (dispatch) => {
        database.ref('users/' + userId + '/quizes/' + quiz.id + '/question/' + questionId + '/variant').push(variant);
        dispatch(dataActions.setSelectedQuiz(quiz.id))
    }
}

export function setCorrectAnswerVariant(variant, variantId, questionId, quizId, userId) {
    return async (dispatch) => {
        database.ref('users/' + userId + '/quizes/' + quizId + '/question/' + questionId + '/variant/' + variantId).set(variant);
        dispatch(dataActions.setCorrectVariant({quizId: quizId, questionId: questionId, variantId: variantId, correct: variant.correct}));
    }
}

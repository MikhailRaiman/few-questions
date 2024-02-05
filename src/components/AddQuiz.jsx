import { useRef } from 'react';
import { firestore } from '../store/firebase'; 

export default function AddQuiz() {
    const inputRef = useRef();
    async function handleAddQuiz() {
        try {
            const quizName = inputRef.current.value;
            await firestore
                .collection('quiz')
                .add({ name: quizName });
            inputRef.current.value = '';
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={handleAddQuiz}>Add</button>
        </div>
    );
}
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz } from '../store/fireFunctions';

export default function AddQuiz() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const [ newQuizName, setNewQuizName ] = useState('');

    async function handleAddQuiz() {
        try {
            const newQuiz = { name: newQuizName, owner: userId, type: 'quiz', state: 'draft', visibility: 'private' };
            dispatch(addQuiz(newQuiz, userId));
            setNewQuizName('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container control-row full-width" style={{width: "300px"}}>
            <div className='control no-margin' style={{width: "200px"}}>
                <input placeholder='Новый опрос' value={newQuizName} onChange={(event) => setNewQuizName(event.target.value)} type="text" />
            </div>
            <button disabled={newQuizName === ''} style={{marginLeft: "20px"}} className='button' onClick={handleAddQuiz}>+</button>
        </div>

    );
}
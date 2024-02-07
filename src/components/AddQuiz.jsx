import { useContext, useState } from 'react';
import { firestore } from '../store/firebase'; 
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../store/DataContextProvider';

export default function AddQuiz() {
    const { userId } = useContext(AuthContext);
    const [ newQuizName, setNewQuizName ] = useState('');
    async function handleAddQuiz() {
        try {
            addDoc(collection(firestore, 'quiz'), { name: newQuizName, owner: userId, type: 'quiz', state: 'draft', visibility: 'private' }).then(res => {
                setNewQuizName('');
            });
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